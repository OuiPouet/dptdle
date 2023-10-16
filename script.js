const userPicks = [];
var today = new Date();
var yesterday = new Date(today);
var options = { month: 'numeric', day: 'numeric', year: 'numeric' };
today = today.toLocaleDateString('fr-FR', options);
var hadAccount = true;
var gameMode = "normal";
var soundEnabled = "minecraft";
var score = 0;

var dptQuiz = Math.floor(Math.random() * 95) + 1;
dptQuiz = formatDepartement(dptQuiz.toString());

// Variables mode orientation :
// const targetOrientation = generateDepartementOrientation();
const targetOrientation = "46"; // Ligne de test
const userPicksOrientation = [];

yesterday.setDate(yesterday.getDate() - 1);
yesterday = yesterday.toLocaleDateString('fr-FR', options);


const target = generateDepartement();
// const target = "21"; // Ligne de test


//Gestion des cookies
if(getCookie("firstTime") == false){
  document.cookie = "firstTime="+btoa("1.2")+"; expires=01 jan 2030 12:00:00 UTC; path=/";
  document.querySelector('.prompt').style.transition = "filter 0s";
  document.querySelector('.map').style.transition = "filter 0s";
  document.querySelector('.help').style.visibility = "visible";
  document.querySelector('.prompt').style.filter = "blur(5px)";
  document.querySelector('.map').style.filter = "blur(5px)";
  document.querySelector('.help').style.top = "50%";
}

if(getCookie("firstTime") != btoa(1.2)){
  document.cookie = "firstTime="+btoa("1.2")+"; expires=01 jan 2030 12:00:00 UTC; path=/";
  document.cookie = "Account="+btoa("[]")+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
  document.cookie = "TodaysGame="+btoa("[]")+"; expires=01 jan 2030 12:00:00 UTC; path=/";
  document.cookie = "LastGame="+btoa(today)+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
  document.cookie = "isWin="+btoa("false")+"; expires=01 jan 2030 12:00:00 UTC; path=/";
}

if(getCookie("Streak") == false){
  document.cookie = "Streak="+btoa(0)+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
} else {
  var streak = getCookie("Streak");
  streak = atob(streak);
  }
  if(streak > 1){
    const html = `<p id="streak" class="account-data">Streak : ${streak} 🔥</p>`;
    document.querySelector('.account').innerHTML += html;
}

if(getCookie("Quiz") == false){
  document.cookie = "Quiz="+btoa(0)+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
} else {
  var quizPb = getCookie("Quiz");
  quizPb = atob(quizPb);
}
const html = `<p id="quiz-pb" class="account-data">Meilleur score au quiz : ${quizPb} </p>`;
document.querySelector('.account').innerHTML += html;




if(getCookie("LastGame") == false){
  var data = today;
  // data = btoa(data);
  document.cookie = "LastGame="+btoa(data)+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
  document.cookie = "isWin="+btoa("false")+"; expires=01 jan 2030 12:00:00 UTC; path=/";
} else {
  var data = getCookie("LastGame");
  // data = atob(data);
  if(atob(data) != today){
    if(atob(data) != yesterday){
      document.cookie = "Streak="+btoa(0)+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
    } else if(atob(data) == yesterday && atob(getCookie("isWin")) == "true"){
      var streak = getCookie("Streak");
      streak = atob(streak);
      streak = parseInt(streak);
      streak += 1;
      if(streak == 2){
        const html = `<p id="streak" class="account-data">Streak : ${streak} 🔥</p>`;
        document.querySelector('.account').innerHTML += html;
      }else if(streak > 1){
        document.querySelector('#streak').innerHTML = "Streak : "+streak+" 🔥"
      }
      document.cookie = "Streak="+btoa(streak)+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
    }


    data = today;
    // data = btoa(data);
    document.cookie = "LastGame="+btoa(data)+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
    var userPicksJson = JSON.stringify(userPicks);
    userPicksJson = btoa(userPicksJson);
    document.cookie = "TodaysGame="+userPicksJson+"; expires=01 jan 2030 12:00:00 UTC; path=/";
    if(atob(getCookie("isWin")) == "true"){
      document.cookie = "isWin="+btoa("false")+"; expires=01 jan 2030 12:00:00 UTC; path=/";
    }
  }
}

