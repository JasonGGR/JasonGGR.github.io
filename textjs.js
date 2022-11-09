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
    waitopt.value = "*wait";
    let yesopt = document.createElement("option");
    yesopt.text = "Positive";
    yesopt.value = "*yes";
    let noopt = document.createElement("option");
    noopt.text = "Negative";
    noopt.value = "*no";
    statedis.add(waitopt);
    statedis.add(yesopt);
    statedis.add(noopt);
    let itw1dis = document.createElement("input");
    itw1dis.id = "itw1" + (indx-1);
    itw1dis.placeholder = "Interviewer 1"
    let itw2dis = document.createElement("input");
    itw2dis.id = "itw2" + (indx-1);
    itw2dis.placeholder = "Interviewer 2"
    let itw3dis = document.createElement("input");
    itw3dis.id = "itw3" + (indx-1);
    itw3dis.placeholder = "Interviewer 3"
    let datedis = document.createElement("input");
    datedis.id = "date" + (indx-1);
    datedis.type ="datetime-local";
    let placedis = document.createElement("input");
    placedis.id = "place" + (indx-1);
    placedis.placeholder = "Place";
    let relaundis = document.createElement("select");
    relaundis.id ="relaun" + (indx-1);
    let yopt = document.createElement("option");
    yopt.text = "Oui";
    yopt.value = "y";
    let nopt = document.createElement("option");
    nopt.text = "Non";
    nopt.value = "n";
    relaundis.add(nopt);
    relaundis.add(yopt);
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
    div.appendChild(itw3dis);
    div.appendChild(datedis);
    div.appendChild(placedis);
    div.appendChild(relaundis);
    olist.appendChild(div);
    outputdiv.replaceChild(olist, outputlist);
    outputlist = olist;
  }
});

function connection_test()
{
  var pwrd = password.value;
  var promesseReponse = fetch(
    "http://34.163.81.24/jasonromaingg/c",
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
    sortData(searchstr);
  }
})

function sortData(searchstr)
{
  var searchlst =[];
    for (let i = 0; i < datalst.length - 1; i++) {
      if(datalst[i].toLowerCase().includes(searchstr.toLowerCase()))
        {
          searchlst.push(datalst[i]);
        }
    }
    displayData(searchlst);
}

