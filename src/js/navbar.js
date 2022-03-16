// scroll - height 93 > navigation bar appears
const mobileLogo = document.querySelector(".navbar__logo.mobile")
const desktopLogo = document.querySelector(".navbar__logo.desktop")
const navBtn = document.querySelector("#navBtn")
const navbar = document.querySelector("#navbar")
const closeBtn = document.querySelector(".navbar__closeBtn")
const mobileNavbar = document.querySelector("#navbar--mobile")
window.addEventListener("resize", (event) => {
    if (window.innerWidth > 650) {
        //desktop
        desktopLogo.style.display = "block"
        mobileLogo.style.display = "none"
        mobileNavbar.style.display = "none"
        navbar.style.display = "flex"
    } else {
        // mobile, tablet
        desktopLogo.style.display = "none"
        mobileLogo.style.display = "block"
        mobileNavbar.style.display = "block"
        navbar.style.display = "none"
    }
})

window.addEventListener("scroll", (event) => {
    if (window.innerWidth > 650) {
        return;
    }
    // y 100 over > navbar--mobile X , burger icon O

    //mobile only

    if (navbar.style.display == "flex")
        return;
    const pageY = (window.pageYOffset)
    if (pageY > 100) {
        navBtn.style.display = "block"
    } else {
        navBtn.style.display = "none"
    }

})

navBtn.addEventListener("click", () => {
    navbar.style.display = "flex"
    navBtn.style.display = "none"
})

closeBtn.addEventListener("click", () => {
    navbar.style.display = "none"
    navBtn.style.display = "block"
})