const sortButton = document.getElementById("sortButton");

sortButton.addEventListener("click", sortTasks);

function sortTasks() {

```
clearColumns();

const text =
    document.getElementById("brainDump").value;

const tasks =
    text.split("\n")
        .map(t => t.trim())
        .filter(t => t.length > 0);

tasks.forEach(task => {

    const category = classifyTask(task);

    addTask(task, category);

});

localStorage.setItem(
    "sortedBrainDump",
    text
);

updateCounts();
```

}

function classifyTask(task) {

```
const lower = task.toLowerCase();

const schoolWords = [
    "mark","books","book","report","lesson",
    "school","meeting","parent","sats",
    "planning","maths","english","pupil"
];

const healthWords = [
    "doctor","gp","physio","dentist",
    "exercise","walk","neck","health",
    "appointment","prescription"
];

const moneyWords = [
    "mortgage","bank","bill","savings",
    "insurance","budget","tax","finance"
];

const homeWords = [
    "clean","floor","kitchen","garden",
    "shopping","shop","family","washing",
    "vacuum","bins","home","diy"
];

if (schoolWords.some(word => lower.includes(word))) {
    return "school";
}

if (healthWords.some(word => lower.includes(word))) {
    return "health";
}

if (moneyWords.some(word => lower.includes(word))) {
    return "money";
}

if (homeWords.some(word => lower.includes(word))) {
    return "home";
}

return "ideas";
```

}

function addTask(text, columnId) {

```
const task = document.createElement("div");

task.className = "task";

task.innerHTML = `
    ${text}
    <div style="margin-top:6px;">
        <button onclick="moveTask(this,'top3')">⭐</button>
        <button onclick="moveTask(this,'notToday')">⏸</button>
        <button onclick="moveTask(this,'done')">✓</button>
    </div>
`;

document
    .getElementById(columnId)
    .appendChild(task);
```

}

function moveTask(button, destination) {

```
const task =
    button.closest(".task");

document
    .getElementById(destination)
    .appendChild(task);

updateCounts();
```

}

function clearColumns() {

```
[
    "school",
    "home",
    "health",
    "money",
    "ideas"
].forEach(id => {
    document.getElementById(id).innerHTML = "";
});
```

}

function updateCounts() {

```
const sections = [
    "school",
    "home",
    "health",
    "money",
    "ideas",
    "top3",
    "notToday",
    "done"
];

sections.forEach(id => {

    const count =
        document
        .getElementById(id)
        .children.length;

    console.log(id + ": " + count);
});
```

}

window.addEventListener("load", () => {

```
const saved =
    localStorage.getItem(
        "sortedBrainDump"
    );

if (saved) {

    document
        .getElementById("brainDump")
        .value = saved;

    sortTasks();
}
```

});
