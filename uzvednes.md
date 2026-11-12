# Uzvednes

## Uzdevuma apraksts

Pilnais sākotnējais uzvednes teksts, ko izmantoju lietotnes prasību definēšanai, ir iekļauts zemāk. Tajā saglabātas detalizētās funkcionalitātes, datu struktūras un ID prasības, Option D, 30 rindu funkciju ierobežojums, T2 pārbaužu saraksts, testēšanas robežas un prasības noslēguma ziņojumam.

````text
# MASTER PROMPT — PD1: First Working AI-Powered Web Application

You are an experienced senior frontend developer and programming mentor. Your task is to help me complete the practical assignment PD1: "Pirmā strādājošā lietotne ar MI" according to the academic requirements.

## 1. Language requirements

IMPORTANT:
- All instructions and prompts I send to you are in English.
- All application interface text MUST be in Latvian.
- All code comments MUST be in Latvian.
- All README.md documentation MUST be in Latvian.
- All explanations and documentation intended for the assignment MUST be in Latvian.
- Technical identifiers, variable names and function names may be in English.
- Do not use Russian or English text in the application interface.

## 2. Project objective

Create a fully functional task management web application called "Mani uzdevumi".

The application must work directly in Google Chrome and Mozilla Firefox by opening index.html.

It must NOT require:
- A backend server.
- An internet connection.
- Node.js.
- npm.
- External libraries or frameworks.
- React, Vue, Angular, jQuery or Bootstrap.

Use only:
- HTML5
- CSS3
- Vanilla JavaScript

## 3. Mandatory project structure

Create or update exactly these five required project files:

mi-pd1-uzdevumi/
├── index.html
├── style.css
├── app.js
├── README.md
└── uzvednes.md

Keep the code organized and separate HTML, CSS and JavaScript.

Do not put application logic inside index.html.

## 4. Application requirements

Application title: "Mani uzdevumi"

### 4.1. HTML interface elements

Implement all required elements:

1. Main heading:
   - h1
   - Text: Mani uzdevumi

2. Task input:
   - input
   - id="task-input"
   - Placeholder: Jauns uzdevums...

3. Add button:
   - button
   - id="add-btn"
   - Text: Pievienot

4. Task list:
   - ul
   - id="task-list"

5. Individual task elements:
   - li
   - Checkbox for completion.
   - Task text.
   - Individual delete button.

6. Filter buttons:
   - Three buttons.
   - Each button must have the data-filter attribute.
   - Values: all, active, completed.
   - Latvian labels: Visi, Aktīvie, Izpildītie.
   - Visually highlight the currently selected filter.

7. Task counter:
   - span
   - id="counter"
   - Latvian text: Atlikuši N uzdevumi.

### 4.2. Functional requirements

Implement all six mandatory functions.

F1 — Add tasks:
- Add a task by clicking Pievienot.
- Add a task by pressing Enter.
- Remove leading and trailing whitespace using trim().
- Do not add empty tasks or whitespace-only tasks.
- Clear the input after successful addition.

F2 — Mark tasks as completed:
- Clicking the checkbox changes the done property.
- Completed task text must be displayed with strikethrough.
- Clicking again restores the active state.

F3 — Delete tasks:
- Every task must have its own delete button.
- Deleting one task must not affect other tasks.

F4 — Filtering:
- Visi displays all tasks.
- Aktīvie displays only unfinished tasks.
- Izpildītie displays only completed tasks.
- Highlight the selected filter button.

F5 — Task counter:
- Display the number of unfinished tasks.
- Update the counter immediately after adding, completing or deleting a task.
- Use the format: Atlikuši N uzdevumi.

F6 — Local storage:
- Use localStorage.
- Mandatory key: pd1-uzdevumi.
- Store tasks as JSON.
- Restore tasks and their completion states after page reload.
- Use the required data structure:

[
  {
    "id": 1731223200000,
    "text": "Nopirkt pienu",
    "done": false
  }
]

Each task must contain exactly these mandatory properties:
- id
- text
- done

Generate unique numeric IDs. Do not rely on Date.now() alone without handling possible duplicate IDs.

## 5. Additional feature — Option D

Implement the additional feature required by the assignment:

"Dzēst visus izpildītos"

Requirements:
- Add a separate button with the Latvian label "Dzēst visus izpildītos".
- Clicking it deletes only completed tasks.
- Active tasks must remain untouched.
- Update the task list, counter and localStorage immediately.
- If there are no completed tasks, do not change the data.
- The feature must work with all filters.

Keep this additional feature separate from the mandatory delete functionality.

## 6. Non-functional requirements

N1:
Use only HTML, CSS and Vanilla JavaScript.

N2:
All interface text and code comments must be in Latvian.

N3:
Use textContent to display task text. Never use innerHTML to insert user-provided task text.

N4:
There must be no errors in the browser developer console.

N5:
No JavaScript function may exceed 30 lines.

IMPORTANT:
Keep every function short, readable and focused on one responsibility. If necessary, split functionality into smaller helper functions.

N6:
The application must work in both Chrome and Firefox.

## 7. Design requirements

Create a modern, attractive and clean interface.

Design direction:
- Minimalist contemporary task manager.
- Clear typography.
- Pleasant neutral background.
- One or two accent colors.
- Rounded corners.
- Subtle shadows.
- Good spacing and alignment.
- Clear visual distinction between completed and active tasks.
- Visually attractive filter buttons.
- Responsive layout for desktop and mobile.

