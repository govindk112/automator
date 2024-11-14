import React, { useState, useEffect } from "react";

const QuestionAns = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [allFieldsFilled, setAllFieldsFilled] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);  // To control when form is submitted

  // Function to handle changes in input fields (to make them controlled components)
  const handleChange = (e, question) => {
    const { name, value, type, checked } = e.target;

    // For radio buttons and checkboxes, we handle the value differently
    let updatedValue = value;
    if (type === "radio" || type === "checkbox") {
      updatedValue = checked ? value : "";
    }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  // Function to submit form data
  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;
    const updatedData = {};

    questions.forEach((question) => {
      const value = formData[question.question];
      if (!value) {
        isValid = false;
      }
      updatedData[question.question] = value;
    });

    setAllFieldsFilled(isValid);

    if (isValid) {
      console.log("All fields are filled. Data to be sent:", updatedData);
      // Dispatch the custom event with the form data
      document.dispatchEvent(new CustomEvent("sendFormData", { detail: { formData: updatedData } }));
      setIsFormSubmitted(true);  // Mark the form as submitted
    } else {
      console.error("Not all fields are filled. Data will not be sent.");
    }
  };

  // Use useEffect to handle the event after the component mounts
  useEffect(() => {
    const handleQuestionsData = (event) => {
      const questionsData = event.detail;
      setQuestions(questionsData);
    };

    document.addEventListener("questionsData", handleQuestionsData);

    return () => {
      document.removeEventListener("questionsData", handleQuestionsData);
    };
  }, []);

  // Render questions and inputs dynamically based on the questions array
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
              {isFormSubmitted ? (
                <p>Form submitted successfully!</p>
              ) : (
                questions.map((question, index) => {
                  const sanitizedQuestionName = question.question.replace(/[^a-zA-Z0-9]/g, "_");
                  switch (question.type) {
                    case "input":
                      return (
                        <div key={index} className="question-container">
                          <label>{question.question}</label>
                          <input
                            type="text"
                            name={sanitizedQuestionName}
                            value={formData[sanitizedQuestionName] || ""}
                            onChange={(e) => handleChange(e, question)}
                          />
                        </div>
                      );
                    case "textarea":
                      return (
                        <div key={index} className="question-container">
                          <label>{question.question}</label>
                          <textarea
                            name={sanitizedQuestionName}
                            value={formData[sanitizedQuestionName] || ""}
                            onChange={(e) => handleChange(e, question)}
                          />
                        </div>
                      );
                    case "select":
                      return (
                        <div key={index} className="question-container">
                          <label>{question.question}</label>
                          <select
                            name={sanitizedQuestionName}
                            value={formData[sanitizedQuestionName] || ""}
                            onChange={(e) => handleChange(e, question)}
                          >
                            {question.text.map((optionValue, i) => (
                              <option key={i} value={optionValue}>
                                {optionValue}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    case "radio":
                      return (
                        <div key={index} className="question-container">
                          <label>{question.question}</label>
                          {question.text.map((optionValue, i) => (
                            <div key={i}>
                              <input
                                type="radio"
                                name={sanitizedQuestionName}
                                value={optionValue}
                                checked={formData[sanitizedQuestionName] === optionValue}
                                onChange={(e) => handleChange(e, question)}
                              />
                              <label>{optionValue}</label>
                            </div>
                          ))}
                        </div>
                      );
                    case "checkbox":
                      return (
                        <div key={index} className="question-container">
                          <label>{question.question}</label>
                          {question.text.map((optionValue, i) => (
                            <div key={i}>
                              <input
                                type="checkbox"
                                name={sanitizedQuestionName}
                                value={optionValue}
                                checked={formData[sanitizedQuestionName]?.includes(optionValue)}
                                onChange={(e) => handleChange(e, question)}
                              />
                              <label>{optionValue}</label>
                            </div>
                          ))}
                        </div>
                      );
                    case "number":
                      return (
                        <div key={index} className="question-container">
                          <label>{question.question}</label>
                          <input
                            type="number"
                            name={sanitizedQuestionName}
                            value={formData[sanitizedQuestionName] || ""}
                            onChange={(e) => handleChange(e, question)}
                          />
                        </div>
                      );
                    default:
                      return null;
                  }
                })
              )}

              {isFormSubmitted ? null : (
                <div className="SubmitClass">
                  <button type="submit" id="submit-button">
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionAns;
