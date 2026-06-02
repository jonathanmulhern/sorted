```javascript
const sortButton = document.getElementById("sortButton");

sortButton.addEventListener("click", sortTasks);

function sortTasks() {

    clearColumns();

    const text =
        document.getElementById("brainDump").value;

    const tasks =
        text.split("\n")
            .map(t => t.trim())
            .filter(t => t.length > 0);

    tasks.forEach(task => {

        let category = "ideas";

        const lower = task.toLowerCase();

        if (
            lower.includes("mark") ||
            lower.includes("book") ||
            lower.includes("report") ||
            lower.includes("lesson") ||
            lower.includes("school") ||
            lower.includes("meeting")
        ) {
            category = "school";
        }

        else if (
            lower.includes("doctor") ||
            lower.includes("physio") ||
            lower.includes("dentist") ||
            lower.includes("exercise") ||
            lower.includes("walk") ||
            lower.includes("neck")
        ) {
            category = "health";
        }

        else if (
            lower.includes("mortgage") ||
            lower.includes("bank") ||
            lower.includes("bill") ||
            lower.includes("savings") ||
            lower.includes("insurance")
        ) {
            category = "money";
        }

        else if (
            lower.includes("clean") ||
            lower.includes("floor") ||
            lower.includes("shop") ||
            lower.includes("shopping") ||
            lower.includes("family") ||
            lower.includes("garden")
        ) {
            category = "home";
        }

        addTask(task, category);

    });

    localStorage.setItem(
        "sortedBrainDump",
        text
    );
}

function addTask(text, columnId) {

    const task =
        document.createElement("div");

    task.className = "task";
    task.textContent = text;

    document
        .getElementById(columnId)
        .appendChild(task);
}

function clearColumns() {

    [
        "school",
        "home",
        "health",
        "money",
        "ideas"
    ].forEach(id => {
        document.getElementById(id).innerHTML = "";
    });
}

window.addEventListener("load", () => {

    const saved =
        localStorage.getItem(
            "sortedBrainDump"
        );

    if (saved) {
        document.getElementById(
            "brainDump"
        ).value = saved;

        sortTasks();
    }
});
```
