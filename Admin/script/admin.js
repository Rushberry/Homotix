const authStatus = localStorage.getItem('authenticated');

if (authStatus !== 'admin') {
    if (authStatus === 'agend') {
        window.location.href = '../agend';
    } else {
        window.location.href = 'Admin/password';
    }
}