function displayData(datali)
{
  var olist = document.createElement("ul");
  var list = [];
  var div = document.createElement("div");
  div.className ="distext";
  let uptxt = document.createElement("input");
  uptxt.type ="button"
  uptxt.value = "Update"
  let nametxt = document.createElement("input");
  nametxt.type ="button";
  nametxt.value = "Name"
  let fnametxt = document.createElement("input");
  fnametxt.type ="button";
  fnametxt.value = "Firstname";
  let emailtxt = document.createElement("input");
  emailtxt.type ="button";
  emailtxt.value = "Email";
  let numtxt = document.createElement("input");
  numtxt.type ="button";
  numtxt.value = "Num";
  let domtxt = document.createElement("input");
  domtxt.type ="button";
  domtxt.value = "Domain";
  let anstxt = document.createElement("input");
  anstxt.type ="button";
  anstxt.value = "Answer";
  let itw1txt = document.createElement("input");
  itw1txt.type ="button";
  itw1txt.value = "Interviewer 1";
  let itw2txt = document.createElement("input");
  itw2txt.type ="button";
  itw2txt.value = "Interviewer 2";
  let itw3txt = document.createElement("input");
  itw3txt.type ="button";
  itw3txt.value = "Interviewer 3";
  let datetxt = document.createElement("input");
  datetxt.type ="button";
  datetxt.value = "Date and hour";
  let placetxt = document.createElement("input");
  placetxt.type ="button";
  placetxt.value = "Place";
  let relauntxt = document.createElement("input");
  relauntxt.type ="button";
  relauntxt.value = "Relaunch";
  div.appendChild(uptxt);
  div.appendChild(nametxt);
  div.appendChild(fnametxt);
  div.appendChild(emailtxt);
  div.appendChild(numtxt);
  div.appendChild(domtxt);
  div.appendChild(anstxt);
  div.appendChild(itw1txt);
  div.appendChild(itw2txt);
  div.appendChild(itw3txt);
  div.appendChild(datetxt);
  div.appendChild(placetxt);
  div.appendChild(relauntxt);
  olist.appendChild(div);
  for(let i = 0; i < datali.length; i++)
  {
    if(datali[i].includes("*yes"))
    {
      list.push(datali[i]);
    }
  }
  for(let i = 0; i < datali.length; i++)
  {
    if(datali[i].includes("*wait"))
    {
      list.push(datali[i]);
    }
  }
  for(let i = 0; i < datali.length; i++)
  {
    if(datali[i].includes("*no"))
    {
      list.push(datali[i]);
    }
  }
  
  for (let i = 0; i < list.length; i++) {
    let strlist = list[i].split("¤")
    let div = document.createElement("div");
    div.className="itemclass"
    let idbtn = document.createElement("input");
    idbtn.type ="button";
    idbtn.onclick = function(){updateData(strlist[0],0)};
    let namedis = document.createElement("input");
    namedis.id = "name" + strlist[0];
    namedis.className ="dis";
    namedis.placeholder = "Name"
    let fnamedis = document.createElement("input");
    fnamedis.id = "fname" + strlist[0];
    fnamedis.className="dis"
    fnamedis.placeholder = "Firstname"
    let maildis = document.createElement("input");
    maildis.id = "mail" + strlist[0];
    maildis.placeholder = "Email"
    let numdis = document.createElement("input");
    numdis.id = "num" + strlist[0];
    numdis.className ="dis";
    numdis.placeholder = "Num"
    let domdis = document.createElement("input");
    domdis.id = "dom" + strlist[0];
    domdis.className ="dis";
    domdis.placeholder = "Domain"
    let statedis = document.createElement("select");
    statedis.id ="state" + strlist[0];
    let waitopt = document.createElement("option");
    waitopt.text = "En Attente";
    waitopt.value = "*wait";
    let yesopt = document.createElement("option");
    yesopt.text = "Positive";
    yesopt.value = "*yes";
    let noopt = document.createElement("option");
    noopt.text = "Negative";
    noopt.value = "*no";
    statedis.add(waitopt);
    statedis.add(yesopt);
    statedis.add(noopt);
    let itw1dis = document.createElement("input");
    itw1dis.id = "itw1" + strlist[0];
    itw1dis.className ="dis";
    itw1dis.placeholder = "Interviewer 1"
    let itw2dis = document.createElement("input");
    itw2dis.id = "itw2" + strlist[0];
    itw2dis.className ="dis";
    itw2dis.placeholder = "Interviewer 2"
    let itw3dis = document.createElement("input");
    itw3dis.id = "itw3" + strlist[0];
    itw3dis.className ="dis";
    itw3dis.placeholder = "Interviewer 3"
    let datedis = document.createElement("input");
    datedis.id = "date" + strlist[0];
    datedis.type ="datetime-local";
    let placedis = document.createElement("input");
    placedis.id = "place" + strlist[0];
    placedis.className ="dis";
    placedis.placeholder = "Place";
    let relaundis = document.createElement("select");
    relaundis.id ="relaun" + strlist[0];
    let yopt = document.createElement("option");
    yopt.text = "Oui";
    yopt.value = "y";
    let nopt = document.createElement("option");
    nopt.text = "Non";
    nopt.value = "n";
    relaundis.add(nopt);
    relaundis.add(yopt);
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
    placedis.value = strlist[10];
    relaundis.value = strlist[11];
    itw3dis.value = strlist[12];
    div.appendChild(idbtn);
    div.appendChild(namedis);
    div.appendChild(fnamedis);
    div.appendChild(maildis);
    div.appendChild(numdis);
    div.appendChild(domdis);
    div.appendChild(statedis);
    div.appendChild(itw1dis);
    div.appendChild(itw2dis);
    div.appendChild(itw3dis);
    div.appendChild(datedis);
    div.appendChild(placedis);
    div.appendChild(relaundis);
    olist.appendChild(div);
  }
  outputdiv.replaceChild(olist, outputlist);
  outputlist = olist;
}

function getIndex(datalist)
{
  indx = datalist.length;
}

function showcate(list)
{
  
  return list;
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
      var itw3id = document.getElementById("itw3"+id.toString());
      var dateid = document.getElementById("date"+id.toString());
      var stateid = document.getElementById("state"+id.toString());
      var placeid = document.getElementById("place"+id.toString());
      var relaunid = document.getElementById("relaun"+id.toString());
      datas += i.toString() + "¤" + nameid.value + "¤" + fnameid.value + "¤" + mailid.value + "¤" + numid.value + "¤" + domid.value + "¤" + itw1id.value + "¤" + itw2id.value + "¤" + dateid.value + "¤" + stateid.value +"¤" +placeid.value + "¤"+ relaunid.value + "¤"+ itw3id.value + "\n";
    }
    else{
      datas += datalst[i] + "\n"; 
    }
    
  }
  datas += (parseInt(datalst[datalst.length -1]) + addvalue).toString();

  var promesseReponse = fetch(
    "http://34.163.81.24/jasonromaingg/u",
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
  fetch("http://34.163.81.24/jasonromaingg/g",
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
    sortData("");
    return datalst;
  });
}
