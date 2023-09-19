
window.addEventListener("load", () => {
    codeInput.value = "👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊"
    resize();
})

window.addEventListener("resize", () => {
    resize();
})


const runButton = document.querySelector(".run");
const canvas = document.querySelector("canvas");

let ctx = canvas.getContext("2d");
let codePointer = 0
let memory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let memoryPointer = 0;
let playing = false;
let output = "";

runButton.addEventListener("click", () => {
    if (checkCode(codeInput.value) && !playing) {
        playing = true;
        codePointer = 0
        memoryPointer = 0;
        output = "";
        runCode(codeInput.value);
    } else if (playing) {
        playing = false;
        codePointer = 0
        memoryPointer = 0;
        output = "";
    }

})

const checkCode = (code) => {
    let loopCount = 0;
    for (let char of code) {
        if (char === "🤜") {
            loopCount++;
        } else if (char === "🤛") {
            loopCount--;
        }
        if (loopCount < 0) {
            return false;
        }
    }
    return loopCount === 0;
}

const runCode = async () => {
    let code = codeInput.value;
    let loopStack = [];
    memory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let lastloop = 0;




    for (let i = 0; i < code.length; i += 2) {
        if (!playing) {
            break;
        }

        codePointer = i / 2;
        const instruction = code[i] + code[i + 1];
        switch (instruction) {
            case "👉":
                memoryPointer++;
                if (memoryPointer >= memory.length) {
                    memory.push(0);
                }
                break;
            case "👈":
                memoryPointer--;
                if (memoryPointer < 0) {
                    memory.unshift(0);
                    memoryPointer = 0;
                }
                break;
            case "👆":
                memory[memoryPointer] = (memory[memoryPointer] + 1) % 256;
                break;
            case "👇":
                memory[memoryPointer] = (memory[memoryPointer] === 0 ? 255 : memory[memoryPointer] - 1);
                break;
            case "🤜":
                if (memory[memoryPointer] === 0) {
                    let loopCount = 1;
                    i += 2;
                    while (loopCount > 0) {
                        if (code[i] + code[i + 1] === "🤜") {
                            loopCount++;
                        } else if (code[i] + code[i + 1] === "🤛") {
                            loopCount--;
                        }
                        i += 2;
                    }
                    i -= 2;

                } else {
                    loopStack.push(i);
                    lastloop = i;
                    await sleep(300);
                }
                break;
            case "🤛":
                if (memory[memoryPointer] !== 0) {
                    i = loopStack[loopStack.length - 1];

                    lastloop = -1

                } else {
                    loopStack.pop();
                    await sleep(300);
                }
                break;
            case "👊":
                output += String.fromCharCode(memory[memoryPointer]);
                break;
        }
        draw();
        if (loopStack.length > 0 && lastloop === loopStack[loopStack.length - 1]) {
            await sleep(150);
        } else if (loopStack.length === 0) {
            await sleep(100);
        }

    }


    playing = false;
    codePointer = 0
    memoryPointer = 0;
    output = "";
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}



