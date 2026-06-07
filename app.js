const sortButton = document.getElementById("sortButton");

sortButton.addEventListener("click", sortTasks);

const STORAGE_KEY = "sorted-v5";

function sortTasks() {

```
const text = document.getElementById("brainDump").value;

const tasks = text
    .split("\n")
    .map(t => t.trim())
    .filter(t => t.length > 0);

tasks.forEach(task => {

    const category = classify(task);

    createTask(task, category);

});

document.getElementById("brainDump").value = "";

saveData();
updateCounts();
```

}

function classify(task) {

```
const t = task.toLowerCase();

if (/mark|book|report|lesson|school|meeting|parent|maths/.test(t))
    return "school";

if (/doctor|gp|physio|exercise|walk|dentist|neck/.test(t))
    return "health";

if (/mortgage|bank|bill|savings|insurance|budget/.test(t))
    return "money";

if (/clean|floor|shop|shopping|family|garden|diy/.test(t))
    return "home";

return "review";
```

}

function createTask(text, column) {

```
const task = document.createElement("div");

task.className = "task";

task.innerHTML = `
    <label>
        <input type="checkbox">
        ${text}
    </label>

    <div class="task-controls">
        <button onclick="moveTask(this,'today')">⭐</button>
    </div>
`;

task.querySelector("input")
    .addEventListener("change", function () {

        if (this.checked) {

            document
                .getElementById("done")
                .appendChild(task);

            saveData();
            updateCounts();
        }

    });

document
    .getElementById(column)
    .appendChild(task);
```

}

function moveTask(button, destination) {

```
const task = button.closest(".task");

if (destination === "today") {

    const count =
        document.getElementById("today")
            .children.length;

    if (count >= 3) {

        alert(
            "Today's list is limited to 3 tasks."
        );

        return;
    }
}

document
    .getElementById(destination)
    .appendChild(task);

saveData();
updateCounts();
```

}

function updateCounts() {

```
const sections = [
    "today",
    "school",
    "home",
    "health",
    "money",
    "review",
    "done"
];

sections.forEach(section => {

    const count =
        document
            .getElementById(section)
            .children.length;

    document.getElementById(
        section + "Count"
    ).textContent = count;

});
```

}

function saveData() {

```
const data = {};

[
    "today",
    "school",
    "home",
    "health",
    "money",
    "review",
    "done"
].forEach(section => {

    data[section] =
        Array.from(
            document
                .getElementById(section)
                .children
        ).map(task =>
            task.innerText
                .replace("⭐", "")
                .trim()
        );

});

localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
);
```

}

function loadData() {

```
const saved =
    localStorage.getItem(STORAGE_KEY);

if (!saved) return;

const data =
    JSON.parse(saved);

Object.keys(data)
    .forEach(section => {

        data[section]
            .forEach(task => {

                createTask(
                    task,
                    section
                );

            });

    });

updateCounts();
```

}

function setGreeting() {

```
const hour =
    new Date().getHours();

let greeting =
    "Good morning, Captain.";

if (hour >= 12)
    greeting =
        "Good afternoon, Captain.";

if (hour >= 18)
    greeting =
        "Good evening, Captain.";

document.getElementById(
    "greeting"
).textContent = greeting;
```

}

setGreeting();
loadData();
