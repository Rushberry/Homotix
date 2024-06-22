const onetime = document.getElementById('onetime');
const send = document.getElementById('send');
let passwords = [];
let usedPasswords = JSON.parse(localStorage.getItem('usedPasswords')) || [];

// Load passwords from the GitHub URL
fetch('https://raw.githubusercontent.com/Rushberry/homotix.otp/main/password.txt')
  .then(response => response.text())
  .then(passwordsText => {
    passwords = passwordsText.trim().split('\n');

    // Add the event listener after the passwords are loaded
    send.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default form submission behavior

      // Disable the button and change text to loader
      send.innerHTML = '<div class="loader"></div>';
      send.disabled = true;

      const enteredPassword = onetime.value;

      // Check if the entered password is valid and not already used
      if (passwords.includes(enteredPassword) && !usedPasswords.includes(enteredPassword)) {
        // Add the used password to the list
        usedPasswords.push(enteredPassword);
        localStorage.setItem('usedPasswords', JSON.stringify(usedPasswords));

        // Set the expiration time for the session
        const expirationTime = new Date().getTime() + (2592300 * 1000); // 120 seconds from now
        localStorage.setItem('expirationTime', expirationTime);

        // Set the value of the input field to the valid OTP
        document.getElementById('onetime').value = enteredPassword;

        // Submit the form
        fetch('https://script.google.com/macros/s/AKfycbx0382DIyc3yBgfeqzl2pQOadAYx4T_L7o_X-utjcqtaOhVQQNgFv6UfjlI0hZEvemg/exec', {
          method: 'POST',
          body: new FormData(document.getElementById('otp'))
        })
        .then(response => {
          if (response.ok) {
            // Redirect to index.html after successful form submission
            window.location.href = 'P6.html';
          } else {
            alert('Submission failed. Please check your data and try again.');
          }
        })
        .catch(error => {
          console.error('Error during form submission:', error);
          alert('An error occurred. Please try again later.');
        })
        .finally(() => {
          // Re-enable the button and revert text after submission attempt
          send.innerHTML = 'Submit OTP';
          send.disabled = false;
        });
      } else if (usedPasswords.includes(enteredPassword)) {
        alert('It seems the OTP (One-Time Password) provided has already been used. Please verify that you have entered the correct OTP.');
        send.innerHTML = 'Submit OTP';
        send.disabled = false;
      } else {
        alert('It seems the OTP (One-Time Password) provided is invalid. Please verify that you have entered the correct OTP.');
        send.innerHTML = 'Submit OTP';
        send.disabled = false;
      }
    });
  })
  .catch(error => console.error('Error loading OTP:', error));
