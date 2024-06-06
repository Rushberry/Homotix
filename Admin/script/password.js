function authenticate() {
    var password = document.getElementById('password').value;
    if (password === 'Alhamdulillah') {
        localStorage.setItem('authenticated', 'admin');
        window.location.href = '../admin';
    } else if (password === 'HXATAMIM') {
        localStorage.setItem('authenticated', 'agend');
        window.location.href = '../agend';
    } else {
        alert('Incorrect password. Please try again.');
    }
}

var timer; 
function showPassword() {
    var passwordInput = document.getElementById('password');
    passwordInput.type = 'text';
}
function hidePassword() {
    var passwordInput = document.getElementById('password');
    passwordInput.type = 'password';
}
function onKeyPress() {
    clearTimeout(timer);  
    showPassword();
    timer = setTimeout(hidePassword, 1000);
}
