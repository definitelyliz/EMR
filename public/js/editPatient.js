let timer,
    timeoutVal = 300;
const contact = document.getElementById("contactNumber");
const error = document.getElementById('error');

// detects when the user is actively typing
// triggers a check to see if the user is actually done typing
contact.addEventListener('keyup', handleKeyUp);

function handleKeyUp(e) {
    window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
    timer = window.setTimeout(() => {

        if (isNaN(contact.value)) {
            error.innerHTML = "<span style='color: red; '>" +
                "Please enter a valid number</span>";
        }
        else {
            error.innerHTML = "";
        }
    }, timeoutVal);
}