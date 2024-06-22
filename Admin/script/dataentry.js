function capitalizeFirstLetter(input) {
  input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
}

function validateEducation(input) {
  const validValues = ['BHMS', 'DHMS'];
  const inputValue = input.value.toUpperCase();

  if (!validValues.includes(inputValue)) {
    input.setCustomValidity("Please enter 'BHMS' or 'DHMS'");
  } else {
    input.setCustomValidity("");
  }
}

function validateMobileNumber(input) {
  const inputValue = input.value;

  if (inputValue.length !== 11 || !inputValue.startsWith('01')) {
    input.setCustomValidity("Mobile Number must start with '01' and be 11 digits");
  } else {
    input.setCustomValidity("");
  }
}

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function validateAndFormatDate(input) {
  const datePattern = /^(\d{2})\.(\d{2})\.(\d{2})$/;
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const match = input.value.match(datePattern);

  if (match) {
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10) + 2000;

    if (month >= 1 && month <= 12) {
      const monthName = months[month - 1];
      const ordinalSuffix = getOrdinalSuffix(day);
      input.value = `${day}${ordinalSuffix} ${monthName} ${year}`;
      input.setCustomValidity(""); // Clear custom validity message
    } else {
      input.setCustomValidity("Invalid month in date. Please use format DD.MM.YY");
    }
  } else {
    input.setCustomValidity("Please enter date in format DD.MM.YY");
  }

  // Since the date format is now correct, remove custom validity message
  input.setCustomValidity("");

  input.reportValidity(); // Ensure custom validity message is cleared
}

function applyBengaliFont(input) {
  const bengaliPattern = /[\u0980-\u09FF]/; // Unicode range for Bengali characters

  if (bengaliPattern.test(input.value)) {
    input.classList.add('bengali-font');
  } else {
    input.classList.remove('bengali-font');
  }
}

function applyBengaliFontToAllInputs() {
  const bengaliPattern = /[\u0980-\u09FF]/; // Unicode range for Bengali characters
  const allInputs = document.querySelectorAll("input");

  allInputs.forEach(input => {
    if (bengaliPattern.test(input.value)) {
      input.classList.add('bengali-font');
    } else {
      input.classList.remove('bengali-font');
    }
  });
}

document.getElementById("registration").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.target;

  const dateInput = form.querySelector("[name='IDate']");
  const educationInput = form.querySelector("[name='Educational Qualification (BHMS/DHMS)']");
  const mobileNumberInput = form.querySelector("[name='Mobile Number (+880)']");

  validateAndFormatDate(dateInput);
  validateEducation(educationInput);
  validateMobileNumber(mobileNumberInput);

  if (form.checkValidity()) {
    const formData = new FormData(form);

    // Replace submit button text with loader and disable the button
    const submitButton = document.getElementById("send");
    submitButton.innerHTML = '<div class="loader"></div>';
    submitButton.disabled = true;

    fetch(form.action, {
      method: form.method,
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === "success") {
        window.location.href = "success.html";
      } else {
        alert("Submission failed. Please check your data and try again.");
        form.reset();
        submitButton.innerHTML = 'Submit Data'; // Revert to original text
        submitButton.disabled = false;
      }
    })
    .catch(error => {
      console.error("Error during form submission:", error);
      alert("An error occurred. Please try again later.");
      submitButton.innerHTML = 'Submit Data'; // Revert to original text
      submitButton.disabled = false;
    });
  }
});

// Bind the onblur event to apply the Bengali font
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("blur", function() {
    applyBengaliFont(this);
  });
});

// Call the function whenever a key is pressed in any input field
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", applyBengaliFontToAllInputs);
});
