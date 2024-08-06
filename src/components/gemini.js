import React,{useState} from "react";

const Gemini = function () {
    const[gemini_key,setGeminikey] = useState("")

  const sumbitHandler = async(e)=>{
    e.preventDefault();
    console.log(gemini_key)

  }

    return (
        <div>
            <main>

              

                <h1>Enter Free Gemini Key</h1>
                <div class="contact-container">
                    <div class="message-section">
                        <h2 id="h2gemini">Instructions:</h2>
                        <p>1. Click on "Get Gemini key Here" to open the Gemini website.</p>
                        <p> 2. Create an API Key in your account settings.</p>
                        <p> 3. Copy the API Key.</p>
                        <p> 4. Paste the API Key into our website.</p>
                        <p> 5. Click Submit.</p>
                    </div>
                    <div class="form-section">
                        <form onSubmit={sumbitHandler}>
                            <input type="text" placeholder="Enter Your Gemini Key" required onChange={(e)=>setGeminikey(e.target.value)}/>
                                <div class="form-options">

                                    <a href="#" class="forgot-password">Get Gemini key Here</a>
                                </div>
                                <button type="submit">Submit</button>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Gemini;