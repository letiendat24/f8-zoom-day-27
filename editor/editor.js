const text = document.querySelector("#text");
const display = document.querySelector(".display");
const container =  document.querySelector(".container");
const contextMenu = document.querySelector(".contextmenu");
function handleConfirmBeforeUnload(event) {
    event.returnValue = "Do you want to exit now";
}
text.oninput = (event) => {
    if (event.target.value) {
        display.srcdoc = event.target.value;
        window.addEventListener("beforeunload", handleConfirmBeforeUnload);
    } else {
        window.removeEventListener("beforeunload", handleConfirmBeforeUnload);
    }
}

document.oncontextmenu = (e) => {
    const menuW = contextMenu.offsetWidth;
    const menuH = contextMenu.offsetHeight;
    const winW  = window.innerWidth;
     const winH  = window.innerHeight;
    e.preventDefault();
    contextMenu.hidden = false;
    Object.assign(contextMenu.style,  {
        top: e.clientY + "px",
        left: e.clientX + "px",
    })

}
display.contentDocument.oncontextmenu = (e) => {
    e.preventDefault();
    contextMenu.hidden = false;
    Object.assign(contextMenu.style,  {
        top: e.clientY + "px",
        left: e.clientX + "px",
    })
}
document.addEventListener('mousedown', (e) => {
  if (!contextMenu.contains(e.target)) {
    contextMenu.hidden = true;
  }
});

contextMenu.onclick = function(e) {
    const li = e.target.closest('li');
    if (li.dataset["active"] === "delete") {
        text.value = "";
        display.srcdoc =  text.value;
    }
}


