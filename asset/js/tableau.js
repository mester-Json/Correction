
const personnes = [
  {
    id: 1,
    user: "STEEVE",
    correction: 0,
  },
  {
    id: 2,
    user: "LINA",
    correction: 0,
  },
  {
    id: 3,
    user: "AYMERICK",
    correction: 0,
  },
  {
    id: 4,
    user: "NELSON",
    correction: 0,
  },
  {
    id: 5,
    user: "MARIUS",
    correction: 0,
  },
  {
    id: 6,
    user: "LUCAS",
    correction: 0,
  },
  {
    id: 7,
    user: "HAFTOM",
    correction: 0,
  },
  {
    id: 8,
    user: "NADIR",
    correction: 0,
  },
  {
    id: 9,
    user: "MOHAMED",
    correction: 0,
  },
  {
    id: 10,
    user: "NICOLAS",
    correction: 0,
  },
  {
    id: 11,
    user: "AURELIEN",
    correction: 0,
  },
  {
    id: 12,
    user: "JAYSON",
    correction: 0,
  },
  {
    id: 13,
    user: "MALIKA",
    correction: 0,
  },
  {
    id: 14,
    user: "DELPHINE",
    correction: 0,
  },
  {
    id: 15,
    user: "AMJAD",
    correction: 0,
  },
]

const personnesChoisies = [];
function choisirPersonne() {
  document.getElementById('result');

  const personnesDisponibles = personnes.filter(personne => !personne.correction);
  if (personnesDisponibles.length === 0) {
    document.getElementById('result').innerText = "Bah alors, on a déjà tous corrigé ?";
    const audio = new Audio("./asset/audio/musique-triste.mp3");
    audio.play();
    return;
  }

  const indexPersonne = Math.floor(Math.random() * personnesDisponibles.length);
  const personneChoisie = personnesDisponibles[indexPersonne];

  personneChoisie.correction = true;
  incrementerCorrection(personneChoisie.id);
  personnesChoisies.push(personneChoisie);

  document.getElementById('result').innerText = "Personne choisie: " + personneChoisie.user;
  document.getElementById('result').style.fontFamily = "Arial";
  document.getElementById('result').style.textAlign = "center";
  document.getElementById('result').style.visibility = "visible";

  setTimeout(function () {
    const audio = new Audio("./asset/audio/oh-non-pas-ca.mp3");
    audio.play();
  }, 1500);
  return;
}

function reinitialiser() {
  personnes.forEach(personne => personne.correction = true);
  personnesChoisies.length = 0;
  document.getElementById('result').innerText = '';
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function reinitialiser() {
  personnes.forEach(personne => personne.correction = false);
  personnesChoisies.length = 0;
  document.getElementById('result')();
}

function resetPersonne() {
  document.getElementById('reset')
  window.location.reload();
}


function incrementerCorrection(id) {
  const utilisateur = personnes.find(user => user.id === id);

  if (utilisateur) {
    if (utilisateur.correction === false) {
      utilisateur.correction = 0;
    }
    else {
      utilisateur.correction++;
      $.ajax({
        url: 'https://mester-json.github.io/Correction/asset/bdd/user.php',
        type: 'POST',
        data: {
          id: utilisateur.id,
          correction: utilisateur.correction
        },

      });
    }
  }
}

function fetchData() {
  $.ajax({
    url: 'https://mester-json.github.io/Correction/asset/bdd/aff.php',
    type: 'GET',
    success: function (data) {
      const div = document.getElementById('user');

      div.innerText = data;
      div.style.color = "white";
      div.style.fontSize = "17px";
      div.style.fontFamily = "Arial";
      div.style.textAlign = "center";
      div.style.marginTop = "10px";
      div.style.marginBottom = "10px";
      div.style.marginLeft = "auto";
      div.style.marginRight = "auto";
      div.style.width = "50%";
      div.style.padding = "10px";
      div.style.border = "2px solid black";
      div.style.borderRadius = "25px";
      div.style.backgroundColor = "black";


    },
    error: function (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  });
}

setInterval(fetchData, 10);
