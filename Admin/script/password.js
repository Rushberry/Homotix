function authenticate() {
    var password = document.getElementById('password').value;
    if (password === 'Ana Rushan Ibn Anwar') {
        localStorage.setItem('authenticated', 'true');
        window.location.href = '../admin';
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