if(getCookie("Account") == false){
  hadAccount = false;
  document.cookie = "Account="+btoa("[]")+"; expires=Thu, 01 jan 2030 12:00:00 UTC; path=/";
} else {
  var data = getCookie("Account");
  data = atob(data);
  var account = JSON.parse(data);
  var accountAverage = 0;
  account.forEach(element => {
    accountAverage += element;
  });
  accountAverage = accountAverage/account.length;
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
    if(atob(getCookie("Streak"))>0){
      var displayStreak = atob(getCookie("Streak"));
      displayStreak = parseInt(displayStreak);
      displayStreak ++;
      if(displayStreak == 2){
        const html = `<p id="streak" class="account-data">Streak : ${displayStreak} 🔥</p>`;
        document.querySelector('.account').innerHTML += html;
      }else{
        document.querySelector('#streak').innerHTML = "Streak : "+displayStreak+" 🔥";
      }
    }
  }
}

if(getCookie("winCompteur") == false){
  document.cookie = "winCompteur="+btoa(0)+"; expires=01 jan 2030 12:00:00 UTC; path=/";
} else {
  var winCompteur = atob(getCookie("winCompteur"));
  document.querySelector("#win-compteur").innerHTML = "Départements du jour trouvés : "+winCompteur;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Bonjour monde Departementdle !');
  

  const input = document.querySelector('#input');
  
  // Affichage du departement cible - jeu principal
  input.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      if(soundEnabled == "minecraft"){
        var minecraft = document.createElement("audio");
        minecraft.src = "./audio/sfx/minecraft/pop/1.mp3";
        minecraft.play();
      }
      const prompt = formatName(input.value);
      if(prompt == "/surtom"){
        location.href = "https://surtom.yvelin.net/"
        return;
      }
      if(prompt == "/thon"){
        location.href = "https://thon.ouipouet.tech/"
        return;
      }
      if(prompt == "/kebab"){
        location.href = "https://www.ubereats.com/fr/store/kebab-cafe/lgSnlT_LVXKZaotcElqzDA/6de1732f-e248-5aac-a7e9-a7a5b9a214c9/0379a62a-1156-4ddb-a09a-7e1dc45d5dfb/9eae2a3e-8471-5528-81c2-aa4a398fcec8"
        return;
      }
      if(prompt == "/help"){
        document.querySelector('.prompt').style.transition = "filter 0s";
        document.querySelector('.map').style.transition = "filter 0s";
        document.querySelector('.help').style.visibility = "visible";
        document.querySelector('.prompt').style.filter = "blur(5px)";
        document.querySelector('.map').style.filter = "blur(5px)";
        document.querySelector('.help').style.top = "50%";
        return;
      }
      if(prompt == "/vendredi"){
        const today = new Date();
        if(today.getDay() == 5){
          var vendredi = document.createElement("audio");
          vendredi.src = "./audio/vendredi.mp3";
          vendredi.play();
          return;
        } else {
          if(soundEnabled == "minecraft"){
            var minecraft = document.createElement("audio");
            minecraft.src = "./audio/sfx/minecraft/damage.mp3";
            minecraft.play();
          }
          input.classList.add('invalid');
            input.value = "";
            input.placeholder = "Ce n'est pas vendredi !";
            setTimeout(() => {
              input.classList.remove('invalid');
              input.placeholder = "Entrez un département";
            }, 700);
            return;
        }
      }
      if(prompt == "/ricard"){
        location.href = "https://ricard.ouipouet.tech/";
      }
      if(prompt == "/patchnotes"){
        location.href = "https://github.com/BSCT-Tormod/dptdle#patch-notes";
      }
      if(prompt == "/sfx_minecraft"){
        soundEnabled = "minecraft";
        input.value = "";
        return;
      }      
      if(prompt == "/sfx_off"){
        soundEnabled = "off";
        input.value = "";
        return;
      }
      departementValidator(prompt).then((res) => {
        if (res != false) { // Si le departement existe
          if(gameMode == "orientation"){
            colorDepartementOrientation(targetOrientation, res);
            return;
          }
          if (getCookie("isWin") != false){
          if(atob(getCookie("isWin")) == "true"){
            if(soundEnabled == "minecraft"){
              var minecraft = document.createElement("audio");
              minecraft.src = "./audio/sfx/minecraft/damage.mp3";
              minecraft.play();
            }
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
            document.cookie = "TodaysGame="+userPicksJson+"; expires=01 jan 2030 12:00:00 UTC; path=/";
            colorDepartement(target, res);
            input.classList.add('valid');
            setTimeout(() => {
              input.classList.remove('valid');
            }, 500);
          } else { // Si le departement a déjà été choisi
            if(soundEnabled == "minecraft"){
              var minecraft = document.createElement("audio");
              minecraft.src = "./audio/sfx/minecraft/damage.mp3";
              minecraft.play();
            }
            input.classList.add('invalid');
            input.placeholder = "Département déjà choisi";
            setTimeout(() => {
              input.classList.remove('invalid');
              input.placeholder = "Entrez un département";
            }, 700);
          }
          input.value = "";
        } else { // Si le departement n'existe pas
          if(soundEnabled == "minecraft"){
            var minecraft = document.createElement("audio");
            minecraft.src = "./audio/sfx/minecraft/damage.mp3";
            minecraft.play();
          }
          input.classList.add('shake');
          setTimeout(() => {
            input.classList.remove('shake');
          }, 700);
        }
      });
    } else if (event.key === "Backspace") {
     if (soundEnabled == "minecraft") {
      if(document.querySelector("#input").value == ""){
        var minecraft = document.createElement("audio");
        minecraft.src = "./audio/sfx/minecraft/damage.mp3";
      } else {
        if(soundEnabled == "minecraft"){
          var minecraft = document.createElement("audio");
          minecraft.src = "./audio/sfx/minecraft/hit.mp3";
          minecraft.play();
        }
      }
    }
    } else if (event.key === "Escape") {
      if(soundEnabled == "minecraft"){
        var minecraft = document.createElement("audio");
        minecraft.src = "./audio/sfx/minecraft/damage.mp3";
        minecraft.play();
      }
    } else if (event.key === " ") {
      if(soundEnabled == "minecraft"){
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        var minecraft = document.createElement("audio");
        minecraft.src = "./audio/sfx/minecraft/pop/"+randomNumber+".mp3";
        minecraft.play();
      }
    } else if (event.key === "/" || event.key === "Shift") {
      if(soundEnabled == "minecraft"){
        var minecraft = document.createElement("audio");
        minecraft.src = "./audio/sfx/minecraft/villager.mp3";
        minecraft.play();
      }
    }else {
      if(soundEnabled == "minecraft"){
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        var minecraft = document.createElement("audio");
        minecraft.src = "./audio/sfx/minecraft/mine/"+randomNumber+".mp3";
        minecraft.play();
      }
    }
  });

  // Affichage de l'interface d'aide
  document.querySelector('#question').addEventListener('click', () => {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/menu.mp3";
      minecraft.play();
    }
    document.querySelector('.prompt').style.transition = "filter 0s";
    document.querySelector('.map').style.transition = "filter 0s";
    document.querySelector('.help').style.visibility = "visible";
    document.querySelector('.prompt').style.filter = "blur(5px)";
    document.querySelector('.map').style.filter = "blur(5px)";
    document.querySelector('.help').style.top = "50%";
  });
  document.querySelector('#cross-help').addEventListener('click', () => {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/menu.mp3";
      minecraft.play();
    }
    document.querySelector('.prompt').style.transition = "filter 0.15s";
    document.querySelector('.map').style.transition = "filter 0.1s";
    document.querySelector('.help').style.visibility = "hidden";
    document.querySelector('.prompt').style.filter = "blur(0)";
    document.querySelector('.map').style.filter = "blur(0)";
    document.querySelector('.help').style.top = "-50%";
  });

  // Affichage de l'interface de compte
  document.querySelector('#user').addEventListener('click', () => {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/menu.mp3";
      minecraft.play();
    }
    document.querySelector('.prompt').style.transition = "filter 0s";
    document.querySelector('.map').style.transition = "filter 0s";
    document.querySelector('.account').style.visibility = "visible";
    document.querySelector('.prompt').style.filter = "blur(5px)";
    document.querySelector('.map').style.filter = "blur(5px)";
    document.querySelector('.account').style.top = "50%";
  });
  document.querySelector('#cross-account').addEventListener('click', () => {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/menu.mp3";
      minecraft.play();
    }
    document.querySelector('.prompt').style.transition = "filter 0.15s";
    document.querySelector('.map').style.transition = "filter 0.1s";
    document.querySelector('.account').style.visibility = "hidden";
    document.querySelector('.prompt').style.filter = "blur(0)";
    document.querySelector('.map').style.filter = "blur(0)";
    document.querySelector('.account').style.top = "-50%";
  });

  // Affichage de l'interface d'aide
  document.querySelector('#cmd').addEventListener('click', () => {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/menu.mp3";
      minecraft.play();
    }
    document.querySelector('.prompt').style.transition = "filter 0s";
    document.querySelector('.map').style.transition = "filter 0s";
    document.querySelector('.cmd-list').style.visibility = "visible";
    document.querySelector('.prompt').style.filter = "blur(5px)";
    document.querySelector('.map').style.filter = "blur(5px)";
    document.querySelector('.cmd-list').style.top = "50%";
  });
  document.querySelector('#cross-cmd-list').addEventListener('click', () => {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/menu.mp3";
      minecraft.play();
    }
    document.querySelector('.prompt').style.transition = "filter 0.15s";
    document.querySelector('.map').style.transition = "filter 0.1s";
    document.querySelector('.cmd-list').style.visibility = "hidden";
    document.querySelector('.prompt').style.filter = "blur(0)";
    document.querySelector('.map').style.filter = "blur(0)";
    document.querySelector('.cmd-list').style.top = "-50%";
  });
  
  // Fermeture de l'affichage des résultats
  document.querySelector('#cross-results').addEventListener('click', () => {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/menu.mp3";
      minecraft.play();
    }
    document.querySelector('.prompt').style.transition = "filter 0.15s";
    document.querySelector('.map').style.transition = "filter 0.1s";
    document.querySelector('.results').style.visibility = "hidden";
    document.querySelector('.prompt').style.filter = "blur(0)";
    document.querySelector('.map').style.filter = "blur(0)";
    document.querySelector('.results').style.top = "-50%";
  });


  // Affichage du quiz
  document.querySelector('#quiz').addEventListener('click', () => {    
    if(!document.querySelector('#quiz').classList.contains('pointer')){
      return;
    }
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/menu.mp3";
      minecraft.play();
    }
    document.querySelector('.prompt').style.transition = "filter 0s";
    document.querySelector('.map').style.transition = "filter 0s";
    document.querySelector('.quiz').style.visibility = "visible";
    document.querySelector('.prompt').style.filter = "blur(5px)";
    document.querySelector('.map').style.filter = "blur(5px)";
    document.querySelector('.quiz').style.top = "50%";
    mainQuiz();
  });
  // Fermeture de l'affichage du quiz
  document.querySelector('#cross-quiz').addEventListener('click', () => {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/menu.mp3";
      minecraft.play();
    }
    document.querySelector('.prompt').style.transition = "filter 0.15s";
    document.querySelector('.map').style.transition = "filter 0.1s";
    document.querySelector('.quiz').style.visibility = "hidden";
    document.querySelector('.prompt').style.filter = "blur(0)";
    document.querySelector('.map').style.filter = "blur(0)";
    document.querySelector('.quiz').style.top = "-50%";
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

/**
 * Verifie si le departement existe
 *
 * @param {String} name Nom du departement
 * @return {String, Boolean} Numéro du département ou faux si le dpt n'existe pas 
 */
async function departementValidator(name) {
  for (let i = 1; i < 96; i++) {
    if(i == 20){
      let dpt = await getDepartement("2A");
      if (formatName(dpt.nom) === name) {
        return dpt.numero;
      }
      dpt = await getDepartement("2B");
      if (formatName(dpt.nom) === name) {
        return dpt.numero;
      }
      continue;
    }
    const dpt = await getDepartement(formatDepartement(i.toString()));
    if (formatName(dpt.nom) === name) {
      return dpt.numero;
    }
  }
  return false;
}



/**
* Permet de colorier un departement sur la carte selon la proximité avec le departement cible
* Sinon, il est colorié en rouge
*
* @param {String} target Nom du departement cible 
* @param {String} prompt Nom du departement à colorier
*/
function colorDepartement(target, prompt) {
  getDepartement(prompt).then(promptDpt => {
    return getDepartement(target).then(targetDpt => {
      getDistance(prompt, target).then(distance => {
        getOrientation(prompt, target);
        if (distance == 0) { /* Vert */
        if(soundEnabled == "minecraft"){
          var minecraft = document.createElement("audio");
          minecraft.src = "./audio/sfx/minecraft/xp.mp3";
          minecraft.play();
        }

        document.querySelector('#quiz path').style.fill = "#1C274C";
        document.querySelector('#quiz').classList.add('pointer');

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
          if(atob(getCookie("Streak"))>0){
            var displayStreak = atob(getCookie("Streak"));
            displayStreak = parseInt(displayStreak);
            displayStreak ++;
            if(displayStreak == 2){
              const html = `<p id="streak" class="account-data">Streak : ${displayStreak} 🔥</p>`;
              document.querySelector('.account').innerHTML += html;
            }else{
              document.querySelector('#streak').innerHTML = "Streak : "+displayStreak+" 🔥";
            }
          }

          if(getCookie("winCompteur") != false){
            var winNb = atob(getCookie("winCompteur"));
            winNb ++;
            document.cookie = "winCompteur="+btoa(winNb)+"; expires=01 jan 2030 12:00:00 UTC; path=/";
            document.querySelector("#win-compteur").innerHTML = "Départements du jour trouvés : "+winNb;
          }

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
    } else if (distance < 150) { /* Vert clair */
    if(getCookie("isWin") != false){
      if(atob(getCookie("isWin")) == "true"){
        document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length);
      } else {
        document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length+1);
      }
    } else {
      document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length+1);
    }
      document.querySelector('#dep-'+promptDpt.numero).style.fill = "#D3FF43";
      const html = `
      <div class="user__inputs__content" style="border-color: #aedf0e; color: #87ad0b; box-shadow: #D3FF43 inset 0px 0px 15px; font-size: 1.2em;">
      <p>${promptDpt.numero} - ${promptDpt.nom}</p>
      </div>
      `;
      document.querySelector('.user__inputs').innerHTML = html + document.querySelector('.user__inputs').innerHTML;
    } else if (distance < 300) { /* Orange */
    if(getCookie("isWin") != false){
      if(atob(getCookie("isWin")) == "true"){
        document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length);
      } else {
        document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length+1);
      }
    } else {
      document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length+1);
    }
    document.querySelector('#dep-'+promptDpt.numero).style.fill = "#FFB63E";
    const html = `
    <div class="user__inputs__content" style="border-color: #FF9348; color: #FF9348; box-shadow: #FFB63E inset 0px 0px 15px; font-size: 1.2em;">
    <p>${promptDpt.numero} - ${promptDpt.nom}</p> 
    </div>
    `;
    document.querySelector('.user__inputs').innerHTML = html + document.querySelector('.user__inputs').innerHTML;
  } else { /* Rouge */
  if(getCookie("isWin") != false){
    if(atob(getCookie("isWin")) == "true"){
      document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length);
    } else {
      document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length+1);
    }
  } else {
    document.querySelector('#compteur').innerHTML = "Essai n°"+(userPicks.length+1);
  }
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
});
}
  
