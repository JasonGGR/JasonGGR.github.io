var connected = 0;
const connectbutton = document.getElementById("connectbtn");
const password = document.getElementById("password");
const createbutton = document.getElementById("createbtn");
var outputlist = document.getElementById("outputlist");
const outputdiv = document.getElementById("outputdiv");
const searchinput = document.getElementById("searchinput");

var indx;
var datalst;
connection_test();

connectbutton.addEventListener("click", function(event)
{
  connection_test();
});

createbutton.addEventListener("click", function(event)
{
  if(connected == 1)
  {
    var olist = document.createElement("ul");
    let div = document.createElement("div");
    let idbtn = document.createElement("input");
    idbtn.type ="button";
    idbtn.onclick = function(){updateData(indx-1,1)};
    let namedis = document.createElement("input");
    namedis.id = "name" + (indx-1);
    namedis.placeholder = "Name"
    let fnamedis = document.createElement("input");
    fnamedis.id = "fname" + (indx-1);
    fnamedis.placeholder = "Firstname"
    let maildis = document.createElement("input");
    maildis.id = "mail" + (indx-1);
    maildis.placeholder = "Email"
    let numdis = document.createElement("input");
    numdis.id = "num" + (indx-1);
    numdis.placeholder = "Num"
    let domdis = document.createElement("input");
    domdis.id = "dom" + (indx-1);
    domdis.placeholder = "Domain"
    let statedis = document.createElement("select");
    statedis.id ="state" + (indx-1);
    let waitopt = document.createElement("option");
    waitopt.text = "En Attente";
    waitopt.value = "wait";
    let yesopt = document.createElement("option");
    yesopt.text = "Positive";
    yesopt.value = "yes";
    let noopt = document.createElement("option");
    noopt.text = "Negative";
    noopt.value = "no";
    statedis.add(waitopt);
    statedis.add(yesopt);
    statedis.add(noopt);
    let itw1dis = document.createElement("input");
    itw1dis.id = "itw1" + (indx-1);
    itw1dis.placeholder = "Interviewer 1"
    let itw2dis = document.createElement("input");
    itw2dis.id = "itw2" + (indx-1);
    itw2dis.placeholder = "Interviewer 2"
    let datedis = document.createElement("input");
    datedis.id = "date" + (indx-1);
    datedis.placeholder = "Date"
    idbtn.value = "Add";
    div.appendChild(idbtn);
    div.appendChild(namedis);
    div.appendChild(fnamedis);
    div.appendChild(maildis);
    div.appendChild(numdis);
    div.appendChild(domdis);
    div.appendChild(statedis);
    div.appendChild(itw1dis);
    div.appendChild(itw2dis);
    div.appendChild(datedis);
    olist.appendChild(div);
    outputdiv.replaceChild(olist, outputlist);
    outputlist = olist;
  }
});

function connection_test()
{
  var pwrd = password.value;
  var promesseReponse = fetch(
    "https://mpsi1.fr/jason/c",
    {
        method: "POST",
        body: pwrd,
        headers: {
            MonEnteteRequete: "bonjour serveur",
        },
    },
  );
  promesseReponse.then(function(reponse) {
      var promesseCorps = reponse.text();

      promesseCorps.then(function(corps) {
          console.log('Corps :', corps);
          connected = parseInt(corps);
          console.log(connected);
          if(connected == 1)
          {
            getData();
          }
          else{
            password.value = "";
          }
      });

      promesseCorps.catch(function(erreur) {
          console.log('Erreur :', erreur);
      });
  });
}

searchinput.addEventListener("input", function(event)
{
  if(connected == 1)
  {
    var searchstr = searchinput.value;
    var searchlst =[];
    for (let i = 0; i < datalst.length - 1; i++) {
      if(datalst[i].toLowerCase().includes(searchstr.toLowerCase()))
        {
          searchlst.push(datalst[i]);
        }
    }
    displayData(searchlst);
  }
})

