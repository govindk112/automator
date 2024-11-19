import React, { useState, useEffect, useRef } from "react";
import { ref, getDatabase, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { pdfjs } from "react-pdf";
import { toast } from "react-toastify";
import { uploadBytes, getDownloadURL, ref as storageRef } from "firebase/storage";
import { storage } from "./firebase"; // Ensure storage and app are correctly initialized
import app from "./firebase";


pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdfjs/pdf.worker.min.js`;

const UpdateResume = function () {
  const [pdf, setPdf] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [Currentctc, setCurrentctc] = useState("");
  const [Expectedctc, setExpectedctc] = useState("");
  const [NoticePeriod, setNoticePeriod] = useState("");
  const [Resume, setResume] = useState("");
  const [pdfText, setPdfText] = useState("");
  const [Location, setLocation] = useState("");
  const [user, setUser] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const submitButtonRef = useRef(null); // Ref for the submit button
  const auth = getAuth();
  const db = getDatabase(app);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [auth]);

  // Automatically click the submit button after loading completes
  useEffect(() => {
    if (downloadUrl && pdfText && submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  }, [downloadUrl, pdfText]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setIsLoading(true); // Start loading
      setPdfName(file.name);
      setPdf(file);

      const pdfStorageRef = storageRef(storage, `Resume/${file.name}`);

      try {
        await uploadBytes(pdfStorageRef, file);
        console.log("File uploaded successfully!");

        const url = await getDownloadURL(pdfStorageRef);
        setDownloadUrl(url);
        console.log("Download URL:", url);

        const reader = new FileReader();
        reader.onload = async (e) => {
          const typedarray = new Uint8Array(e.target.result);
          const pdfDocument = await pdfjs.getDocument(typedarray).promise;
          let fullText = "";

          for (let i = 1; i <= pdfDocument.numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item) => item.str).join(" ");
            fullText += pageText + "\n";
          }
          setPdfText(fullText);
          setResume(file.name);
          setIsLoading(false); // Stop loading
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload the file. Please try again.");
        setIsLoading(false); // Stop loading on error
      }
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    function notifyExtensionOnResumeSubmit(urdData) {
      const event = new CustomEvent('resumeSubmitted', {
        detail: {
          urdData: urdData,
          subscriptionType: "FreeTrialStarted"
        }
      });
      document.dispatchEvent(event);
    }

    if (!pdfName) {
      toast.error("Please Provide Your Resume Before Submitting!");
      return;
    }

    if (!downloadUrl || !pdfText) {
      toast.warning("Your Resume is still being processed. Please wait a moment and try again.");
      return;
    }

    const uid = auth.currentUser.uid;
    const userRef = ref(db, "user/" + uid);

    const urdData = `${pdfText} currentCtc ${Currentctc}; ExpectedCtc ${Expectedctc}; NoticePeriod ${NoticePeriod}; Location ${Location}`;

    try {
      await update(userRef, {
        forms: {
          keyvalues: {
            RD: downloadUrl,
            URD: urdData,
          },
        },
      });
      toast.success("Document uploaded successfully!");

      // Notify the extension
     notifyExtensionOnResumeSubmit(urdData)

      localStorage.setItem("Subscriptiontype", "FreeTrialStarted");
      const getSubscription = ref(db, "user/" + user?.uid + "/Payment");
      await update(getSubscription, {
        Subscriptiontype: "FreeTrialStarted",
      });

      window.location.href = "/demo";
    } catch (err) {
      toast.error(err.message || "An error occurred while submitting.");
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Processing your resume... Please wait.</p>
        </div>
      )}
      <main>
        <h1>Last Step</h1>
        <div className="contact-container">
          <div className="message-section">
            <h2>Start Auto-applying now!</h2>
            <p>Achieve career success with Job Form Automator! Start Auto-applying now!</p>
          </div>
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <p>Current CTC in your local currency?</p>
              <input type="text" placeholder="Current CTC" required onChange={(e) => setCurrentctc(e.target.value)} />
              <p>Expected CTC in your local currency?</p>
              <input type="text" placeholder="Expected CTC" required onChange={(e) => setExpectedctc(e.target.value)} />
              <p>What is your notice period in days?</p>
              <input type="text" placeholder="Notice Period" required onChange={(e) => setNoticePeriod(e.target.value)} />
              <p>Your preferred locations for jobs?</p>
              <input type="text" placeholder="Preferred Locations" required onChange={(e) => setLocation(e.target.value)} />
              <label htmlFor="file-upload" className="custom-file-upload">
                Upload Resume
              </label>
              <input id="file-upload" type="file" accept="application/pdf" onChange={handleFileUpload} />
              <p>{pdfName || ""}</p>
              <button ref={submitButtonRef} type="submit" disabled={isLoading}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateResume;
