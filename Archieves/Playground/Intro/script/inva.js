function isLaptop() {
    return window.innerWidth > 1024;
}

function redirectIfLaptop() {
    if (isLaptop()) {
        window.location.href = '404';
    }
}
window.onload = redirectIfLaptop;