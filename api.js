let album = document.querySelector("#album");
let musicas = document.querySelector("#musicas");
let basicinfo = document.querySelector("#basicInfo");
let url, resposta, infojson; 
let procuraart = document.querySelector("#procuraartista");
let procuraalb = document.querySelector("#procuraalbum");
let ntags, ntracks;

async function pegainfo(){
    url = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=5115f2da40d9b299cd817f51fe0dcf70&artist="+
    procuraart.value + "&album=" + procuraalb.value + "&format=json";
    try{
        resposta = await fetch(url);
        infojson = await resposta.json();
        mostrainfo();
    }
    catch{
        alert("Ocorreu um erro. Verifique se os nomes foram digitados corretamente.");
    }
}  
function mostrainfo(){
    album.innerHTML = "<h1>"  + infojson.album.name
    let artistaelink = document.createElement("div");
    artistaelink.setAttribute("id","artistaelink");
    album.appendChild(artistaelink);
    let linkartista = document.createElement("a");
    linkartista.setAttribute("id", "linkartista")
    if (Array.isArray(infojson.album.tracks.track)){
        linkartista.setAttribute("href",infojson.album.tracks.track[0].artist.url);
        linkartista.innerHTML = infojson.album.tracks.track[0].artist.url; 
    }
    else{
        linkartista.setAttribute("href",infojson.album.tracks.track.artist.url);
        linkartista.innerHTML = infojson.album.tracks.track.artist.url;
    }
    artistaelink.innerHTML = "</h1>" + "<br> Por: <span>"  + infojson.album.artist +
     "</span><br>";
     artistaelink.appendChild(linkartista);
    
    let img = document.createElement("img");
    img.setAttribute("alt","capa do álbum")
    img.setAttribute("id","image")
    img.setAttribute("src",JSON.stringify(infojson.album.image[3]).slice(30).replace('"}', ""));
    document.querySelector("#linkalbum").before(img);
    document.querySelector("#container").style.display = "grid";
    document.querySelector("#instrucao").style.display = "none";
    document.querySelector("#link").innerHTML = infojson.album.url;
    document.querySelector("#link").setAttribute("href", infojson.album.url);
    if (infojson.album.tags != ""){
    if (infojson.album.tags.tag.length >= 3){
        ntags = 3;
    }
    else {
        ntags = infojson.album.tags.tag.length;
    }
    basicinfo.innerHTML = "Tags: <span>" + infojson.album.tags.tag[0].name + "</span>"
    for (let i = 1; i < ntags; i++) {
        basicinfo.innerHTML += "<span>, " + infojson.album.tags.tag[i].name + "</span>"
    };
}
else {
    basicinfo.innerHTML = "Tags: Não foram encontradas.";
}
    basicinfo.innerHTML += "<br>Ouvintes: <span>" + infojson.album.listeners +
    "</span><br>Playcount: <span>" + infojson.album.playcount + "</span>";
    //musicas
    musicas.innerHTML = "<h2>Músicas:</h2> <br>";
    if (Array.isArray(infojson.album.tracks.track)){
    for (let i = 0; i < infojson.album.tracks.track.length; i++){
        let linkmusica = document.createElement("a");
        linkmusica.setAttribute("href", infojson.album.tracks.track[i].url)
        linkmusica.setAttribute("id","linkmusica");
        linkmusica.innerHTML = infojson.album.tracks.track[i].url
        let duracaom = parseInt(infojson.album.tracks.track[i].duration / 60);
        let duracaos = parseInt(infojson.album.tracks.track[i].duration % 60);
        if (duracaom == 0 && duracaos == 0){
            musicas.innerHTML += "<span>" + infojson.album.tracks.track[i].name + "</span><br>Duração: não informa<br>";
        }else{  
        musicas.innerHTML += "<span>" + infojson.album.tracks.track[i].name + "</span><br>Duração: " + 
        duracaom + "m " + duracaos + "s<br>";
    }
        musicas.appendChild(linkmusica)
        musicas.innerHTML += "<br><br>";
    }
}
else {
        let linkmusica = document.createElement("a");
        linkmusica.setAttribute("href", infojson.album.tracks.track.url)
        linkmusica.setAttribute("id","linkmusica");
        linkmusica.innerHTML = infojson.album.tracks.track.url;       
        let duracaom = parseInt(infojson.album.tracks.track.duration / 60);
        let duracaos = parseInt(infojson.album.tracks.track.duration % 60);  
        musicas.innerHTML += "<span>" + infojson.album.tracks.track.name + "</span><br>Duração: " + 
        duracaom + "m " + duracaos + "s<br>";
        musicas.appendChild(linkmusica)
}
}
document.querySelector("#procura").addEventListener("click", pegainfo);
