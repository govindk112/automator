import React from "react";

const QuestionAns = function () {

    function createQuestionElement(questionData) {
        console.log(questionData);
        let container = document.createElement("div");
        container.className = "question-container";

        let questionLabel = document.createElement("label");
        questionLabel.textContent = questionData.question;
        container.appendChild(questionLabel);

        let sanitizedQuestionName = questionData.question.replace(/[^a-zA-Z0-9]/g, "_");

        switch (questionData.type) {
            case "input":
                let input = document.createElement("input");
                input.type = "text";
                input.name = sanitizedQuestionName; // Assign name
                container.appendChild(input);
                break;

            case "textarea":
                let textarea = document.createElement("textarea");
                textarea.name = sanitizedQuestionName; // Assign name
                container.appendChild(textarea);
                break;

            case "select":
                if (Array.isArray(questionData.text)) {
                    let select = document.createElement("select");
                    select.name = sanitizedQuestionName; // Assign name
                    questionData.text.forEach((optionValue) => {
                        let option = document.createElement("option");
                        option.value = optionValue;
                        option.textContent = optionValue;
                        select.appendChild(option);
                    });
                    container.appendChild(select);
                }
                break;

            case "radio":
                if (Array.isArray(questionData.text)) {
                    questionData.text.forEach((optionValue, index) => {
                        let radioInput = document.createElement("input");
                        radioInput.type = "radio";
                        radioInput.name = sanitizedQuestionName; // Assign name
                        radioInput.value = optionValue;
                        radioInput.id = sanitizedQuestionName + "_" + index;

                        let radioLabel = document.createElement("label");
                        radioLabel.htmlFor = radioInput.id;
                        radioLabel.textContent = optionValue;

                        container.appendChild(radioInput);
                        container.appendChild(radioLabel);
                    });
                }
                break;

            case "number":
                let numberInput = document.createElement("input");
                numberInput.type = "number";
                numberInput.name = sanitizedQuestionName; // Assign name
                container.appendChild(numberInput);
                break;

            case "checkbox":
                if (Array.isArray(questionData.text)) {
                    questionData.text.forEach((optionValue, index) => {
                        let checkboxInput = document.createElement("input");
                        checkboxInput.type = "checkbox";
                        checkboxInput.name = sanitizedQuestionName; // Assign name
                        checkboxInput.value = optionValue;
                        checkboxInput.id = sanitizedQuestionName + "_" + index;

                        let checkboxLabel = document.createElement("label");
                        checkboxLabel.htmlFor = checkboxInput.id;
                        checkboxLabel.textContent = optionValue;

                        container.appendChild(checkboxInput);
                        container.appendChild(checkboxLabel);
                    });
                }
                break;

            default:
                console.log("Unsupported question type: " + questionData.type);
        }

        const form = document.querySelectorAll('form')[0];
        if (form) {
            form.appendChild(container);
        } else {
            console.error("No form element found in the document.");
        }
    }

    function clearInputs() {
        var containers = document.querySelectorAll("div.question-container");
        containers.forEach(function (container) {
            container.style.display = "none";
        });
    }

    function displayQuestions(questions) {
        const form = document.querySelectorAll('form')[0];
        if (!form) {
            console.error("No form element found to append questions.");
            return;
        }

        questions.forEach((question) => {
            createQuestionElement(question);
        });

        let submitDiv = document.createElement("div");
        submitDiv.className = "SubmitClass";

        let submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.id = "submit-button";
        submitDiv.appendChild(submitButton);

        form.appendChild(submitDiv);

        submitButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent form submission
            let data = {};
            let allFieldsFilled = true;

            questions.forEach((question) => {
                let sanitizedQuestionName = question.question.replace(/[^a-zA-Z0-9]/g, "_");
                let inputElements = form.querySelectorAll(`[name="${sanitizedQuestionName}"]`);
                let value = "";

                if (question.type === "radio" || question.type === "checkbox") {
                    // Combine selected values into a single string
                    value = Array.from(inputElements)
                        .filter(el => el.checked)
                        .map(el => el.value)
                        .join(", "); // Join selected values with a comma and space

                    if (!value) allFieldsFilled = false;
                } else {
                    value = inputElements[0]?.value.trim() || "";
                    if (!value) allFieldsFilled = false;
                }

                console.log(`Question: ${question.question}, Value:`, value);
                data[question.question] = value;
            });

            if (allFieldsFilled) {
                console.log("All fields are filled. Data to be sent:", data);
                //chrome.runtime.sendMessage({ action: "submitFormData", formData: data });
                document.dispatchEvent(new CustomEvent("sendFormData", { 
                    detail: { formData: data } // 'detail' holds the custom data
                }));
                clearInputs();
            } else {
                console.error("Not all fields are filled. Data will not be sent.");
            }
        });

    }

    document.addEventListener('DOMContentLoaded', function () {
        // Wait for 1 second before dispatching the 'sendQuestions' event
        setTimeout(() => {
            console.log("sendQuestions website");
            const sendQuestionsEvent = new Event('sendQuestions');
            document.dispatchEvent(sendQuestionsEvent);
        }, 1000); // 1000 milliseconds = 1 second]
        document.addEventListener('questionsData', function (event) {
            const questions = event.detail;
            console.log('Received questions in index.js:', questions);
            displayQuestions(questions);
        });

    });
    return (
        <div>
            <main>

                <div class="ellipse ellipse-1"></div>
                <div class="ellipse ellipse-2"></div>

                <h1>Unanswered</h1>
                <div class="contact-container">
                    <div class="message-section">
                        <h2>AI isn’t confident here.</h2>
                        <p>Review these sections carefully, as AI couldn't provide accurate answers. Please check and fill these answers to make sure everything is accurate.</p>
                    </div>
                    <div class="form-section">
                        <form>
                        </form>
                    </div>
                </div>
            </main>


        </div>
    )
}

export default QuestionAns;