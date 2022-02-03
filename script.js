function toggleMode(event, mode) {
    let i, textchange;
    textchange = document.getElementsByClassName("toggle");
    for (i = 0; i < textchange.length; i++) {
        textchange[i].style.display = "none";
      }
    document.getElementById(mode).style.display = "inline";
    document.body.classList.toggle("dark-theme");
}