function colorDepartementOrientation(targetOrientation, prompt) {
  getDepartement(prompt).then(promptDpt => {
    return getDepartement(targetOrientation).then(targetDpt => {
      getDistance(prompt, targetOrientation).then(distance => {
        getOrientation(prompt, targetOrientation).then(location => {
          console.log("Orientation cible : "+location);
          console.log("Distance cible : "+distance);
          if (distance == 0) { /* Vert */
            if(soundEnabled == "minecraft"){
              var minecraft = document.createElement("audio");
              minecraft.src = "./audio/sfx/minecraft/xp.mp3";
              minecraft.play();
            }
            document.querySelector('#dep-'+promptDpt.numero).style.fill = "#53FF38";
          } else {
            document.querySelector('#dep-'+promptDpt.numero).style.fill = "#FF3D3D";
            const html = `
            <div class="user__inputs__content" style="border-color: #FF3D3D; color: #7e0000; box-shadow: #FF3D3D inset 0px 0px 15px; font-size: 1.2em;">
            <p>${promptDpt.numero} - ${promptDpt.nom} ||</p><img src="./img/gps.svg" alt="gps" class="gps" style="transform: rotate(${location}deg);">
            </div>
            `;
            document.querySelector('.user__inputs').innerHTML = html + document.querySelector('.user__inputs').innerHTML;
            const input = document.querySelector('#input');
            input.value = "";
          }
        });
      });
    });
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
      if(document.querySelector("#input").value == formatName("Corse-Du-Sud")){
        dpt = "2A";
      } else if(document.querySelector("#input").value == formatName("Haute-Corse")) {
        dpt = "2B";
      }
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
  ) * Math.sin(dayOfMonth) * Math.cos(month) * Math.tan(year)*1000%95; // Nombre entre 1 et 38 a modifier selon les departements finis dans la bd
  
  result = Math.abs(result); // Valeur absolue
  result = Math.round(result); // Arrondi
  if(result == 20){
    if(Math.random()>0.5){
      result = "2A";
    } else {
      result = "2B";
    }
    return result;
  }
  result = result.toString();   
  result = formatDepartement(result);


  return result;
}

/**
 * Permet de générer un nombre complexe à partir de la date actuelle pour le mode orientation.
 *
 * @return {Number} Nombre complexe généré
 */
function generateDepartementOrientation() {
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
    ((dayOfMonth * 12 + month * 41 + year * 6) % 38) + 1 
  ) * Math.tan(dayOfMonth) * Math.sin(month) * Math.cos(year)*1000%95; // Nombre entre 1 et 38 a modifier selon les departements finis dans la bd
  
  result = Math.abs(result); // Valeur absolue
  result = Math.round(result); // Arrondi
  if(result == 20){
    if(Math.random()>0.5){
      result = "2A";
    } else {
      result = "2B";
    }
    return result;
  }
  result = result.toString();   
  result = formatDepartement(result);


  return result;
}