The application must look like a finished product, not a basic programming exercise.

All visible interface labels must remain in Latvian.

Avoid unnecessary animations and complicated visual effects.

## 8. Code quality

Organize JavaScript into small functions.

Recommended function structure:

- loadTasks()
- saveTasks()
- generateUniqueId()
- addTask()
- toggleTask()
- deleteTask()
- deleteCompletedTasks()
- renderTasks()
- updateCounter()
- filterTasks()
- initializeApp()

You may adjust the structure if there is a better solution.

Requirements:
- Avoid duplicated code.
- Use const and let appropriately.
- Use meaningful variable and function names.
- Handle missing or invalid localStorage data safely.
- Add Latvian comments where they clarify important logic.
- Avoid unnecessary global variables.
- Use semantic HTML.
- Ensure accessible labels for interactive elements.

## 9. Documentation

### README.md

Write the complete README in Latvian.

Include:
1. Project title.
2. Short application description (3–5 sentences).
3. Technologies used.
4. Application functionality.
5. Description of the additional feature D.
6. Instructions for launching the application by opening index.html.
7. Information about localStorage.
8. Information about the AI tool used, with a placeholder for the actual model name if unknown.

### uzvednes.md

Write the documentation in Latvian.

Include two prompt templates:

1. "Uzdevuma apraksts"
   - Include the complete English prompt used to generate the first application version.
   - Explain in Latvian what the prompt is intended to achieve.

2. "Kļūdas nodošana"
   - Include an English prompt template for reporting and fixing a programming error.
   - It must contain:
     - Actions to reproduce the error.
     - Expected result.
     - Actual result.
     - Console error.
     - File and function name.
     - Relevant code section.
     - An instruction to fix only the affected function unless broader changes are necessary.
     - An instruction to return the corrected function and explain the cause.

Do not invent actual error reports or claim that errors were found.

## 10. Testing requirements

After implementation, inspect the application against all ten tests from the assignment.

T2 test checklist:

1. Adding a task using the button.
2. Adding a task using Enter.
3. Preventing empty and whitespace-only tasks.
4. Correct display of Latvian diacritics.
5. Displaying HTML input as plain text, not HTML.
6. Completing a task and updating the counter.
7. Deleting one task without deleting others.
8. Correct operation of all three filters.
9. Saving and restoring tasks after page reload.
10. No errors in the browser console.

Also test the additional feature:
- Delete completed tasks.
- Verify active tasks remain.
- Verify localStorage is updated.

For each test, distinguish between:
- Code inspection.
- Tests actually executed.
- Tests that still require manual browser verification.

NEVER claim that a test passed unless it was actually performed.

## 11. Development workflow

Work in the following stages.

Stage 1 — Inspect:
- Inspect the current project directory.
- Check whether the required files already exist.
- Do not overwrite useful existing work without checking it first.

Stage 2 — Plan:
- Explain briefly how you will structure the application.
- Identify the main JavaScript functions.
- Explain how localStorage and filtering will work.

Stage 3 — Implement:
- Create or update all five required files.
- Ensure all requirements above are implemented.
- Keep functions within the 30-line limit.

Stage 4 — Review:
- Review every file.
- Check HTML IDs and data-filter attributes.
- Check that all interface text is Latvian.
- Check that all code comments are Latvian.
- Check that task text is rendered with textContent.
- Check that no function exceeds 30 lines.
- Check that all six mandatory functions and additional feature D are implemented.

Stage 5 — Test:
- Perform all tests that are possible in the available environment.
- Clearly list tests requiring manual browser verification.
- Fix any issues you can reproduce.
- Do not invent test results.

Stage 6 — Final report:
Provide:
1. List of created or modified files.
2. Implemented functionality.
3. Testing results.
4. Any remaining issues.
5. Exact instructions for opening and testing index.html.
6. Suggested meaningful Git commit messages in Latvian.

Do not push anything to GitHub without my explicit permission.

Do not invent commit IDs, test results, model names or student observations.

## 12. Important final instruction

The assignment is an educational project.

Do not make the implementation unnecessarily complicated.

The code must be understandable enough for a beginner to explain every function to a teacher during an oral assessment.

Prioritize correctness, simplicity, readability and strict compliance with the assignment over unnecessary features.

Start by inspecting the current repository and presenting the implementation plan. Then proceed with implementation.
````
```

## Kļūdas nodošana

Šo paraugu izmanto, lai reproducējamu kļūdu nodotu labošanai ar vajadzīgo informāciju, vienlaikus ierobežojot izmaiņu tvērumu.

```text
There is a bug in my application.

Steps to reproduce:
1. [Describe the first action.]
2. [Describe the next action.]
3. [Describe any additional action needed to trigger the bug.]

Expected result: [Describe what should happen.]
Actual result: [Describe what happens instead.]
Console error: [Paste the complete error message, or write "None".]
File and function: [File name and function name.]

Relevant code section:
// START
[Paste only the relevant function or code section.]
// END

Fix only the affected function unless broader changes are necessary. If changes elsewhere are necessary, explain why before making them. Return the corrected function and briefly explain the cause of the bug. Do not invent test results.
```
