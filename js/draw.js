const draw = () => {
    let code = codeInput.value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";

    // draw code
    const maxCode = "👉".repeat(19)
    let maxTextSize = (canvas.width - 60) / 18;

    ctx.font = maxTextSize + "px Arial";

    while (ctx.measureText(maxCode).width > canvas.width - 60) {
        maxTextSize--;
        ctx.font = maxTextSize + "px Arial";
    }

    const maxWidth = ctx.measureText("👉").width;
    const pointerWidth = ctx.measureText("V").width;

    let padding = (canvas.width - maxWidth * 19) / 2

    let codeRow;
    let codeMarginLeft = 0;

    let codeStart = codePointer * 2 - 18
    if (codeStart < 0) {
        codeStart = 0;
    }

    let codeEnd = codePointer * 2 + 20;
    codeRow = code.slice(codeStart, codeEnd);

    // if the pointer is in the first 8 characters, move the row to the right
    if (codePointer <= 9) {
        const diff = 9 - codePointer
        codeMarginLeft = (diff > 0 ? diff : 0) * maxWidth;
        if (codeMarginLeft < 0) {
            codeMarginLeft = 0;
        }
    } else {
        codeMarginLeft = 0;
    }

    ctx.fillText("V", canvas.width / 2 - pointerWidth / 2, maxTextSize + padding);

    let codeRowIndex = 0
    for (let char of codeRow) {

        ctx.fillText(char, codeMarginLeft + padding + codeRowIndex * maxWidth, maxTextSize * 2 + padding + 10);
        codeRowIndex++;
    }

    // draw memory

    let memTextSize = maxTextSize;

    ctx.font = memTextSize + "px Arial";

    while (ctx.measureText("255").width > maxWidth - 10) {
        memTextSize--;
        ctx.font = memTextSize + "px Arial";
    }

    let memRow;
    let memMarginLeft = 0;

    let memStart = memoryPointer - 9
    if (memStart < 0) {
        memStart = 0;
    }

    let memEnd = memoryPointer + 10;
    memRow = memory.slice(memStart, memEnd);

    // if the pointer is in the first 8 characters, move the row to the right
    if (memoryPointer <= 9) {
        const diff = 9 - memoryPointer
        memMarginLeft = (diff > 0 ? diff : 0) * maxWidth;
        if (memMarginLeft < 0) {
            memMarginLeft = 0;
        }
    } else {
        memMarginLeft = 0;
    }

    ctx.fillText("V", canvas.width / 2 - pointerWidth / 2, maxTextSize * 6 + padding);

    let memRowIndex = 0
    for (let char of memRow) {
        let currentWidth = ctx.measureText(char).width;
        ctx.fillText(char, memMarginLeft + padding + memRowIndex * maxWidth + (maxWidth - currentWidth) / 2, maxTextSize * 7 + padding);
        memRowIndex++;
    }

    // draw output

    ctx.font = maxTextSize + "px Arial";

    ctx.fillText("Output: " + output, padding, maxTextSize * 10 + padding);

    if (canvas.height != Math.floor(maxTextSize * 10 + padding * 2)) {
        canvas.height = Math.floor(maxTextSize * 10 + padding * 2);
        draw()
    }


}

const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    draw()
}