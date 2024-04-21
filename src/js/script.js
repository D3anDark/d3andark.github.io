 var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModal");
    var span = document.getElementsByClassName("close")[0];
    var body = document.body;
    var topElement = document.querySelector(".top");

    btn.onclick = function() {
    modal.style.display = "block";
    body.classList.add("modal-open");
    topElement.classList.add("top-hidden");
}

    span.onclick = function() {
    modal.style.display = "none";
    body.classList.remove("modal-open");
    topElement.classList.remove("top-hidden");
}

    window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    body.classList.remove("modal-open");
    topElement.classList.remove("top-hidden");
}
}
