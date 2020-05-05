var foto = [
   "img/foto1.jpg",
   "img/foto2.jpg",
   "img/foto3.jpg",
   "img/foto4.jpg",
   "img/foto5.jpg",
   "img/foto6.jpg",
   "img/foto7.jpg",
   "img/foto8.jpg",
   "img/foto9.jpg",
   "img/foto10.jpg"
];

var i=0;

var f1=false; //flag di stato
var f2=false;

function controllo1() {
   var a=0;
   var b=0;

   var fa=true; // flag del form
   var fb=true;
   var fc=true;
   var fd=true;

   var nome = document.querySelector("#your_name"); // raccolgo i dati
   var cognome = document.querySelector("#your_surname");
   var genere = document.querySelectorAll("input[name=sesso]");
   var nazione = document.querySelectorAll("input[name=paese]");
   var giorno=0;
   var giorni = document.querySelectorAll(".days");
   for (var y = 0; y < giorni.length; y++) { // controllo quale giorno è stato selezionato
      if (giorni[y].selected == true) {
         giorno = y+1;
      }
   }
   var mese="";
   var mesi = document.querySelectorAll(".months");
   for (var z = 0; z < mesi.length; z++) { // controllo quale mese è stato selezionato
      if (mesi[z].selected == true) {
         mese = mesi[z].innerText;
      }
   }
   var anno=0;
   var anni = document.querySelectorAll(".years");
   for (var t = 0; t < anni.length; t++) { // controllo quale anno è stato selezionato
      if (anni[t].selected == true) {
         anno=anni[t].innerText;
      }
   }

   if (nome.value == "") { // verifco che il nome non sia vuoto
      alert("you didn't write your name");
      fa=false;
   }
   if (cognome.value == "") { // verifico che il cognome non sia vuoto
      alert("you didn't write your surname");
      fb=false;
   }
   for (var i = 0; i < genere.length; i++) {
      if ( genere[i].checked == false ) { // verifico se il genere è stato scelto
         a++;
      }
      else {
         mioGenere = genere[i].id;
      }
   }
   if (a==2) {
      alert("you didn't choose your sex");
      fc=false;
   }
   for (var x = 0; x < nazione.length; x++) { // verifico se la nazione è stato selezionata
      if ( nazione[x].checked == false ) {
         b++;
      }
      else {
         miaNazione = nazione[x].id;
      }
   }
   if ( b == 2) {
      alert("you didn't choose your country");
      fd=false;
   }

   if ( fa == true && fb == true && fc == true && fd == true ) { // salvo i dati nel local storage
      alert("sending successful");
      f1=true; // setto il flag

      localStorage.local_nome = nome.value;
      localStorage.local_cognome = cognome.value;
      localStorage.local_genere = mioGenere;
      localStorage.local_nazione = miaNazione;
      localStorage.local_giorno = giorno;
      localStorage.local_mese = mese;
      localStorage.local_anno = anno;
      localStorage.local_bio = document.querySelector("#area").value;
      if (miaNazione == "OTHER") { // verifico se l'utente ha specificato la nazione
         altra = document.querySelector("#other");
         localStorage.local_altra = altra.value;
      }

   }
}

function naz() { // funzione per far apparire l' input text per specificare nazione
   var miaVariabile = document.querySelectorAll("input[name=paese]");
   var bho = document.querySelector("#other");
   if (miaVariabile[1].checked == true) {
      bho.hidden = false;
   }
   if (miaVariabile[0].checked == true) {
      bho.hidden = true;
   }
}

function appari() { // funzione per far apparire il paragrafo di informazioni
   var miaVariabile = document.querySelector(".ps[name=f]");
   if (miaVariabile.hidden == true) {
      miaVariabile.hidden = false;
   }
   else if (miaVariabile.hidden == false) {
      miaVariabile.hidden = true;
   }
}

// funzioni delle immagini

function next() { // funzione per il tasto avanti
   if (i < 9 )
      i++;
   else
      i=0;

   document.querySelector("#images #avatar").src = foto[i];
}

function back() { // funzione per il tasto indietro
   if ( i==0 )
      i=9;
   else
      i--;

   document.querySelector("#images #avatar").src = foto[i];

}

function appari2() {
   var miaVariabile = document.querySelector(".ps[name=i]");
   if (miaVariabile.hidden == true) {
      miaVariabile.hidden = false;
   }
   else if (miaVariabile.hidden == false) {
      miaVariabile.hidden = true;
   }
}

function start(event) { // funzioni per il drag & drop
   event.dataTransfer.setData("text", event.target.id);
}

function stop(event) {
   event.preventDefault();
}

