const storage = require('electron-storage');
const path = "./paramAnime";
const nautiljonScraper = require('nautiljon-scraper');

document.onload=getJson(orderAnime);

function recuperationInfos(name){
    return info = nautiljonScraper.search(name, "anime", 50);
}

function ajout(){
    let name = document.getElementById('name');
    let info = nautiljonScraper.search(name, "anime", 50);
    if(info){
        getJson(ajoutAnime,{titre:name});
    }
}

function ajoutAnime(json, anime) {
    if (json) {
        json.push(anime);
    } else {
        json = anime
    }
    save(json);
}

function getJson(callback, changedata) {
    storage.get(path).then(json => {
        if (!changedata) {
            callback(json ? json : new Array());
        } else {
            callback(json ? json : new Array(), changedata)
        }
    });
}

function save(json){
    storage.set(path,json).then(err => {});
}

function orderAnime(data){
    var regex = / \? \(en cours\)/;
    var stateAnime = [];
    console.log(data);
    if (data.length) {
        data.forEach(function (element) {
            var req = recuperationInfos(element.titre)
            if (req) {
                if (req.diffusion == "en cours") {
                    stateAnime.push({titre: element.titre, state: false});
                } else {
                    stateAnime.push({titre: element.titre, state: true});
                }
            }
            stateAnime.sort(compare);
            showAnime(stateAnime);
        });
    }
}

function compare(a,b){
    if(a.state == true && b.state == false){
        return -1;
    }else if(a.state == false && b.state == true){
        return 1;
    }
    return 0;
}

function showAnime(stateAnime){
    if (document.getElementById('listAnime')){
        document.getElementById('listAnime').remove();
    }
    var racine = document.getElementById("wishList");
    var tableau = racine.appendChild(document.createElement("div"));
    let tabId = document.createAttribute("id");
    tabId.value = "listAnime";
    tableau.setAttributeNode(tabId);
    stateAnime.forEach(function (element){
        var anime = tableau.appendChild(document.createElement("div"));
        if(element.state){
            let classe = document.createAttribute("class");
            classe.value = "alert alert-success";
            anime.setAttributeNode(classe);
            let role = document.createAttribute("role");
            role.value = "alert";
            anime.setAttributeNode(role);
            anime.appendChild(document.createTextNode(element.titre + ' => Anime terminé'));
            
        }else{
            let classe = document.createAttribute("class");
            classe.value = "alert alert-secondary";
            anime.setAttributeNode(classe);
            let role = document.createAttribute("role");
            role.value = "alert";
            anime.setAttributeNode(role);
            anime.appendChild(document.createTextNode(element.titre + " => Anime en cours"));
        }
        let bouton = anime.appendChild(document.createElement("button"));
        bouton.appendChild(document.createTextNode('Supprimer'));
        let btnClass = document.createAttribute("class");
        btnClass.value = "btn btn-light";
        bouton.setAttributeNode(btnClass);
        let btnType = document.createAttribute("type");
        btnType.value = "button";
        bouton.setAttributeNode(btnType);
        let btnFunct = document.createAttribute("onclick");
        btnFunct.value = "suppression(this.name)";
        bouton.setAttributeNode(btnFunct);
        let btnName = document.createAttribute("name");
        btnName.value = element.titre;
        bouton.setAttributeNode(btnName);
        let btnStyle = document.createAttribute("style");
        btnStyle.value = "position: absolute;right: 10px;top: 5px;";
        bouton.setAttributeNode(btnStyle);
    });
}

function suppression(anime) {
    getJson(suppresionAnime,anime);
}

function suppresionAnime(data,anime){
    var num = 0;
    if (data.length) {
        data.forEach(function (element) {
            console.log(element.titre);
            if (element.titre == anime) {
                data.splice(num, 1);
                save(data);
                location.reload();
                return;
            } else {
                num++;
            }
        });
    }
}

function deletedb() {
    storage.remove(path).then(err => {
        console.log("delete");
    });
}
