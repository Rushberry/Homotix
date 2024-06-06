if (localStorage.getItem('authenticated') !== 'agent') {
    window.location.href = '/Admin/password';
}