/**
 * Cette fonction permet de calculer la distance entre deux points
 *
 * @param {String} dpt1 Premier departement
 * @param {String} dpt2 Second departement
 * @return {Number} 
 */
async function getDistance(dpt1, dpt2){
  dpt1 = await getDepartement(dpt1);
  dpt2 = await getDepartement(dpt2);

  const distance = Math.sqrt(Math.pow(dpt1.pos[0]-dpt2.pos[0], 2) + Math.pow(dpt1.pos[1]-dpt2.pos[1], 2));
  return distance;
}


/**
 * Permet de récupérer l'angle de rotation à appliquer à une flèche par rapport à une autre.
 *
 * @param {String} dpt1 Département donné
 * @param {String} dpt2 Département cible
 * @return {Number} Angle de rotation en degrés à appliquer à une flèche.
 */
async function getOrientation(dpt1, dpt2) {
  dpt1 = await getDepartement(dpt1);
  dpt2 = await getDepartement(dpt2);

  // Calcul de la différence de latitude et de longitude entre les départements
  var latDiff = dpt2.pos[0] - dpt1.pos[0];
  var lonDiff = dpt2.pos[1] - dpt1.pos[1];

  // Inverser la logique de l'axe X
  lonDiff = -lonDiff;

  // Calcul de l'angle entre les départements en radians
  var angle = Math.atan2(latDiff, lonDiff);

  // Convertir l'angle en degrés
  var rotation = (angle * 180) / Math.PI;

  return rotation;
}



