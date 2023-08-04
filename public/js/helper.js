const medications = [];
const laboratory = [];
const others = [];

for (const item of Consultation.plan) {
    if (item.category === 'Medications') {
        medications.push(item.description);
    } else if (item.category === 'Laboratory') {
        laboratory.push(item.description);
    } else if (item.category === 'Others') {
        others.push(item.description);
    }
}

console.log('Medications:', medications);
console.log('Laboratory:', laboratory);
console.log('Others:', others);