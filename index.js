const boxContainer = document.querySelector(".box-container")
const gridSizeBtn = document.querySelector(".grid-size-btn")

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

    generateGrid(size)
})

const box = document.createElement("div")
box.classList.add("box")

box.style.width = calculateBoxSize(16)
box.style.height = calculateBoxSize(16)

function calculateBoxSize(gridSize) {
    return Math.round((512 / gridSize) * 10) / 10;
}

boxContainer.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("box")) {
        let r = getRandomInt(256)
        let g = getRandomInt(256)
        let b = getRandomInt(256)
        //e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b}, 1)`;
        e.target.style.backgroundColor = "white"
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

    console.log(calculateBoxSize(size))

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

generateGrid(16);