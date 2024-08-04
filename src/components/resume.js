import React,{useState} from "react";

const Resume = function () {
    const [Currentctc,setCurrentctc] = useState("");
    const [Expectedctc,setExpectedctc] = useState("")
    const [NoticePeriod,setNoticePeriod] = useState("");
    const [Resume,setResume] = useState("")
    const [Location,setLocation] = useState([]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(Currentctc,Expectedctc,NoticePeriod,Resume,Location)
        
    

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
                            <input type="text" placeholder="Current CTC" required onChange={(e) => setCurrentctc(e.target.value)}  />
                            <p>Expected CTC in your local currency?</p>
                            <input type="text" placeholder="Expected CTC" required onChange={(e) => setExpectedctc(e.target.value)}/>
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
                            <button type="submit">Sign Up</button>

                        </form>
                    </div>
                </div>
            </main>

        </div>
    )
}
export default Resume;