/**
 * Cette fonction permet de gérer le quiz
 *
 */
function mainQuiz(){
  getDepartement(dptQuiz).then(dpt => {
    document.querySelector('#quiz-score').innerHTML = "Score : <strong>" + score+"</strong>";
    document.querySelector('#quiz-best-score').innerHTML = "Meilleur score : <strong>" + atob(getCookie("Quiz"))+"</strong>";
    if(dpt.pronom == "le"){
      document.querySelector('#quiz-question').innerHTML = "Quel est le numéro du <em><strong>"+dpt.nom+"</strong></em> ?";
    } else if (dpt.pronom == "l'"){
      document.querySelector('#quiz-question').innerHTML = "Quel est le numéro de l'<em><strong>"+dpt.nom+"</strong></em> ?";
    } else if (dpt.pronom == "la"){
      document.querySelector('#quiz-question').innerHTML = "Quel est le numéro de la <em><strong>"+dpt.nom+"</strong></em> ?";
    } else {
      document.querySelector('#quiz-question').innerHTML = "Quel est le numéro des <em><strong>"+dpt.nom+"</strong></em> ?";
    }
  });
}

function displayCashAnswer(){
  if(soundEnabled == "minecraft"){
    var minecraft = document.createElement("audio");
    minecraft.src = "./audio/sfx/minecraft/menu.mp3";
    minecraft.play();
  }
  document.querySelector('.answer-cash').style.display = "flex";
  document.querySelector('.answer-options').style.display = "none";
  document.querySelector('#answer-cash-prompt').value = "";
  document.querySelector('#answer-cash-prompt').focus();
}

