import React, { useState } from "react";
import { ref,get,getDatabase, set,update} from "firebase/database";
import app from "./firebase";



const Resume = function () {
    const [Currentctc, setCurrentctc] = useState("");
    const [Expectedctc, setExpectedctc] = useState("")
    const [NoticePeriod, setNoticePeriod] = useState("");
    const [Resume, setResume] = useState("")
    const [Location, setLocation] = useState([]);


   
    const handleSubmit = async (e) => {
        const db = getDatabase(app)
        e.preventDefault();
        console.log(Currentctc, Expectedctc, NoticePeriod, Resume, Location)
        // const firebase = "https://demo1-134d6-default-rtdb.firebaseio.com/Users/xyDr1n43gMQKiHPssLNTUkK5Qe22";
        const uid = "awEQd4MKS3SnoT6bA2IayCOqBLB3"
        const userRef = ref(db, 'Users/' + uid);
        const snapshot = await update(userRef,{
            "detils":{
            Currentctc,
            Expectedctc,
            NoticePeriod,
            Location,
            Resume,
            }
        });
        
        if (snapshot.exists()) {
          console.log(snapshot.val())
        } else {
          console.log('No data available');
        }
        



    }

    return (
        <div>
            <main>



                <h1>Last Step</h1>
                <div className="contact-container">
                    <div className="message-section">
                        <h2>Start Auto-applying now!</h2>
                        <p>
                            Achieve career success with Job Form Automator! Start Auto-applying now!</p>
                    </div>
                    <div className="form-section">
                        <form onSubmit={handleSubmit}>
                            <p>Current CTC in your local currency?</p>
                            <input type="text" placeholder="Current CTC" required onChange={(e) => setCurrentctc(e.target.value)} />
                            <p>Expected CTC in your local currency?</p>
                            <input type="text" placeholder="Expected CTC" required onChange={(e) => setExpectedctc(e.target.value)} />
                            <p>What is your notice period in days?</p>
                            <input type="text" placeholder="Notice Period" required onChange={(e) => setNoticePeriod(e.target.value)} />
                            <p>your All preferred locations for jobs?</p>
                            <input type="text" placeholder="Preferred Locations" required onChange={(e) => setLocation(e.target.value)} />
                            <label for="file-upload" className="custom-file-upload">
                                Upload Resume
                            </label>
                            <input id="file-upload" type="file" onChange={(e) => setResume(e.target.value)} />
                            <span className="file-name"></span>
                            <p></p>
                            <button type="submit">Submit</button>

                        </form>
                    </div>
                </div>
            </main>

        </div>
    )
}
export default Resume;