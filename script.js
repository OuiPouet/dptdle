const userPicks = [];
var today = new Date();
var options = { month: 'numeric', day: 'numeric', year: 'numeric' };
today = today.toLocaleDateString('fr-FR', options);
var hadAccount = true;

const target = generateDepartement();
// const target = "01"; // Ligne de test

//Gestion des cookies
if(getCookie("firstTime") == false){
  document.cookie = "firstTime="+btoa("false")+"; expires=01 jan 2030 12:00:00 UTC; path=/";
  document.querySelector('.prompt').style.transition = "filter 0s";
  document.querySelector('.map').style.transition = "filter 0s";
  document.querySelector('.help').style.visibility = "visible";
  document.querySelector('.prompt').style.filter = "blur(5px)";
  document.querySelector('.map').style.filter = "blur(5px)";
  document.querySelector('.help').style.top = "50%";
}

if(getCookie("LastGame") == false){
  var data = today;
  // data = btoa(data);
  document.cookie = "LastGame="+atob(data)+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
  document.cookie = "isWin="+btoa("false")+"; expires=01 jan 2030 12:00:00 UTC; path=/";
} else {
  var data = getCookie("LastGame");
  // data = atob(data);
  if(data != today){
    data = today;
    // data = btoa(data);
    document.cookie = "LastGame="+btoa(data)+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
    var userPicksJson = JSON.stringify(userPicks);
    userPicksJson = btoa(userPicksJson);
    document.cookie = "TodaysGame="+userPicksJson+"; expires=01 jan 2030 12:00:00 UTC; path=/";
    if(atob(getCookie("isWin")) == "true"){
      document.cookie = "isWin="+btoa("false")+"; expires=01 jan 2030 12:00:00 UTC; path=/";
    }
    console.log("pas venu aujourd'hui");
  }
}


