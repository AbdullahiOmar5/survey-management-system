const newSurvey = document.querySelector('.new-survey-btn')





// Sample data for active surveys
const surveys = [
  { title: "Customer Satisfaction Survey" },
  { title: "Employee Feedback Survey" }
];


// Load surveys into the table
function loadSurveys() {
  const tbody = document.getElementById("surveys-table").querySelector("tbody");
  tbody.innerHTML = ""; // Clear existing rows
  surveys.forEach(survey => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${survey.title}</td>
          <td>
              <button onclick="editSurvey('${survey.title}') class="actions-btn">Edit</button>
              <button onclick="deleteSurvey('${survey.title}') class="actions-btn"">Delete</button>
          </td>
      `;
      tbody.appendChild(row);
  });
}

// Call loadSurveys to display surveys on page load
loadSurveys();

// Placeholder functions for edit and delete actions
function editSurvey(title) {
  alert(`Editing survey: ${title}`);
}

function deleteSurvey(title) {
  alert(`Deleting survey: ${title}`);
  // Implement delete logic here
}
// Get the button element

newSurvey.addEventListener('click', function() {
  const mainContainer = document.querySelector('.recentOrders');
  const titleForm = document.createElement('form');
  titleForm.className = 'survey-title';
  titleForm.setAttribute('action', "/submit-title");
  titleForm.setAttribute('method', "post");

  // Title Form fields for Title, Created Date, End Date, and Description
  titleForm.innerHTML = `
      <label for="input-title" id="label-one">Title :</label>
      <input type="text" name="title" id="input-title" placeholder="Title" required>
      <label for="created-date" class="label">Created Date :</label>
      <input type="date" name="created_date" id="created-date" required>
      <label for="deadline" class="label">End Date :</label>
      <input type="date" name="deadline" id="dead-line" required> <br>
      <label for="description-title" id="label-four">Description :</label>
      <input type="text" name="description" id="description" placeholder="Description" required> <br>
  `;

  mainContainer.appendChild(titleForm);

  // Add Question button container
  const addQuestionBtnContainer = document.createElement('div');
  addQuestionBtnContainer.className = 'addQuestion';
  addQuestionBtnContainer.innerHTML = `<button type="button" class="addQuestionBtn"> Add Question </button>`;
  titleForm.appendChild(addQuestionBtnContainer);

  // Container for all questions
  const questionsContainer = document.createElement('div');
  questionsContainer.className = 'questionsContainer';
  titleForm.appendChild(questionsContainer);

  // Event listener for adding new questions
  const addQuestionBtn = addQuestionBtnContainer.querySelector('.addQuestionBtn');
  addQuestionBtn.addEventListener('click', function() {
      const questionDiv = document.createElement('form');
      questionDiv.className = 'question';
      
      questionDiv.innerHTML = `
          <label class="questionlbl">Question:</label> <br>
          <input type="text" name="questions[]" placeholder="Add Question" class="questionTbox" required> <br> <br>
          <label class="responselbl">Response Type:</label> <br> <br>
          <select name="response_types[]" class="question-type" required>

              <option value=""></option>
              <option value="open-ended">Open ended</option>
              <option value="single-choice">Single Choice</option>
              <option value="description">Description</option>
          </select>
      `;

      questionsContainer.appendChild(questionDiv);

      const selectElement = questionDiv.querySelector('.question-type');
      selectElement.addEventListener('change', function() {
      // Clear any existing responseDiv to avoid duplicates when changing the selection
      const existingResponseDiv = questionDiv.querySelector('.responseDiv');
      if (existingResponseDiv) {
          existingResponseDiv.remove();
      }
  
      if (selectElement.value === "single-choice") {
          const responseDiv = document.createElement('div');
          responseDiv.className = 'responseDiv';
          responseDiv.innerHTML = `
              <input type="radio" name="response_options[single]" value="opt1" class="radio radio-one">
              <input type="text" name="options[]" placeholder="Option one"> <br>
              <input type="radio" name="response_options[single]" value="opt2" class="radio radio-two">
              <input type="text" name="options[]" placeholder="Option two"> <br>
              <input type="radio" name="response_options[single]" value="opt3" class="radio radio-three">
              <input type="text" name="options[]" placeholder="Option three"> <br>
          `;
          questionDiv.appendChild(responseDiv);
      }
      else if (selectElement.value === "open-ended") {
          const responseDiv = document.createElement('div');
          responseDiv.className = 'responseDiv';
          responseDiv.innerHTML = `
              <input type="radio" name="response_options[open]" value="opt1" class="radio radio-one">
              <input type="text" name="options[]" placeholder="Option one"> <br>
              <input type="radio" name="response_options[open]" value="opt2" class="radio radio-two">
              <input type="text" name="options[]" placeholder="Option two"> <br>
          `;
          questionDiv.appendChild(responseDiv);
      }
      else if (selectElement.value === "description") {
          const responseDiv = document.createElement('div');
          responseDiv.className = 'responseDiv';
          responseDiv.innerHTML = `
              <input type="text" name="description" placeholder="Enter your description here"> <br>
          `;
          questionDiv.appendChild(responseDiv);
      }
    });

  });

  // Save Title Form button
  const saveTitleButton = document.createElement('button');
  saveTitleButton.type = 'submit';
  saveTitleButton.textContent = 'Save surveys';
  saveTitleButton.className = 'submitButton';
  titleForm.appendChild(saveTitleButton);

  // New Save Questions button
  const saveQuestionsButton = document.createElement('button');
  saveQuestionsButton.type = 'button';
  saveQuestionsButton.textContent = 'Save Questions';
  saveQuestionsButton.className = 'saveQuestionsButton';
  titleForm.appendChild(saveQuestionsButton);

  // Event listener for the Save Questions button
  // saveQuestionsButton.addEventListener('click', function() {
  //     const questionsData = [];
  //     questionsContainer.querySelectorAll('.question').forEach((questionDiv) => {
  //         const questionText = questionDiv.querySelector('.questionTbox').value;
  //         const responseType = questionDiv.querySelector('.question-type').value;

  //         questionsData.push({ question: questionText, response_type: responseType });
  //     });

  //     // Send data to the backend (assuming an endpoint '/submit-questions')
  //     fetch('/submit-questions', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ questions: questionsData })
  //     }).then(response => {
  //         if (response.ok) {
  //             alert("Questions saved successfully!");
  //         } else {
  //             alert("Error saving questions.");
  //         }
  //     }).catch(error => {
  //         console.error("Error:", error);
  //         alert("Error saving questions.");
  //     });
  // });
});