function end(event) {
   event.preventDefault();
   var contenitore = document.querySelector("#deposito");
   contenitore.innerHTML = "";
   var data = event.dataTransfer.getData("text");
   var ogg = document.getElementById(data).src;
   var nuovo = document.createElement("img");
   nuovo.src = ogg;
   nuovo.id = "avatar";
   contenitore.appendChild(nuovo);
}

function save() {
   var img = document.querySelector("#deposito #avatar");
   if (img == null) {
      alert("you didn't choose any photo");
   }
   else {
      alert("sending successful");
      f2=true; // setto il secondo flag di stato
      localStorage.local_path = img.src;
   }
}

// geolocalizzazione e mappa

function appari3() {
   var miaVariabile = document.querySelector(".ps[name=g]");
   if (miaVariabile.hidden == true) {
      miaVariabile.hidden = false;
   }
   else if (miaVariabile.hidden == false) {
      miaVariabile.hidden = true;
   }

}

function geo() {
   if (navigator.geolocation) { // verifico se il browser supporta la geolocalizzazione
      navigator.geolocation.getCurrentPosition(mia_posizione, errore);
   }else{
      alert("Your browser doesn't support geolocation");
   }

   function errore() { // funzione in caso di errore
      alert("location not avaible");
   }

   function mia_posizione(position) { // tracciamento della posizione
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      alert("Location Found!") ;
      localStorage.local_lat = lat; // salvo i dati nel local storage
      localStorage.local_long = lon;

      var map = new L.Map('mymap'); // codice della mappa
      var url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
      var attrib = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
      var mylayer = new L.TileLayer(url, {attribution: attrib});

      map.setView([lat,lon],16);
      map.addLayer(mylayer);

      var marker = L.marker([lat,lon]).addTo(map); // marker della mappa
      marker.bindPopup('You are here');
      marker.addTo(map);
   }
}

// creazione

function appari4() {
   var miaVariabile = document.querySelector(".ps[name=c]");
   if (miaVariabile.hidden == true) {
      miaVariabile.hidden = false;
   }
   else if (miaVariabile.hidden == false) {
      miaVariabile.hidden = true;
   }
}

function Run(){
   if (f1 == true && f2 == true) {
      var c_name = document.querySelector("#cname"); // questi sono i luoghi dove andrò a mettere i dati salvati
      var c_surname = document.querySelector("#csurname");
      var c_birth = document.querySelector("#cdate");
      var c_month = document.querySelector("#cmonth");
      var c_year = document.querySelector("#cyear");
      var c_age = document.querySelector("#cage");
      var c_gender = document.querySelector("#cgender");
      var c_nazion = document.querySelector("#cnation");
      var c_other = document.querySelector("#cother");
      var c_location = document.querySelector("#cLocal");
      var c_bio = document.querySelector("#cBio");
      var c_image = document.querySelector("#ff");
      var l_name = localStorage.local_nome; // prelevo i dati dal local Storage
      var l_surname = localStorage.local_cognome;
      var l_day = localStorage.local_giorno;
      var l_month = localStorage.local_mese;
      var l_year = localStorage.local_anno;
      var l_age = 2020 - l_year;
      var l_gender = localStorage.local_genere;
      var l_nazion = localStorage.local_nazione;
      var l_other = localStorage.local_altra;
      var l_bio = localStorage.local_bio;
      var l_lat = localStorage.local_lat;
      var l_long = localStorage.local_long;
      var l_path = localStorage.local_path;

      if (l_bio == undefined) { // riempo questi campi se sono vuoti
         l_bio = "";
      }
      if (l_other == undefined) {
         l_other = "";
      }
      if (l_lat == undefined) {
         l_lat = "not avaible";
      }
      if (l_long == undefined) {
         l_long = "not avaible";
      }

      c_name.innerText += l_name; // inserisco i campi
      c_surname.innerText += l_surname;
      c_birth.innerText += l_day;
      c_month.innerText += l_month;
      c_year.innerText += l_year;
      c_age.innerText += l_age;
      c_gender.innerText += l_gender;
      c_nazion.innerText += l_nazion;
      c_other.innerText += l_other;
      c_location.innerText += "\n" + l_lat + "\n" + l_long;
      c_bio.innerText += "\n" + l_bio;
      c_imag.src = l_path;
   }
   else if ( f1 == false || f2 == false ) {
      if (f1 == false) {
         alert("you didn't compile the form");
      }
      else if ( f2 == true) {
         alert("you didn't choose any photo");
      }
   }
}

function distruggi() {
   var question = confirm("Local Storage will be delete. Go on?");
   if (question == true) {
      localStorage.clear();
   }
}
