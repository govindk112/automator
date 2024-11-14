import React, { useEffect, useState } from "react";

const QuestionAns = () => {
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({});
    const [allFieldsFilled, setAllFieldsFilled] = useState(true);

    // Handle form data change
    const handleChange = (questionName, value) => {
        setFormData(prevData => ({
            ...prevData,
            [questionName]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let filled = true;
        questions.forEach(question => {
            const sanitizedQuestionName = question.question.replace(/[^a-zA-Z0-9]/g, "_");
            if (!formData[sanitizedQuestionName]) {
                filled = false;
            }
        });
        setAllFieldsFilled(filled);

        if (filled) {
            console.log("All fields are filled. Data to be sent:", formData);
            document.dispatchEvent(new CustomEvent("sendFormData", { 
                detail: { formData }
            }));
            setFormData({});
        } else {
            console.error("Not all fields are filled. Data will not be sent.");
        }
    };

    useEffect(() => {
        // Simulate receiving questions after a delay
        const sendQuestionsEvent = new Event('sendQuestions');
        setTimeout(() => {
            console.log("sendQuestions website");
            document.dispatchEvent(sendQuestionsEvent);
        }, 1000);

        document.addEventListener('questionsData', (event) => {
            const receivedQuestions = event.detail;
            console.log('Received questions in index.js:', receivedQuestions);
            setQuestions(receivedQuestions);
        });

        return () => {
            document.removeEventListener('questionsData', () => {});
        };
    }, []);

    const renderQuestion = (question) => {
        const sanitizedQuestionName = question.question.replace(/[^a-zA-Z0-9]/g, "_");

        switch (question.type) {
            case "input":
                return (
                    <input
                        type="text"
                        name={sanitizedQuestionName}
                        value={formData[sanitizedQuestionName] || ""}
                        onChange={(e) => handleChange(sanitizedQuestionName, e.target.value)}
                    />
                );

            case "textarea":
                return (
                    <textarea
                        name={sanitizedQuestionName}
                        value={formData[sanitizedQuestionName] || ""}
                        onChange={(e) => handleChange(sanitizedQuestionName, e.target.value)}
                    />
                );

            case "select":
                return (
                    <select
                        name={sanitizedQuestionName}
                        value={formData[sanitizedQuestionName] || ""}
                        onChange={(e) => handleChange(sanitizedQuestionName, e.target.value)}
                    >
                        {question.text.map((optionValue, index) => (
                            <option key={index} value={optionValue}>
                                {optionValue}
                            </option>
                        ))}
                    </select>
                );

            case "radio":
                return (
                    <>
                        {question.text.map((optionValue, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    name={sanitizedQuestionName}
                                    value={optionValue}
                                    checked={formData[sanitizedQuestionName] === optionValue}
                                    onChange={() => handleChange(sanitizedQuestionName, optionValue)}
                                />
                                <label>{optionValue}</label>
                            </div>
                        ))}
                    </>
                );

            case "checkbox":
                return (
                    <>
                        {question.text.map((optionValue, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    name={sanitizedQuestionName}
                                    value={optionValue}
                                    checked={formData[sanitizedQuestionName]?.includes(optionValue) || false}
                                    onChange={(e) => {
                                        const updatedValue = formData[sanitizedQuestionName] || [];
                                        if (e.target.checked) {
                                            updatedValue.push(optionValue);
                                        } else {
                                            const index = updatedValue.indexOf(optionValue);
                                            if (index > -1) {
                                                updatedValue.splice(index, 1);
                                            }
                                        }
                                        handleChange(sanitizedQuestionName, updatedValue);
                                    }}
                                />
                                <label>{optionValue}</label>
                            </div>
                        ))}
                    </>
                );

            case "number":
                return (
                    <input
                        type="number"
                        name={sanitizedQuestionName}
                        value={formData[sanitizedQuestionName] || ""}
                        onChange={(e) => handleChange(sanitizedQuestionName, e.target.value)}
                    />
                );

            default:
                console.log("Unsupported question type:", question.type);
                return null;
        }
    };

    return (
        <div>
            <main>
                <div className="ellipse ellipse-1"></div>
                <div className="ellipse ellipse-2"></div>
                <h1>Unanswered</h1>
                <div className="contact-container">
                    <div className="message-section">
                        <h2>AI isn’t confident here.</h2>
                        <p>Review these sections carefully, as AI couldn't provide accurate answers. Please check and fill these answers to make sure everything is accurate.</p>
                    </div>
                    <div className="form-section">
                        <form onSubmit={handleSubmit}>
                            {questions.map((question, index) => (
                                <div key={index} className="question-container">
                                    <label>{question.question}</label>
                                    {renderQuestion(question)}
                                </div>
                            ))}
                            {questions.length > 0 && (
                                <div className="SubmitClass">
                                    <button type="submit">Submit</button>
                                </div>
                            )}
                            {!allFieldsFilled && (
                                <p style={{ color: "red" }}>Please fill out all fields.</p>
                            )}
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default QuestionAns;
