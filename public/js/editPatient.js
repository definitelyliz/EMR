//Buttons
const subjBtn = document.getElementById("subjBtn");
//Minus Buttons
const subjMinus = document.getElementById("subjMinus");
//Text inputs
var subjective = document.querySelector("#subjective");
//Ul div container
var subjCont = document.getElementById('subjCont');

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

function getInputVal() {
    console.log(inputEl.value);
}

var subjCount = 0;
var subjArr = [];

function subjPush(req, res) {
    subjArr.push(subjective.value)
    // create ul element and set the attributes.
    var ul = document.createElement('ul');
    ul.setAttribute('style', 'padding: 0; margin: 0;');
    ul.setAttribute('id', 'theList');

    
    for (subjCount; subjCount <= subjArr.length - 1; subjCount++) {
        var newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('id', 'subjective');
        newInput.setAttribute('name', 'subjective');
        newInput.setAttribute('class', 'subjective');
        newInput.setAttribute('autocomplete', 'off');
        newInput.required = true;
        ul.appendChild(newInput);
      }

    subjCont.appendChild(ul);       // add list to the c
    subjCount = subjArr.length;
}

function subjPull() {
    // create ul element and set the attributes.
    var elem = document.querySelectorAll(".subjective");
    lastElem = elem[elem.length - 1];
    lastElem.remove();
}

subjBtn.addEventListener("click", subjPush); // add list to the container.
subjMinus.addEventListener("click", subjPull);
