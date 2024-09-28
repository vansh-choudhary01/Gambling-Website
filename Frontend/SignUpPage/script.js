function restrictToOneDigit(input) {
    // Ensure the value is a single digit between 1 and 9
    if (input.value.length > 1 || input.value < 1 || input.value > 9) {
        input.value = input.value.slice(0, 1); // Keep only the first character (if more than one digit is entered)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let signUpBtn = document.getElementById('RegisterBtn');
    let otpBox = document.querySelector('.otp');
    let backBtn = document.querySelector('.back');
    // for otp
    let userInput = [...document.querySelectorAll('.input')];
    let signUpForm = document.querySelector('#signUp');

    //generate otp
    let otp = Math.floor(1000 + Math.random() * 9000);
    signUpBtn.addEventListener('click', () => {
        if (userInput.every(inp => inp.value.length > 0) && userInput[1].value.length == 10) {
            otpSent(userInput[0].value, otp);
            otpBox.style.display = 'flex';
        } else {
            alert('Please fill all input before submit the information.');
        }
    })

    // control otp page
    backBtn.addEventListener('click', () => {
        otpBox.style.display = 'none';
    })

    const otpSent = (email, otp) => {
        fetch('/emailotp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp })
        })
    }

    // submit form after otp send
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let otpElements = document.querySelectorAll('.otpcode').values();

        let userOtp = 0;

        // Convert NodeList to an array and loop through it
        otpElements.forEach((element) => {
            // Get the value of each input (assuming they're input fields)
            let value = parseInt(element.value) || 0; // Convert to integer, default to 0 if NaN
            userOtp = userOtp * 10 + value; // Build the OTP number
        });

        if(userOtp === otp) {
            signUpForm.submit();
        } else {
            alert('otp is wrong plz check again');
        }
    })

    let resend = document.querySelector(".resend");

    resend.addEventListener('click', () => {
        otp = otp = Math.floor(1000 + Math.random() * 9000);
        otpSent(userInput[0].value, otp);
        console.log("send");
    })
})