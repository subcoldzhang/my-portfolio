document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("navbar").querySelector("ul");

    menuToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});