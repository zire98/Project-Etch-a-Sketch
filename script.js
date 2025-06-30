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
    return { r, g, b };
}

function rgbToString({ r, g, b }) {
    return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor({ r, g, b }, factor) {
    return {
        r: Math.floor(r * factor),
        g: Math.floor(g * factor),
        b: Math.floor(b * factor),
    };
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

        const originalColor = getRandomRGBColor();
        square.dataset.r = originalColor.r;
        square.dataset.g = originalColor.g;
        square.dataset.b = originalColor.b;
        square.dataset.darkness = 0;

        square.style.backgroundColor = rgbToString(originalColor);

        square.addEventListener("mouseover", () => {
            let darkness = Number(square.dataset.darkness);
            if (darkness < 10) {
                darkness++;
                square.dataset.darkness = darkness;
                const factor = 1 - darkness * 0.1;
                const darkenedColor = darkenColor(
                    {
                        r: Number(square.dataset.r),
                        g: Number(square.dataset.g),
                        b: Number(square.dataset.b),
                    },
                    factor
                );
                square.style.backgroundColor = rgbToString(darkenedColor);
            }
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
