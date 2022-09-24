const savebutton = document.getElementById("savebtn");
const lastname = document.getElementById("lastname");
const state = document.getElementById("state");
const outputtxt = document.getElementById("output");
const showbutton = document.getElementById("showbtn");

savebutton.addEventListener("click", function(event)
{
  var datastr = "/N: " + lastname.value + "/S: "+ state.value  +"\n";
  lastname.value ="";
  var promesseReponse = fetch(
    "http://localhost:8080/w",
    {
        method: "POST",
        body: datastr,
        headers: {
            MonEnteteRequete: "bonjour serveur",
        },
    },
);
  promesseReponse.then(function(reponse) {
      // 404, 200, 500, etc.
      console.log('Code de réponse :', reponse.status);

      // J'utilise une syntaxe bizarre pour convertir les entêtes
      // pour qu'elles s'affichent bien dans la console mais pas
      // besoin de comprendre ça.
      console.log('Entêtes :', ...reponse.headers);

      var promesseCorps = reponse.text();

      promesseCorps.then(function(corps) {
          console.log('Corps :', corps);
      });

      promesseCorps.catch(function(erreur) {
          console.log('Erreur :', erreur);
      });
  });

  promesseReponse.catch(function(erreur) {
      console.log('Erreur :', erreur);
  });

});

showbutton.addEventListener("click",function(event)
{
  fetch("http://localhost:8080/g",
  {
    method: "GET",
    headers: {
        MonEnteteRequete: "bonjour serveur",
    },
  },).then(function(reponse)
  {
    reponse.text();
  })
  .then(function(data)
  {
    outputtxt.value = data.results;
  })
});