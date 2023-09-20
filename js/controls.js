const codeInput = document.querySelector(".codeInput");

const clearButton = document.querySelector(".clear");
const eraseButton = document.querySelector(".erase");

const moveRightButton = document.querySelector(".move-right");
const moveLeftButton = document.querySelector(".move-left");
const sumButton = document.querySelector(".sum");
const subButton = document.querySelector(".substract");
const printButton = document.querySelector(".print");
const loopStartButton = document.querySelector(".loop-start");
const loopEndButton = document.querySelector(".loop-end");




clearButton.addEventListener("click", () => {
    if (playing) return
    codeInput.value = "";
    draw()
})

eraseButton.addEventListener("click", () => {
    if (playing) return
    codeInput.value = codeInput.value.slice(0, -2);
    draw()
})

moveRightButton.addEventListener("click", () => {
    if (playing) return
    codeInput.value = codeInput.value + "👉";
    draw()
})

moveLeftButton.addEventListener("click", () => {
    if (playing) return
    codeInput.value = codeInput.value + "👈";
    draw()
})

sumButton.addEventListener("click", () => {
    if (playing) return
    codeInput.value = codeInput.value + "👆";
    draw()
})

subButton.addEventListener("click", () => {
    if (playing) return
    codeInput.value = codeInput.value + "👇";
    draw()
})

loopStartButton.addEventListener("click", () => {
    if (playing) return
    codeInput.value = codeInput.value + "🤜";
    draw()
})

loopEndButton.addEventListener("click", () => {
    if (playing) return
    codeInput.value = codeInput.value + "🤛";
    draw()
})

printButton.addEventListener("click", () => {
    if (playing) return
    codeInput.value = codeInput.value + "👊";
    draw()
})

const infoButton = document.querySelector("#info-button");
const closeButton = document.querySelector("#close-info");
const info = document.querySelector("#info");

infoButton.addEventListener("click", () => {
    info.classList.remove("hidden");
}
)

closeButton.addEventListener("click", () => {
    info.classList.add("hidden");
}
)
