var http = require("http");
var fs = require("fs");

var serveur = http.createServer(function(requete, reponse) {
    console.log("Adresse du client", requete.socket.remoteAddress);
    console.log("Méthode :", requete.method);
    console.log("URL :", requete.url);
    console.log("Entêtes :", requete.headers);

    if (requete.method === "OPTIONS") {
        reponse.writeHead(200, {
            // On autorise toutes les origines (pas forcément une bonne idée !).
            "Access-Control-Allow-Origin": "*",

            // On autorise ces entêtes. Les entêtes de base sont déjà autorisées
            // mais on rajoute notre propre entête. Encore une fois, normalement
            // on a presque jamais besoin de toucher aux entêtes donc on a pas
            // besoin de cette ligne.
            "Access-Control-Allow-Headers": "MonEnteteRequete",
        });
        // Pas besoin de corps.
        reponse.end();
        return;
    }
    
    if(requete.url == "/w")
    {
        var boutsDeCorps = [];

        requete.on("data", function(boutDeCorps) {
            // On a recu un nouveau bout.
            boutsDeCorps.push(boutDeCorps);
        });
    
        requete.on("end", function() {
            // C'est bon, on a reçu tout le corps. On concatène tout les bouts que
            // l'on a reçu.
            var corps = Buffer.concat(boutsDeCorps);
    
            // "corps" est un objet de type "Buffer". On le convertit en chaîne de
            // caractère en l'interprétant avec l'encodage UTF-8 (c'est ce que le
            // navigateur envoie lorsqu'on envoie une chaine de caractère).
            var corpsChaineDeCaractere = corps.toString("utf-8");
    
            console.log("Corps :", corpsChaineDeCaractere);
            fs.appendFileSync("./data.txt", corpsChaineDeCaractere)
    
            // Tout s'est bien passé, on répond avec un code 200 qui veut dire OK.
            reponse.writeHead(200, {
                // Encore une fois, il faut assuer au navigateur que l'origine de la
                // page a le droit de lire la réponse de la seconde, vrai requête.
                "Access-Control-Allow-Origin": "*",
    
                // J'ajoute un entête bidon pour montrer comment ça marche.
                MonEnteteReponse: "bonjour client",
    
                // On assure au navigateur que l'entête est safe à lire du côté
                // client.
                "Access-Control-Expose-Headers": "MonEnteteReponse",
            });
    
            // Puis on écrit le corps de la réponse.
            reponse.write("J'ai bien reçu " + corpsChaineDeCaractere);
            reponse.text = corpsChaineDeCaractere;
            console.log("reponse ; "+ reponse.text);
    
            // On marque la fin de la réponse.
            reponse.end();
        });
    
        requete.on("error", function(erreur) {
            console.log("Erreur :", erreur);
        });
    }   
    
    if(requete.url == "/g")
    {

        requete.on("end", function() {
          reponse.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                MonEnteteReponse: "bonjour client",
                "Access-Control-Expose-Headers": "MonEnteteReponse",
          });
          console.log("jesaiapa")
          reponse.body = fs.readFileSync("/data.txt").toString();
          
          reponse.end();
      });
      console.log("test");
      requete.on("error", function(erreur) {
          console.log("Erreur :", erreur);
      });
    }
});

// Commence à écouter sur le port 8080.
serveur.listen(8080);