if(getCookie("Account") == false){
  hadAccount = false;
  console.log("pas de compte");
} else {
  var data = getCookie("Account");
  data = atob(data);
  var account = JSON.parse(data);
  var accountAverage = 0;
  account.forEach(element => {
    accountAverage += element;
  });
  accountAverage = accountAverage/account.length;
  console.log(accountAverage);
  document.querySelector('#account-average').innerHTML = "Moyenne : "+accountAverage.toFixed(2)+" essais";
}
if(getCookie("TodaysGame") == false){
  var userPicksJson = JSON.stringify(userPicks);
  userPicksJson = btoa(userPicksJson);
  var midnight = new Date();
  midnight.setHours(23,59,59,999);
  midnight = midnight.toUTCString();
  document.cookie = "TodaysGame="+userPicksJson+"; expires=01 jan 2030 12:00:00 UTC; path=/";
} else {
  var data = getCookie("TodaysGame");
  data = atob(data);
  const userPicksCookie = JSON.parse(data);
  userPicksCookie.forEach(element => {
    colorDepartement(target, element);
    userPicks.push(element);
  });
  document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length+1);
}
if(getCookie("isWin") != false){
  if(atob(getCookie("isWin")) == "true"){
    document.querySelector('#win').innerHTML = "Vous avez déjà trouvé le département du jour !";
    document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Bonjour monde Departementdle !');
  

  const input = document.querySelector('#input');
  
  // Affichage du departement cible - jeu principal
  input.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      const prompt = formatName(input.value);
      if(prompt == "/surtom"){
        location.href = "https://surtom.yvelin.net/"
        return;
      }
      if(prompt == "/kebab"){
        location.href = "https://www.ubereats.com/fr/store/kebab-cafe/lgSnlT_LVXKZaotcElqzDA/6de1732f-e248-5aac-a7e9-a7a5b9a214c9/0379a62a-1156-4ddb-a09a-7e1dc45d5dfb/9eae2a3e-8471-5528-81c2-aa4a398fcec8"
        return;
      }
      departementValidator(prompt).then((res) => {
        if (res != false) { // Si le departement existe
          if (getCookie("isWin") != false){
          if(atob(getCookie("isWin")) == "true"){
            input.classList.add('invalid');
            input.value = "";
            input.placeholder = "Vous avez déjà trouvé le département du jour !";
            setTimeout(() => {
              input.classList.remove('invalid');
              input.placeholder = "Entrez un département";
            }, 700);
            return;
          }}
          if(!userPicks.includes(res)){ // Si le departement n'a pas déjà été choisi
            userPicks.push(res);
            var userPicksJson = JSON.stringify(userPicks);
            userPicksJson = btoa(userPicksJson);
            document.cookie = "TodaysGame="+userPicksJson+"; expires="+midnight+"; path=/";
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

  // Affichage de l'interface d'aide
  document.querySelector('#question').addEventListener('click', () => {
    document.querySelector('.prompt').style.transition = "filter 0s";
    document.querySelector('.map').style.transition = "filter 0s";
    document.querySelector('.help').style.visibility = "visible";
    document.querySelector('.prompt').style.filter = "blur(5px)";
    document.querySelector('.map').style.filter = "blur(5px)";
    document.querySelector('.help').style.top = "50%";
  });
  document.querySelector('#cross-help').addEventListener('click', () => {
    document.querySelector('.prompt').style.transition = "filter 0.15s";
    document.querySelector('.map').style.transition = "filter 0.1s";
    document.querySelector('.help').style.visibility = "hidden";
    document.querySelector('.prompt').style.filter = "blur(0)";
    document.querySelector('.map').style.filter = "blur(0)";
    document.querySelector('.help').style.top = "-50%";
  });

  // Affichage de l'interface de compte
  document.querySelector('#user').addEventListener('click', () => {
    document.querySelector('.prompt').style.transition = "filter 0s";
    document.querySelector('.map').style.transition = "filter 0s";
    document.querySelector('.account').style.visibility = "visible";
    document.querySelector('.prompt').style.filter = "blur(5px)";
    document.querySelector('.map').style.filter = "blur(5px)";
    document.querySelector('.account').style.top = "50%";
  });
  document.querySelector('#cross-account').addEventListener('click', () => {
    document.querySelector('.prompt').style.transition = "filter 0.15s";
    document.querySelector('.map').style.transition = "filter 0.1s";
    document.querySelector('.account').style.visibility = "hidden";
    document.querySelector('.prompt').style.filter = "blur(0)";
    document.querySelector('.map').style.filter = "blur(0)";
    document.querySelector('.account').style.top = "-50%";
  });
  
  // Fermeture de l'affichage des résultats
  document.querySelector('#cross-results').addEventListener('click', () => {
    document.querySelector('.prompt').style.transition = "filter 0.15s";
    document.querySelector('.map').style.transition = "filter 0.1s";
    document.querySelector('.results').style.visibility = "hidden";
    document.querySelector('.prompt').style.filter = "blur(0)";
    document.querySelector('.map').style.filter = "blur(0)";
    document.querySelector('.results').style.top = "-50%";

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
      document.querySelector('#dep-'+promptDpt.numero).style.fill = "#53FF38";
      const html = `
      <div class="user__inputs__content" style="border-color: #2E8743; color: #2E8743; box-shadow: #53FF38 inset 0px 0px 15px; font-size: 1.2em;">
                    <p>${promptDpt.numero} - ${promptDpt.nom}</p>
      </div>
      `;
      document.querySelector('.user__inputs').innerHTML = html + document.querySelector('.user__inputs').innerHTML;
      document.querySelector('#win').innerHTML = "Vous avez déjà trouvé le département du jour !";

      //Mise en place du texte dans le résultat
      document.querySelector('#results-text').innerHTML = "Vous avez trouvé <em><strong>" + targetDpt.nom + "</strong></em> en <em><strong>" + userPicks.length + "</strong></em> essais !";

      

      if(atob(getCookie("isWin")) == "false"){
        document.cookie = "isWin="+btoa("true")+"; expires=01 jan 2030 12:00:00 UTC; path=/";
        var cookieAccount = [];
        if(hadAccount == false){
          cookieAccount.push(userPicks.length);
        } else {
          var data = getCookie("Account");
          data = atob(data);
          cookieAccount = JSON.parse(data);
          cookieAccount.push(userPicks.length);
        }
        var accountAverage = 0;
        cookieAccount.forEach(element => {
          accountAverage += element;
        });
        accountAverage = accountAverage/cookieAccount.length;
        document.querySelector('#account-average').innerHTML = "Moyenne : "+accountAverage.toFixed(2)+" essais";
        cookieAccount = JSON.stringify(cookieAccount);
        cookieAccount = btoa(cookieAccount);
        document.cookie = "Account="+cookieAccount+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
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
                  wait(1000).then(() => {
                    document.querySelector('.prompt').style.transition = "filter 0s";
                    document.querySelector('.map').style.transition = "filter 0s";
                    document.querySelector('.results').style.visibility = "visible";
                    document.querySelector('.prompt').style.filter = "blur(5px)";
                    document.querySelector('.map').style.filter = "blur(5px)";
                    document.querySelector('.results').style.top = "50%";
                  });
                });
              });
            });
          });
        });
      }
    } else if (targetDpt.limitrophes.includes(promptDpt.numero)) { /* Jaune */
      document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length+1);
      document.querySelector('#dep-'+promptDpt.numero).style.fill = "#D3FF43";
      const html = `
      <div class="user__inputs__content" style="border-color: #aedf0e; color: #87ad0b; box-shadow: #D3FF43 inset 0px 0px 15px; font-size: 1.2em;">
      <p>${promptDpt.numero} - ${promptDpt.nom}</p>
      </div>
      `;
      document.querySelector('.user__inputs').innerHTML = html + document.querySelector('.user__inputs').innerHTML;
    } else if (targetDpt.limitrophes2.includes(promptDpt.numero)) { /* Orange */
      document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length+1);
      document.querySelector('#dep-'+promptDpt.numero).style.fill = "#FFB63E";
      const html = `
      <div class="user__inputs__content" style="border-color: #FF9348; color: #FF9348; box-shadow: #FFB63E inset 0px 0px 15px; font-size: 1.2em;">
      <p>${promptDpt.numero} - ${promptDpt.nom}</p> 
      </div>
      `;
      document.querySelector('.user__inputs').innerHTML = html + document.querySelector('.user__inputs').innerHTML;
    } else { /* Rouge */
      document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length+1);
      document.querySelector('#dep-'+promptDpt.numero).style.fill = "#FF3D3D";
      const html = `
          <div class="user__inputs__content" style="border-color: #FF3D3D; color: #7e0000; box-shadow: #FF3D3D inset 0px 0px 15px; font-size: 1.2em;">
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

function share() {
  navigator.clipboard.writeText("J'ai trouvé le département du jour en " + userPicks.length + " essais !\nhttps://ouipouet.tech/");
  alert("Copié !");
}

function getCookie(value){
  var cookies = document.cookie.split(';');
  for(var i = 0; i < cookies.length; i++){
      var cookie = cookies[i].split('=');
      if(cookie[0].trim() == value){
          return cookie[1];
      }
  }
  return false;
}