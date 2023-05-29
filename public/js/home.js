function calculateAge(date) 
{
  const now = new Date();
  const diff = Math.abs(now - date );
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 
//   return age
  document.getElementById('age').innerHTML = "Age: "+age ;
  return age
}


