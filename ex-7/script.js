const noteInput = document.getElementById("noteInput");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const notesList = document.getElementById("notesList");
const searchInput = document.getElementById("searchInput");

window.onload = displayNotes;

// Save Note Logic
saveBtn.addEventListener("click", function () {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    const text = noteInput.value.trim();

    // Practice Exercise 2: Limit to 10 entries
    if (notes.length >= 10) {
        alert("Limit reached! You can only save up to 10 notes.");
        return;
    }

    if (text !== "") {
        const newNote = {
            id: Date.now(),
            content: text,
            timestamp: new Date().toLocaleString() // Practice Exercise 1: Timestamp
        };

        notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(notes));
        noteInput.value = "";
        displayNotes();
    } else {
        alert("Please enter a note");
    }
});

// Practice Exercise 1: Individual Delete
function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

// Clear All Logic
clearBtn.addEventListener("click", function () {
    if(confirm("Are you sure you want to delete all notes?")) {
        localStorage.removeItem("notes");
        displayNotes();
    }
});

// Practice Exercise 2: Search Filter
function filterNotes() {
    const filter = searchInput.value.toLowerCase();
    const notes = document.querySelectorAll(".note");

    notes.forEach(note => {
        const text = note.querySelector("p").textContent.toLowerCase();
        note.style.display = text.includes(filter) ? "block" : "none";
    });
}

// Display Logic
function displayNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = "";

    notes.forEach((note) => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
            <p>${note.content}</p>
            <small>📅 ${note.timestamp}</small>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
        `;
        notesList.appendChild(div);
    });
}
