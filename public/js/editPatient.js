// Buttons
const medHisBtn = document.getElementById("medHisBtn");
const medHisMinus = document.getElementById("medHisMinus");
// Text inputs
const medHisective = document.querySelector(".medicalHistory");
// Ul div container
const medHisCont = document.getElementById('medHisCont');

function medHisPush() {
  const newInput = document.createElement('input');
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('class', 'medicalHistory');
  newInput.setAttribute('name', 'medicalHistory');
  newInput.setAttribute('autocomplete', 'off');
  newInput.required = true;

  medHisCont.appendChild(newInput);
}

function medHisPull() {
  const elem = document.querySelectorAll(".medicalHistory");
  const lastElem = elem[elem.length - 1];
  if (elem.length > 1) {
    lastElem.remove();
  }
}

// Check if it's the add patient page
if (document.getElementById("addPatientPage")) {
  // Add patient page specific behavior
  if (medHisBtn) {
    medHisBtn.addEventListener("click", medHisPush);
  }

  if (medHisMinus) {
    medHisMinus.addEventListener("click", medHisPull);
  }
} else if (document.getElementById("editPatientPage")) {
  // Edit patient page specific behavior
  // Customize the behavior for the edit patient page if needed
  const medHisBtnEdit = document.getElementById("medHisBtn");
  const medHisMinusEdit = document.getElementById("medHisMinus");

  if (medHisBtnEdit) {
    medHisBtnEdit.addEventListener("click", medHisPush);
  }

  if (medHisMinusEdit) {
    medHisMinusEdit.addEventListener("click", medHisPull);
  }
}