function displayData(datali)
{
  var olist = document.createElement("ul");
  for (let i = 0; i < datali.length; i++) {
    let strlist = datali[i].split("¤")
    let div = document.createElement("div");
    let idbtn = document.createElement("input");
    idbtn.type ="button";
    idbtn.onclick = function(){updateData(strlist[0],0)};
    let namedis = document.createElement("input");
    namedis.id = "name" + strlist[0];
    namedis.placeholder = "Name"
    let fnamedis = document.createElement("input");
    fnamedis.id = "fname" + strlist[0];
    fnamedis.placeholder = "Firstname"
    let maildis = document.createElement("input");
    maildis.id = "mail" + strlist[0];
    maildis.placeholder = "Email"
    let numdis = document.createElement("input");
    numdis.id = "num" + strlist[0];
    numdis.placeholder = "Num"
    let domdis = document.createElement("input");
    domdis.id = "dom" + strlist[0];
    domdis.placeholder = "Domain"
    let statedis = document.createElement("select");
    statedis.id ="state" + strlist[0];
    let waitopt = document.createElement("option");
    waitopt.text = "En Attente";
    waitopt.value = "wait";
    let yesopt = document.createElement("option");
    yesopt.text = "Positive";
    yesopt.value = "yes";
    let noopt = document.createElement("option");
    noopt.text = "Negative";
    noopt.value = "no";
    statedis.add(waitopt);
    statedis.add(yesopt);
    statedis.add(noopt);
    let itw1dis = document.createElement("input");
    itw1dis.id = "itw1" + strlist[0];
    itw1dis.placeholder = "Interviewer 1"
    let itw2dis = document.createElement("input");
    itw2dis.id = "itw2" + strlist[0];
    itw2dis.placeholder = "Interviewer 2"
    let datedis = document.createElement("input");
    datedis.id = "date" + strlist[0];
    datedis.placeholder = "Date"
    idbtn.value = "Update";
    namedis.value = strlist[1];
    fnamedis.value = strlist[2];
    maildis.value = strlist[3];
    numdis.value = strlist[4];
    domdis.value = strlist[5];
    itw1dis.value = strlist[6];
    itw2dis.value = strlist[7];
    datedis.value = strlist[8];
    statedis.value = strlist[9];
    div.appendChild(idbtn);
    div.appendChild(namedis);
    div.appendChild(fnamedis);
    div.appendChild(maildis);
    div.appendChild(numdis);
    div.appendChild(domdis);
    div.appendChild(statedis);
    div.appendChild(itw1dis);
    div.appendChild(itw2dis);
    div.appendChild(datedis);
    olist.appendChild(div);
  }
  outputdiv.replaceChild(olist, outputlist);
  outputlist = olist;
}

function getIndex(datalist)
{
  indx = datalist.length;
}

function updateData(id,addvalue)
{
  var datas ="";
  for (let i = 0; i < datalst.length-1 + addvalue; i++) {
    if(i == id)
    {
      var nameid = document.getElementById("name"+id.toString());
      var fnameid = document.getElementById("fname"+id.toString());
      var mailid = document.getElementById("mail"+id.toString());
      var numid = document.getElementById("num"+id.toString());
      var domid = document.getElementById("dom"+id.toString());
      var itw1id = document.getElementById("itw1"+id.toString());
      var itw2id = document.getElementById("itw2"+id.toString());
      var dateid = document.getElementById("date"+id.toString());
      var stateid = document.getElementById("state"+id.toString());
      datas += i.toString() + "¤" + nameid.value + "¤" + fnameid.value + "¤" + mailid.value + "¤" + numid.value + "¤" + domid.value + "¤" + itw1id.value + "¤" + itw2id.value + "¤" + dateid.value + "¤" + stateid.value + "\n";
    }
    else{
      datas += datalst[i] + "\n"; 
    }
    
  }
  datas += (parseInt(datalst[datalst.length -1]) + addvalue).toString();
  console.log(datas);

  var promesseReponse = fetch(
    "https://mpsi1.fr/jason/u",
    {
        method: "POST",
        body: datas,
        headers: {
            MonEnteteRequete: "bonjour serveur",
        },
    },
);
  promesseReponse.then(function(reponse) {
      var promesseCorps = reponse.text();

      promesseCorps.then(function(corps) {
          console.log('Corps :', corps);
      });

      promesseCorps.catch(function(erreur) {
          console.log('Erreur :', erreur);
      });
      getData();
  });

  promesseReponse.catch(function(erreur) {
      console.log('Erreur :', erreur);
  });
}

function getData()
{
  fetch("https://mpsi1.fr/jason/g",
  {
    method: "GET",
    headers: {
        MonEnteteRequete: "bonjour serveur",
    },
  },).then(function(reponse)
  {
    return reponse.text(); 
  })
  .then(function(data)
  {
    datalst = data.split("\n");
    getIndex(datalst);
    return datalst;
  });
}

function sendData(datas)
{
  var promesseReponse = fetch(
    "https://mpsi1.fr/jason/w",
    {
        method: "POST",
        body: datas,
        headers: {
            MonEnteteRequete: "bonjour serveur",
        },
    },
);
  promesseReponse.then(function(reponse) {
      var promesseCorps = reponse.text();

      promesseCorps.then(function(corps) {
          console.log('Corps :', corps);
      });

      promesseCorps.catch(function(erreur) {
          console.log('Erreur :', erreur);
      });
      getData();
  });

  promesseReponse.catch(function(erreur) {
      console.log('Erreur :', erreur);
  });
}