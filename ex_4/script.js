// Access elements
const colorButtons = document.querySelectorAll(".color-btn");
const redButton = document.getElementById("redBtn");
const greenButton = document.getElementById("greenBtn");
const blueButton = document.getElementById("blueBtn");
const resetButton = document.getElementById("resetBtn");

const customInput = document.getElementById("customColorInput");
const applyBtn = document.getElementById("applyBtn");
const colorDisplay = document.getElementById("colorDisplay");
function updateColor(color) {
    document.body.style.backgroundColor = color;
    colorDisplay.innerText = `Current Color: ${color}`;
    

    colorButtons.forEach(btn => btn.disabled = true);
    applyBtn.disabled = true;
}

redButton.addEventListener("click", () => updateColor("red"));
greenButton.addEventListener("click", () => updateColor("green"));
blueButton.addEventListener("click", () => updateColor("blue"));

applyBtn.addEventListener("click", function () {
    const userColor = customInput.value;
    if (userColor) {
        updateColor(userColor);
    }
});

resetButton.addEventListener("click", function () {
    document.body.style.backgroundColor = "white";
    colorDisplay.innerText = "Current Color: Default (White)";
    customInput.value = "";

    colorButtons.forEach(btn => btn.disabled = false);
    applyBtn.disabled = false;
});
