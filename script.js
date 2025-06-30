// Const
const DEF_SIZE = 16;
const MAX_SIZE = 100;
const GRID_WIDTH = 960;

let grid;

// Functions

function getRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function clearGrid() {
    grid.innerHTML = "";
}

function createGrid(size) {
    clearGrid();
    const squareSize = GRID_WIDTH / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = getRandomRGBColor();
        });

        grid.appendChild(square);
    }
}

// Events
document.addEventListener("DOMContentLoaded", () => {
    grid = document.querySelector("#container");
    const button = document.querySelector("#buttonSize");

    button.addEventListener("click", () => {
        let newSize = parseInt(prompt(`Enter new grid size (max ${MAX_SIZE})`));
        if (newSize > 0 && newSize <= MAX_SIZE) {
            createGrid(newSize);
        } else {
            alert(`Invalid input. Please enter a number between 1 and ${MAX_SIZE}`);
        }
    });
    createGrid(DEF_SIZE);
});
