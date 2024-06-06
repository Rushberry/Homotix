const authStatus = localStorage.getItem('authenticated');

if (authStatus !== 'admin') {
    if (authStatus === 'agent') {
        window.location.href = '../agent';
    } else {
        window.location.href = '../password';
    }
}

if (localStorage.getItem('authenticated') !== 'agent') {
  window.location.href = '../password';
}