function displayButtonAnswer(mode) {
  if(soundEnabled == "minecraft"){
    var minecraft = document.createElement("audio");
    minecraft.src = "./audio/sfx/minecraft/menu.mp3";
    minecraft.play();
  }
  
  const values = [parseInt(dptQuiz)];
  
  if(mode == "carre"){
    document.querySelector('.answer-carre').style.display = 'flex';
    document.querySelector('.answer-options').style.display = 'none';
  while (values.length < 4) {
    const randomValue = Math.floor(Math.random() * 16) + (dptQuiz - 5);

    if (randomValue > 0 && !values.includes(randomValue) && randomValue < 96) {
      values.push(randomValue);
    }
  }

  shuffleArray(values);

  document.querySelector('#answer-a').innerHTML = formatDepartement(values[0]);
  document.querySelector('#answer-b').innerHTML = formatDepartement(values[1]);
  document.querySelector('#answer-c').innerHTML = formatDepartement(values[2]);
  document.querySelector('#answer-d').innerHTML = formatDepartement(values[3]);

  document.querySelector('#answer-a').value = values[0];
  document.querySelector('#answer-b').value = values[1];
  document.querySelector('#answer-c').value = values[2];
  document.querySelector('#answer-d').value = values[3];

  } else if (mode == "50-50") {
    document.querySelector('.answer-50-50').style.display = "flex";
    document.querySelector('.answer-options').style.display = "none";
    while (values.length < 2) {
      const randomValue = Math.floor(Math.random() * 16) + (dptQuiz - 5);
  
      if (randomValue > 0 && !values.includes(randomValue) && randomValue < 96) {
        values.push(randomValue);
      }
    }
  
    shuffleArray(values);
  
    document.querySelector('#answer-1').innerHTML = formatDepartement(values[0]);
    document.querySelector('#answer-2').innerHTML = formatDepartement(values[1]);
  
    document.querySelector('#answer-1').value = values[0];
    document.querySelector('#answer-2').value = values[1];
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function answerCash(){
  const input = document.querySelector('#answer-cash-prompt').value;
  if(input == ""){
    return;
  }
  if(input == dptQuiz){
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/xp.mp3";
      minecraft.play();
    }
    score += 5;
    document.querySelector('#answer-cash-button').classList.add('correct-answer');
    document.querySelector('#answer-cash-button').innerHTML = "Correct";
    await wait(500);
    document.querySelector('#quiz-score').innerHTML = "Score : <strong>" + score+"</strong>";
    document.querySelector('.answer-cash').style.display = "none";
    document.querySelector('.answer-options').style.display = "flex";
    document.querySelector('#answer-cash-prompt').value = "";
    document.querySelector('#answer-cash-button').classList.remove('correct-answer');
    document.querySelector('#answer-cash-button').innerHTML = "Valider";
    if(score > atob(getCookie("Quiz"))){
      document.cookie = "Quiz="+btoa(score)+"; expires=01 jan 2030 12:00:00 UTC; path=/";
      document.querySelector('#quiz-best-score').innerHTML = "Meilleur score : <strong>" + score+"</strong>";
    }
  } else {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/damage.mp3";
      minecraft.play();
    }
    score = 0;
    document.querySelector('#answer-cash-button').classList.add('wrong-answer');
    document.querySelector('#answer-cash-button').innerHTML = "Faux";
    await wait(500);
    document.querySelector('#quiz-score').innerHTML = "Score : <strong>" + score+"</strong>";
    document.querySelector('.answer-cash').style.display = "none";
    document.querySelector('.answer-options').style.display = "flex";
    document.querySelector('#answer-cash-prompt').value = "";
    document.querySelector('#answer-cash-button').classList.remove('wrong-answer');
    document.querySelector('#answer-cash-button').innerHTML = "Valider";
  }
  dptQuiz = Math.floor(Math.random() * 95) + 1;
  dptQuiz = formatDepartement(dptQuiz.toString());
  mainQuiz();
}

