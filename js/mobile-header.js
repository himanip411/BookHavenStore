document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector(".main-header");
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".menu-overlay");
    const closeBtn = document.querySelector(".close-menu-btn");

    // Shrink header
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
    });

    // OPEN MENU
    hamburger.addEventListener("click", () => {
        hamburger.classList.add("active");
        mobileMenu.classList.add("open");
        overlay.classList.add("show");
        closeBtn.classList.add("show");   // show floating X button
    });

    // CLOSE MENU (close button)
    closeBtn.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("open");
        overlay.classList.remove("show");
        closeBtn.classList.remove("show");
    });

    // CLOSE MENU (overlay click)
    overlay.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("open");
        overlay.classList.remove("show");
        closeBtn.classList.remove("show");
    });

});
