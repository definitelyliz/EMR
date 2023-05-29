

//Buttons
const subjBtn = document.getElementById("subjBtn");
const assessBtn = document.getElementById("assessBtn");
const objBtn = document.getElementById("objBtn");
const planBtn = document.getElementById("planBtn");

//Minus Buttons
const subjMinus = document.getElementById("subjMinus");
const assessMinus = document.getElementById("assessMinus");
const objMinus = document.getElementById("objMinus");
const planMinus = document.getElementById("planMinus");

//Text inputs
var subjective = document.querySelector("#subjective");
var assessment = document.querySelector("#assessment");
var objective = document.querySelector("#objective");
var plan = document.querySelector("#plan");

//Ul div container
var subjCont = document.getElementById('subjCont');
var assessCont = document.getElementById('assessCont');
var objCont = document.getElementById('objCont');
var planCont = document.getElementById('planCont');

function getInputVal() {
    console.log(inputEl.value);
}

var subjCount = 0;
var assessCount = 0;
var objCount = 0;
var planCount = 0;

var subjArr = [];
var assessArr = [];
var objArr = [];
var planArr = [];

function subjPush(req, res) {
    subjArr.push(subjective.value)
    // create ul element and set the attributes.
    var ul = document.createElement('ul');
    ul.setAttribute('style', 'padding: 0; margin: 0;');
    ul.setAttribute('id', 'theList');

    for (subjCount; subjCount <= subjArr.length - 1; subjCount++) {
        var newInput = document.createElement('textarea')
        newInput.value = "";
        newInput.setAttribute('name', 'subjective');
        newInput.setAttribute('class', 'subjective');
        newInput.required = true;
        ul.appendChild(newInput);
    }

    subjCont.appendChild(ul);       // add list to the c
    subjCount = subjArr.length;
}

function assessPush(req, res) {
    assessArr.push(assessment.value)
    // create ul element and set the attributes.
    var ul = document.createElement('ul');
    ul.setAttribute('style', 'padding: 0; margin: 0;');
    ul.setAttribute('id', 'theList');

    for (assessCount; assessCount <= assessArr.length - 1; assessCount++) {
        var newInput = document.createElement('textarea')
        newInput.value = "";
        newInput.setAttribute('name', 'assessment');
        newInput.setAttribute('class', 'assessment');
        newInput.required = true;
        ul.appendChild(newInput);
    }

    assessCont.appendChild(ul);       // add list to the c
    assessCount = assessArr.length;
}

function objPush(req, res) {
    objArr.push(objective.value)
    // create ul element and set the attributes.
    var ul = document.createElement('ul');
    ul.setAttribute('style', 'padding: 0; margin: 0;');
    ul.setAttribute('id', 'theList');

    for (objCount; objCount <= objArr.length - 1; objCount++) {
        var newInput = document.createElement('textarea')
        newInput.value = "";
        newInput.setAttribute('name', 'objective');
        newInput.setAttribute('class', 'objective');
        newInput.required = true;
        ul.appendChild(newInput);
    }

    objCont.appendChild(ul);       // add list to the c
    objCount = objArr.length;
}

function planPush(req, res) {
    planArr.push(plan.value)
    // create ul element and set the attributes.
    console.log(`planarr: ${planArr}`)
    var ul = document.createElement('ul');
    ul.setAttribute('style', 'padding: 0; margin: 0;');
    ul.setAttribute('id', 'theList');

    for (planCount; planCount <= planArr.length - 1; planCount++) {

        var newCategory = document.createElement('div');
        newCategory.setAttribute('class', 'plan');


        var newSelect = document.createElement('select');
        newSelect.setAttribute('name', 'category');
        newSelect.setAttribute('id', 'opt');

        var firstOption = document.createElement('option');
        var secondOption = document.createElement('option');
        var thirdOption = document.createElement('option');

        firstOption.setAttribute('value', 'Medications');
        secondOption.setAttribute('value', 'Laboratory');
        thirdOption.setAttribute('value', 'Others');

        firstOption.innerHTML = "Medications";
        secondOption.innerHTML = "Laboratory";
        thirdOption.innerHTML = "Others";

        newSelect.appendChild(firstOption);
        newSelect.appendChild(secondOption);
        newSelect.appendChild(thirdOption);

        newCategory.appendChild(newSelect);

        var newInput = document.createElement('textarea');
        newInput.value = "";
        newInput.setAttribute('name', 'plandescription');
        newInput.setAttribute('class', 'planText');
        newInput.required = true;

        newCategory.appendChild(newInput);

        ul.appendChild(newCategory);
    }

    planCont.appendChild(ul);       // add list to the c
    planCount = planArr.length;
}


function subjPull() {
    // create ul element and set the attributes.
    var elem = document.querySelectorAll(".subjective");
    lastElem = elem[elem.length - 1];
    lastElem.remove();
}
function assessPull() {
    // create ul element and set the attributes.
    var elem = document.querySelectorAll(".assessment");
    lastElem = elem[elem.length - 1];
    lastElem.remove();
}
function objPull() {
    // create ul element and set the attributes.
    var elem = document.querySelectorAll(".objective");
    lastElem = elem[elem.length - 1];
    lastElem.remove();
}
function planPull() {
    // create ul element and set the attributes.
    var elem = document.querySelectorAll(".planText");
    var categoryElem = document.querySelectorAll("#opt")
    lastElem = elem[elem.length - 1];
    lastCategoryElem = categoryElem[categoryElem.length - 1];
    lastElem.remove();
    lastCategoryElem.remove();
}



subjBtn.addEventListener("click", subjPush); // add list to the container.
assessBtn.addEventListener("click", assessPush);
objBtn.addEventListener("click", objPush);
planBtn.addEventListener("click", planPush);

//remove

subjMinus.addEventListener("click", subjPull);
assessMinus.addEventListener("click", assessPull);
objMinus.addEventListener("click", objPull);
planMinus.addEventListener("click", planPull);



