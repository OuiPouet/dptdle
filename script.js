document.addEventListener('DOMContentLoaded', () => {
  console.log('Bonjour monde Departementdle !');
  const target = generateDepartement();  
  const input = document.querySelector('#input');

  input.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      const prompt = formatName(input.value);
      departementValidator(prompt).then((res) => {
        if (res != false) {
          colorDepartement(target, res);
        } else {
          window.alert("Ce département n'existe pas !");
        }
      });
      // colorDepartement(target, prompt);
      input.value = "";
    }
  });


});


/**
 * Recupere un departement dans la bd json
 *
 * @param {String} code
 * @return {Object} Departement
*/
async function getDepartement(code){
  const response = await fetch('./db.json');
  const data = await response.json();
  
  const departement = data.departements[code];
  
  return departement;
}

async function departementValidator(Pname) {
  for (let i = 1; i < 96; i++) {
    const dpt = await getDepartement(formatDepartement(i.toString()));
    if (formatName(dpt.nom) === Pname) {
      return dpt.numero;
    }
  }
  return false;
}


/**
 * Permet de colorier un departement sur la carte selon la proximité avec le departement cible
 *
 * @param {String} target Nom du departement cible 
 * @param {String} prompt Nom du departement à colorier
*/
function colorDepartement(target, prompt) {
  getDepartement(prompt)
  .then(promptDpt => {
    return getDepartement(target).then(targetDpt => {
      if (promptDpt.numero === targetDpt.numero) { /* Vert */
        const html = `
        <div class="dpt" id="${promptDpt.numero}">
        <img src="./img/${promptDpt.numero}.png" alt="${promptDpt.numero}" style="filter: invert(90%) sepia(65%) saturate(732%) hue-rotate(45deg) brightness(96%) contrast(115%);">
        </div>
        `;
        document.querySelector('.map').innerHTML += html;
        wait(100).then(() => {
          window.alert("c'est gagné !");
        });
      } else if (targetDpt.limitrophes.includes(promptDpt.numero)) { /* Jaune */
        const html = `
        <div class="dpt" id="${promptDpt.numero}">
        <img src="./img/${promptDpt.numero}.png" alt="${promptDpt.numero}" style="filter: invert(90%) sepia(92%) saturate(515%) hue-rotate(17deg) brightness(101%) contrast(107%);">
        </div>
        `;
        document.querySelector('.map').innerHTML += html;
      } else if (targetDpt.limitrophes2.includes(promptDpt.numero)) { /* Orange */
        const html = `
        <div class="dpt" id="${promptDpt.numero}">
        <img src="./img/${promptDpt.numero}.png" alt="${promptDpt.numero}" style="filter: invert(62%) sepia(94%) saturate(351%) hue-rotate(348deg) brightness(104%) contrast(103%);">
        </div>
        `;
          document.querySelector('.map').innerHTML += html;
        } else { /* Rouge */
          const html = `
          <div class="dpt" id="${promptDpt.numero}">
          <img src="./img/${promptDpt.numero}.png" alt="${promptDpt.numero}" style="filter: invert(38%) sepia(55%) saturate(5668%) hue-rotate(340deg) brightness(107%) contrast(102%);">
          </div>
          `;
          document.querySelector('.map').innerHTML += html;
        }
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error);
    });
}
  
  


function generateDepartement(){
  var target = (Math.floor(Math.random() * 30) + 1).toString();
  switch (target) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      target = "0" + target;
      break;
    case "20":
      if(Math.random() > 0.5){
        target = "2A";
      } else {  
        target = "2B";
      }
      break;
    default:
      break;
  }
  return target;
}


function formatDepartement(dpt){
  switch (dpt) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      dpt = "0" + dpt;
      break;
    case "20":
      if(Math.random() > 0.5){
        dpt = "2A";
      } else {  
        dpt = "2B";
      }
      break;
    default:
      break;
  }
  return dpt;
}


function formatName(str) {
  // Convertir la chaîne en minuscules
  str = str.toLowerCase();
  
  // Supprimer les accents en utilisant une expression régulière
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remplacer les traits d'union par des espaces
  str = str.replace(/-/g, ' ');

  return str;
}


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}