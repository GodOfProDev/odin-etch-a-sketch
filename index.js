const boxContainer = document.querySelector(".box-container")
const gridSizeBtn = document.querySelector(".grid-size-btn")
const colorPicker = document.querySelector("#color-picker");
const rgbBrush = document.querySelector("#rgb-brush")
const eraseTheBoard = document.querySelector(".eraser-board")
const partyBtn = document.querySelector(".party-btn")

let gridSize = 16;

let isParty = false;
let partyId = -1;

partyBtn.addEventListener("click", () => {
    isParty = !isParty

    if (isParty) {
        partyId = setInterval(function () {
            let boxes = document.querySelectorAll(".box")

            boxes.forEach((box) => {
                let r = getRandomInt(256)
                let g = getRandomInt(256)
                let b = getRandomInt(256)
                box.style.backgroundColor = `rgb(${r}, ${g}, ${b}, 1)`;
            })
        }, 250)
    } else {
        if (partyId !== -1) {
            clearInterval(partyId)
        }
    }
})

gridSizeBtn.addEventListener("click", () => {
    let promptValue = prompt("Enter the grid size")

    let size = parseInt(promptValue)

    if (!Number.isInteger(size) || size < 0) {
        alert("Invalid size")
        return;
    }

    if (size > 100) {
        alert("Too Big! Pick a number lower than 100")
        return;
    }

    gridSize = size

    generateGrid(gridSize)
})

const box = document.createElement("div")
box.classList.add("box")

box.style.width = calculateBoxSize(16)
box.style.height = calculateBoxSize(16)

eraseTheBoard.addEventListener("click", () => {
    generateGrid(gridSize)
})



function calculateBoxSize(gridSize) {
    return Math.round((512 / gridSize) * 10) / 10;
}

let isRgbBrush = false;

rgbBrush.addEventListener("input", function () {
    isRgbBrush = this.checked
});

let brushColor = "black"

colorPicker.addEventListener("input", (e) => {
    brushColor = colorPicker.value
})

boxContainer.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("box")) {
        let r = getRandomInt(256)
        let g = getRandomInt(256)
        let b = getRandomInt(256)

        if (isRgbBrush) {
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b}, 1)`;
        } else {
            e.target.style.backgroundColor = brushColor
        }
    }
})

const row = document.createElement("div")
row.classList.add("flex")

function getRandomInt(max) {
    return Math.round(Math.random() * (max + 1))
}

function generateGrid(size) {
    let fragment = new DocumentFragment()

    deleteAllChildren(boxContainer)

    let boxToClone = box.cloneNode()
    boxToClone.style.width = `${calculateBoxSize(size)}px`
    boxToClone.style.height = `${calculateBoxSize(size)}px`

    for (let i = 0; i < size; i++) {
        let newNode = row.cloneNode()
        for (let j = 0; j < size; j++) {
            newNode.appendChild(boxToClone.cloneNode())
        }
        fragment.appendChild(newNode)
    }

    boxContainer.appendChild(fragment)
}

function deleteAllChildren(node) {
    while (node.lastElementChild) {
        node.removeChild(node.lastElementChild)
    }
}

generateGrid(gridSize);