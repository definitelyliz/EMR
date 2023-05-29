

//Buttons
const subjBtn = document.getElementById("subjBtn");
const assessBtn = document.getElementById("assessBtn");
const objBtn = document.getElementById("objBtn");
const planBtn = document.getElementById("planBtn");

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
        var li = document.createElement('li');

        li.innerHTML = '- ' + subjArr[subjCount];    // assigning text to li using array value.
        li.setAttribute('style', 'display: block;');    // remove the bullets.
        ul.appendChild(li);// append li to ul.
        var newInput = document.createElement('input')
        newInput.value = subjArr[subjCount];
        newInput.setAttribute('type', 'hidden');
        newInput.setAttribute('name', 'subjective');
        ul.appendChild(newInput);
    }

    subjCont.appendChild(ul);       // add list to the c
    subjCount = subjArr.length;
    subjective.value = "";
}

function assessPush(req, res) {
    assessArr.push(assessment.value)
    // create ul element and set the attributes.
    var ul = document.createElement('ul');
    ul.setAttribute('style', 'padding: 0; margin: 0;');
    ul.setAttribute('id', 'theList');

    for (assessCount; assessCount <= assessArr.length - 1; assessCount++) {
        var li = document.createElement('li');
        li.innerHTML = '- ' + assessArr[assessCount];    // assigning text to li using array value.
        li.setAttribute('style', 'display: block;');    // remove the bullets.
        ul.appendChild(li);
        var newInput = document.createElement('input')
        newInput.value = assessArr[assessCount];
        newInput.setAttribute('type', 'hidden');
        newInput.setAttribute('name', 'assessment');
        ul.appendChild(newInput);
    }

    assessCont.appendChild(ul);       // add list to the c
    assessCount = assessArr.length;
    assessment.value = "";
}

function objPush(req, res) {
    objArr.push(objective.value)
    // create ul element and set the attributes.
    var ul = document.createElement('ul');
    ul.setAttribute('style', 'padding: 0; margin: 0;');
    ul.setAttribute('id', 'theList');

    for (objCount; objCount <= objArr.length - 1; objCount++) {
        var li = document.createElement('li');
        li.innerHTML = '- ' + objArr[objCount];    // assigning text to li using array value.
        li.setAttribute('style', 'display: block;');    // remove the bullets.
        ul.appendChild(li);// append li to ul.
        var newInput = document.createElement('input')
        newInput.value = objArr[objCount];
        newInput.setAttribute('type', 'hidden');
        newInput.setAttribute('name', 'objective');
        ul.appendChild(newInput);
    }

    objCont.appendChild(ul);       // add list to the c
    objCount = objArr.length;
    objective.value = "";
}

function planPush(req, res) {
    planArr.push(plan.value)
    // create ul element and set the attributes.
    console.log(`planarr: ${planArr}`)
    var ul = document.createElement('ul');
    ul.setAttribute('style', 'padding: 0; margin: 0;');
    ul.setAttribute('id', 'theList');

    for (planCount; planCount <= planArr.length - 1; planCount++) {
        var li = document.createElement('li');
        li.innerHTML = '- ' + planArr[planCount];    // assigning text to li using array value.
        li.setAttribute('style', 'display: block;');    // remove the bullets.
        ul.appendChild(li);
        var newInput = document.createElement('input')
        newInput.value = planArr[planCount];
        newInput.setAttribute('type', 'hidden');
        newInput.setAttribute('name', 'plan');
        ul.appendChild(newInput);
    }

    planCont.appendChild(ul);       // add list to the c
    planCount = planArr.length;
    plan.value = "";
}



subjBtn.addEventListener("click", subjPush); // add list to the container.
assessBtn.addEventListener("click", assessPush);
objBtn.addEventListener("click", objPush);
planBtn.addEventListener("click", planPush);

exports.subjArr;
exports.assessArr;
exports.objArr;
exports.planArr;


