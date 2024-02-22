function checkAgreement() {
    var checkbox = document.getElementById('check');

    if (!checkbox.checked) {
      alert('Please agree to the Terms & Conditions.');
      return false;
    }

    return true;
  }