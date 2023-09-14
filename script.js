document.addEventListener('DOMContentLoaded', () => {
  console.log('Bonjour monde Departementdle !');
  const target = generateDepartement();
  // const target = "01"; // Ligne de test
  const input = document.querySelector('#input');
  const userPicks = [];
  
  input.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      const prompt = formatName(input.value);
      departementValidator(prompt).then((res) => {
        if (res != false) { // Si le departement existe 
          if(!userPicks.includes(res)){ // Si le departement n'a pas déjà été choisi
            userPicks.push(res);
            document.querySelector('#compteur').innerHTML = "Essai n°"+userPicks.length;
            colorDepartement(target, res);
            input.classList.add('valid');
            setTimeout(() => {
              input.classList.remove('valid');
            }, 500);
          } else { // Si le departement a déjà été choisi
            input.classList.add('invalid');
            input.placeholder = "Département déjà choisi";
            setTimeout(() => {
              input.classList.remove('invalid');
              input.placeholder = "Entrez un département";
            }, 700);
          }
          input.value = "";
        } else { // Si le departement n'existe pas
          input.classList.add('shake');
          setTimeout(() => {
            input.classList.remove('shake');
          }, 700);
        }
      });
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
* Si le departement est le departement cible, il est colorié en vert et des confettis sont lancés
* Si le departement est limitrophe, il est colorié en jaune
* Si le departement est limitrophe d'un departement limitrophe, il est colorié en orange
* Sinon, il est colorié en rouge
*
* @param {String} target Nom du departement cible 
* @param {String} prompt Nom du departement à colorier
*/
function colorDepartement(target, prompt) {
  getDepartement(prompt)
  .then(promptDpt => {
    return getDepartement(target).then(targetDpt => {
      if (promptDpt.numero === targetDpt.numero) { /* Vert */
      var html = `
      <div class="dpt" id="${promptDpt.numero}">
      <img src="./img/${promptDpt.numero}.png" alt="${promptDpt.numero}" style="filter: invert(90%) sepia(65%) saturate(732%) hue-rotate(45deg) brightness(96%) contrast(115%);">
      </div>
      `;
      document.querySelector('.map').innerHTML += html;
      html = `
      <div class="user__inputs__content" style="border-color: #2E8743; color: #2E8743; box-shadow: #53FF38 inset 0px 0px 15px;">
                    <p>${promptDpt.numero} - ${promptDpt.nom}</p>
      </div>
      `;
      document.querySelector('.user__inputs').innerHTML = html + document.querySelector('.user__inputs').innerHTML;
      wait(100).then(() => {
        conffetiLaunch();
        wait(500).then(() => {
          conffetiLaunch();
          wait(300).then(() => {
            conffetiLaunch();
            wait(200).then(() => {
              conffetiLaunch();
              wait(400).then(() => {
                conffetiLaunch();
              });
            });
          });
        });
      });
    } else if (targetDpt.limitrophes.includes(promptDpt.numero)) { /* Jaune */
    var html = `
        <div class="dpt" id="${promptDpt.numero}">
        <img src="./img/${promptDpt.numero}.png" alt="${promptDpt.numero}" style="filter: invert(90%) sepia(92%) saturate(515%) hue-rotate(17deg) brightness(101%) contrast(107%);">
        </div>
        `;
        document.querySelector('.map').innerHTML += html;
        html = `
        <div class="user__inputs__content" style="border-color: #aedf0e; color: #87ad0b; box-shadow: #D3FF43 inset 0px 0px 15px;">
                      <p>${promptDpt.numero} - ${promptDpt.nom}</p>
        </div>
        `;
        document.querySelector('.user__inputs').innerHTML = html + document.querySelector('.user__inputs').innerHTML;
      } else if (targetDpt.limitrophes2.includes(promptDpt.numero)) { /* Orange */
        var html = `
        <div class="dpt" id="${promptDpt.numero}">
        <img src="./img/${promptDpt.numero}.png" alt="${promptDpt.numero}" style="filter: invert(62%) sepia(94%) saturate(351%) hue-rotate(348deg) brightness(104%) contrast(103%);">
        </div>
        `;
        document.querySelector('.map').innerHTML += html;
        html = `
        <div class="user__inputs__content" style="border-color: #FF9348; color: #FF9348; box-shadow: #FFB63E inset 0px 0px 15px;">
        <p>${promptDpt.numero} - ${promptDpt.nom}</p> 
        </div>
        `;
        document.querySelector('.user__inputs').innerHTML = html + document.querySelector('.user__inputs').innerHTML;
        } else { /* Rouge */
          var html = `
          <div class="dpt" id="${promptDpt.numero}">
          <img src="./img/${promptDpt.numero}.png" alt="${promptDpt.numero}" style="filter: invert(38%) sepia(55%) saturate(5668%) hue-rotate(340deg) brightness(107%) contrast(102%);">
          </div>
          `;
          document.querySelector('.map').innerHTML += html;
          html = `
          <div class="user__inputs__content" style="border-color: #FF3D3D; color: #7e0000; box-shadow: #FF3D3D inset 0px 0px 15px;">
          <p>${promptDpt.numero} - ${promptDpt.nom}</p> 
          </div>
          `;
          document.querySelector('.user__inputs').innerHTML = html + document.querySelector('.user__inputs').innerHTML;
        }
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error);
    });
}
  
  

/**
 * Formate un code de departement
 *
 * @param {*} dpt Code du departement
 * @return {String} Code du departement formaté
 */
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
      dpt = "2A";
      break;
    case "38":
      dpt = "2B";
      break;
    default:
      break;
  }
  return dpt;
}

/**
 * Formate les noms de departements en minuscules et sans accents et remplace les traits d'union par des espaces
 * @param {String} str Chaîne à formater
 * @returns {String} Chaîne formatée
 */
function formatName(str) {
  // Convertir la chaîne en minuscules
  str = str.toLowerCase();
  
  // Supprimer les accents en utilisant une expression régulière
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remplacer les traits d'union par des espaces
  str = str.replace(/-/g, ' ');

  return str;
}

/**
 * Permet de générer un nombre complexe à partir de la date actuelle
 *
 * @return {Number} Nombre complexe généré
 */
function generateDepartement() {
  const today = new Date();
  const dayOfMonth = today.getDate();
  const month = today.getMonth() + 1; // Mois actuel (1-12)
  const year = today.getFullYear();

  // const today = new Date(2023, 9, 14); // Date de test
  // const dayOfMonth = 4; // Jour fixe
  // const month = 9; // Mois fixe (octobre)
  // const year = 2023; // Année fixe

  // Formule mathématique complexe
  var result = (
    ((dayOfMonth * 4 + month * 7 + year * 13) % 38) + 1 
  ) * Math.sin(dayOfMonth) * Math.cos(month) * Math.tan(year)*1000%38; // Nombre entre 1 et 38 a modifier selon les departements finis dans la bd
  
  result = Math.abs(result); // Valeur absolue
  result = Math.round(result); // Arrondi
  result = result.toString();   
  result = formatDepartement(result);


  return result;
}



/**
 * Permet d'attendre un certain temps
 * @param {*} ms Durée a attendre en millisecondes
 * @returns 
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Permet de lancer des confettis sur la page
 * Utilise la librairie confetti.js
 */
function conffetiLaunch(){
  var myCanvas = document.createElement('canvas');
        document.body.appendChild(myCanvas);
        var myConfetti = confetti.create(myCanvas, { resize: true });
              
        // Configurez les options de confetti
        var confettiOptions = {
          particleCount: 400,
          startVelocity: 30,
          spread: 360,
          scalar: 0.6,
          origin: {
            x: Math.random(),
            // since they fall down, start a bit higher than random
            y: Math.random() - 0.2
          }
        };
        
        // Utilisez la promesse de confetti
        myConfetti(confettiOptions).then(() => {
          // Supprimez le canvas une fois que la promesse est résolue
          myCanvas.remove();
        }).catch((err) => {
          console.error(err);
        });
}