async function answerButton(button){
  const carre = ["a", "b", "c", "d"];
  const input = document.querySelector('#answer-'+button);
  carre.forEach(option => {
    document.querySelector('#answer-'+option).classList.add('unselected-answer');
  });
  document.querySelector('#answer-1').classList.add('unselected-answer');
  document.querySelector('#answer-2').classList.add('unselected-answer');
  if(input.value == dptQuiz){
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/xp.mp3";
      minecraft.play();
    }
    if(carre.includes(button)){
      score += 3;
      document.querySelector('#answer-'+button).classList.remove('unselected-answer');
      document.querySelector('#answer-'+button).classList.add('correct-answer');
      await wait(500);
      document.querySelector('#answer-'+button).classList.remove('correct-answer');
      document.querySelector('#answer-'+button).classList.add('unselected-answer');
    } else {
      score += 1;
      document.querySelector('#answer-'+button).classList.remove('unselected-answer');
      document.querySelector('#answer-'+button).classList.add('correct-answer');
      await wait(500);
      document.querySelector('#answer-'+button).classList.remove('correct-answer');
      document.querySelector('#answer-'+button).classList.add('unselected-answer');
    }
    document.querySelector('#quiz-score').innerHTML = "Score : <strong>" + score+"</strong>";
    input.parentNode.style.display = "none";
    document.querySelector('.answer-options').style.display = "flex";
    if(score > atob(getCookie("Quiz"))){
      document.cookie = "Quiz="+btoa(score)+"; expires=01 jan 2030 12:00:00 UTC; path=/";
      document.querySelector('#quiz-best-score').innerHTML = "Meilleur score : <strong>" + score+"</strong>";
    }
  } else {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/damage.mp3";
      minecraft.play();
    }
    document.querySelector('#answer-'+button).classList.remove('unselected-answer');
    document.querySelector('#answer-'+button).classList.add('wrong-answer');
    await wait(500);
    document.querySelector('#answer-'+button).classList.remove('wrong-answer');
    document.querySelector('#answer-'+button).classList.add('unselected-answer');
    score = 0;
    document.querySelector('#quiz-score').innerHTML = "Score : <strong>" + score+"</strong>";
    input.parentNode.style.display = "none";
    document.querySelector('.answer-options').style.display = "flex";
  }
  carre.forEach(option => {
    document.querySelector('#answer-'+option).classList.remove('unselected-answer');
  });
  document.querySelector('#answer-1').classList.remove('unselected-answer');
  document.querySelector('#answer-2').classList.remove('unselected-answer');
  dptQuiz = Math.floor(Math.random() * 95) + 1;
  dptQuiz = formatDepartement(dptQuiz.toString());
  mainQuiz();
}

