import storage from 'electron-store';
const path = "./paramAnime"

document.onload=getJson(orderAnime);

function getUrl(){
    var url = document.getElementById('url');
    var titre = url.value.split("/");
    titre = titre[titre.length-1].split(".");
    titre = fusion(titre);
    setJson(ajoutAnime,{titre:titre,url:url});
}

function ajoutAnime(json, anime) {
    if (json) {
        json.push(anime);
    } else {
        json = anime
    }
}

function setJson(callback, changedata) {
    let json = storage.get(anime);

    json.forEach(element => {
        if (!changedata) {
            callback(json ? json : new Array());
        } else {
            callback(json ? json : new Array(), changedata)
        }
    save(json);
    });  
        
}

function save(json){
    storage.set({path: json});
}

function fusion(txt){
    if(txt.length >2){
        var titre=txt[txt.length - 2];
        for(var i=txt.length - 3 ; i>-1;i--){
            titre = txt[i].concat(titre);
        }
        return titre.replace(/\+/gi," ");
    }else{
        return txt[0].replace(/\+/gi," ");
    }
}

function orderAnime(){
    let data = storage.get(anime);
    var regex = / \? \(en cours\)/;
    var stateAnime = [];
    if (data.length) {
        data.forEach(function (element) {
            var req = new XMLHttpRequest();
            req.open('GET', element.url, false);
            req.send(null);
            if (req.status === 200) {
                if (req.responseText.search(regex) > 0) {
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

function suppresionAnime(anime){
    let data = storage.get(anime);
    var num = 0;
    if (data.length) {
        data.forEach(function (element) {
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
    storage.delete(anime);
}