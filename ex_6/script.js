let currentStudent = "";
let marksArray = [];

const nameInput = document.getElementById("studentName");
const startBtn = document.getElementById("startBtn");
const markEntrySection = document.getElementById("markEntrySection");
const displayName = document.getElementById("displayName");
const subjectInput = document.getElementById("subjectName");
const markInput = document.getElementById("markInput");
const resultsDiv = document.getElementById("results");

// Lock Student Name
startBtn.addEventListener("click", () => {
    if (nameInput.value.trim() !== "") {
        currentStudent = nameInput.value.trim();
        displayName.innerText = currentStudent;
        markEntrySection.style.display = "block";
        nameInput.disabled = true;
        startBtn.style.display = "none";
    } else {
        alert("Please enter a student name.");
    }
});

// Calculate Grade based on specific requirements
function calculateGrade(avg) {
    if (avg >= 90) return "O";
    if (avg >= 80) return "A+";
    if (avg >= 70) return "A";
    if (avg >= 60) return "B+"; // Adjusted for distinction
    if (avg >= 50) return "B";
    if (avg >= 40) return "C";
    return "Fail";
}

// Add Subject-Mark Pair
document.getElementById("addBtn").addEventListener("click", () => {
    const subject = subjectInput.value.trim();
    const mark = Number(markInput.value);

    if (subject && markInput.value !== "" && mark >= 0 && mark <= 100) {
        marksArray.push({ subject, mark });
        subjectInput.value = "";
        markInput.value = "";
        updateDisplay();
    } else {
        alert("Enter a valid subject and mark (0-100)");
    }
});

// Update Results and Table
function updateDisplay() {
    if (marksArray.length === 0) return;

    const total = marksArray.reduce((sum, item) => sum + item.mark, 0);
    const avg = (total / marksArray.length).toFixed(2);
    const grade = calculateGrade(Number(avg));
    
    // Sort logic for display
    const sortedMarks = [...marksArray].sort((a, b) => b.mark - a.mark);
    const highest = sortedMarks[0].mark;
    const lowest = sortedMarks[sortedMarks.length - 1].mark;

    resultsDiv.innerHTML = `
        <div class="summary-box">
            <h3>Performance Report: ${currentStudent}</h3>
            <p><strong>Total Marks:</strong> ${total}</p>
            <p><strong>Average:</strong> ${avg}% | <strong>Final Grade:</strong> ${grade}</p>
            <p><strong>Highest:</strong> ${highest} | <strong>Lowest:</strong> ${lowest}</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Mark</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${marksArray.map(item => `
                    <tr>
                        <td>${item.subject}</td>
                        <td>${item.mark}</td>
                        <td style="color: ${item.mark >= 40 ? 'green' : 'red'}">
                            ${item.mark >= 40 ? 'Pass' : 'Fail'}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Reset Everything
document.getElementById("resetBtn").addEventListener("click", () => {
    currentStudent = "";
    marksArray = [];
    nameInput.disabled = false;
    nameInput.value = "";
    startBtn.style.display = "inline-block";
    markEntrySection.style.display = "none";
    resultsDiv.innerHTML = "";
});