document.querySelector('#answer-cash-prompt').addEventListener('keyup', (e) => {
  if(e.key === "Enter"){
    if(soundEnabled == "minecraft"){
      const randomNumber = Math.floor(Math.random() * 2) + 1;
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/pop/"+randomNumber+".mp3"; 
      minecraft.play();     
    }
    answerCash();
  } else if (e.key === " "){
    if(soundEnabled == "minecraft"){
      const randomNumber = Math.floor(Math.random() * 2) + 1;
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/pop/"+randomNumber+".mp3"; 
      minecraft.play();     
    }
  } else if (e.key === "Backspace"){
    if (soundEnabled == "minecraft") {
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/damage.mp3";
    }
  } else if (event.key === "Escape") {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/damage.mp3";
      minecraft.play();
    }
  } else if (event.key === "/" || event.key === "Shift") {
    if(soundEnabled == "minecraft"){
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/villager.mp3";
      minecraft.play();
    }
  }else {
    if(soundEnabled == "minecraft"){
      const randomNumber = Math.floor(Math.random() * 2) + 1;
      var minecraft = document.createElement("audio");
      minecraft.src = "./audio/sfx/minecraft/mine/"+randomNumber+".mp3";
      minecraft.play();
    }
  }
});

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

/**
 * Cette fonction permet de copier le résultat dans le presse papier.
 *
 */
function share() {
  navigator.clipboard.writeText("J'ai trouvé le département du jour en " + userPicks.length + " essais !\nhttps://ouipouet.tech/");

  alert("Copié !");
}

/**
 * Permet de récupérer le contenu d'un cookie. Celui ci peut etre chiffré et doit etre déchifré si besoin.
 *
 * @param {String} value Nom du cookie a retourner
 * @return {*} Contenu du cookie, false si le cookie n'existe pas.
 */
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