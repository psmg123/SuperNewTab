function drag(dom){
    let draggable;
    let offsetX, offsetY;
    let isDragging = false;
    draggable = dom


    draggable.onmousemove = (e) => {

        if (isDragging) {

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            draggable.style.left = x + "px";
            draggable.style.top = y + "px";
        }
    }
    draggable.onmousedown = (e) => {
        console.log("开始拖动")

        isDragging = true;
        // console.log(draggable.getBoundingClientRect().left,draggable.getBoundingClientRect().top)
        // console.log(e.clientX,e.clientY)
        offsetX = e.clientX - draggable.getBoundingClientRect().left;
        offsetY = e.clientY - draggable.getBoundingClientRect().top;


    }

    onmouseup = () => {
        isDragging = false;
        console.log("结束拖动")

    }

}

export {
    drag
}