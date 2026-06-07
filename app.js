const sortButton = document.getElementById("sortButton");

const STORAGE_KEY = "sorted-v6";
const LEARNING_KEY = "sorted-learning";

sortButton.addEventListener("click", sortTasks);

let learningData =
    JSON.parse(
        localStorage.getItem(LEARNING_KEY)
    ) || {};

function sortTasks() {

    const text =
        document.getElementById("brainDump").value;

    const tasks =
        text.split("\n")
            .map(t => t.trim())
            .filter(t => t.length > 0);

    let reviewCount = 0;

    tasks.forEach(task => {

        const category = classify(task);

        if (category === "review") {
            reviewCount++;
        }

        createTask(task, category);

    });

    document.getElementById("brainDump").value = "";

    saveData();
    updateCounts();

    alert(
        tasks.length +
        " tasks sorted.\n" +
        reviewCount +
        " need review."
    );
}

function classify(task) {

    const t = task.toLowerCase();

    for (const keyword in learningData) {

        if (t.includes(keyword)) {
            return learningData[keyword];
        }

    }

    if (/mark|book|report|lesson|school|meeting|parent|maths/.test(t))
        return "school";

    if (/doctor|gp|physio|exercise|walk|dentist|neck/.test(t))
        return "health";

    if (/mortgage|bank|bill|savings|insurance|budget/.test(t))
        return "money";

    if (/clean|floor|shop|shopping|family|garden|diy/.test(t))
        return "home";

    return "review";
}

function createTask(text, column) {

    const task = document.createElement("div");

    task.className = "task";

    task.innerHTML = `
        <label>
            <input type="checkbox">
            ${text}
        </label>

        <div class="task-controls">
            <button onclick="moveTask(this,'today')">⭐</button>
            <button onclick="moveTask(this,'school')">📚</button>
            <button onclick="moveTask(this,'home')">🏠</button>
            <button onclick="moveTask(this,'health')">💪</button>
            <button onclick="moveTask(this,'money')">💷</button>
            <button onclick="moveTask(this,'review')">🤔</button>
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
}

function moveTask(button, destination) {

    const task =
        button.closest(".task");

    const taskText =
        task.innerText.toLowerCase();

    if (destination === "today") {

        const count =
            document
            .getElementById("today")
            .children.length;

        if (count >= 3) {

            alert(
                "Today's list is limited to 3 tasks."
            );

            return;
        }
    }

    learnTask(taskText, destination);

    document
        .getElementById(destination)
        .appendChild(task);

    saveData();
    updateCounts();
}

function learnTask(taskText, category) {

    const words =
        taskText
        .split(" ")
        .filter(word =>
            word.length > 2
        );

    words.forEach(word => {

        learningData[word] = category;

    });

    localStorage.setItem(
        LEARNING_KEY,
        JSON.stringify(learningData)
    );
}

function updateCounts() {

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

        document
            .getElementById(
                section + "Count"
            )
            .textContent = count;

    });
}

function saveData() {

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
                task.querySelector("label")
                .innerText
                .trim()
            );

    });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}

function loadData() {

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
}

function setGreeting() {

    const hour =
        new Date().getHours();

    let greeting =
        "Welcome back, Captain.";

    if (hour >= 12)
        greeting =
        "Welcome back, Captain.";

    if (hour >= 18)
        greeting =
        "Good evening, Captain.";

    document
        .getElementById("greeting")
        .textContent =
        greeting;
}

setGreeting();
loadData();
