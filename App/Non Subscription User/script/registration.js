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

document.getElementById("registration").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;

    const educationInput = form.querySelector("[name='Educational Qualification (BHMS/DHMS)']");
    const mobileNumberInput = form.querySelector("[name='Mobile Number (+880)']");
    const checkbox = document.getElementById('check');

    validateEducation(educationInput);
    validateMobileNumber(mobileNumberInput);

    if (form.checkValidity() && checkAgreement()) {
        const formData = new FormData(form);

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
                }
            })
            .catch(error => {
                console.error("Error during form submission:", error);
                alert("An error occurred. Please try again later.");
            });
    }
});

function checkAgreement() {
    var checkbox = document.getElementById('check');

    if (!checkbox.checked) {
      alert('Please agree to the Terms & Conditions.');
      return false;
    }

    return true;
}
