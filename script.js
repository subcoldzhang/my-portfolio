document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const navMenu = navbar ? navbar.querySelector("ul") : null;

    if (!menuToggle || !navMenu) {
        return;
    }

    menuToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});
