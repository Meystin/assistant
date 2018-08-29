const storage = require('electron-json-storage');

document.onload=getStateAnime();

function getUrl(){  
    var url = document.getElementById('search').getURL();
    var titre = url.split("/");
    titre = titre[titre.length-1].split(".");
    titre = fusion(titre);
    storage.get('wishList',function (err, data){
        if(err)throw err;
        var json = [];
        if(data.length){
            json = data;
        }
        json.push({titre:titre,url:url});
        save(json);
    });
}

function save(json){
    storage.set('wishList', json, function(error) {
        if (error) throw error;
        console.log('save');
    });
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

function getStateAnime(){
    document.getElementById("newAnime").style.display="none";
    document.getElementById("wishList").style.display="inline";
    var regex = / \? \(en cours\)/;
    var stateAnime = [];
    storage.get('wishList',function (err, data){
        if(err)throw err;
        data.forEach(function (element){
            var req = new XMLHttpRequest();
            req.open('GET', element.url, false);
            req.send(null);
            if(req.status === 200){
                console.log(req.responseText.search(regex));
                if(req.responseText.search(regex)>0){
                    stateAnime.push({titre : element.titre, state: false});
                }else{
                    stateAnime.push({titre : element.titre, state: true});
                }
            }
        });
    stateAnime.sort(compare);
    showAnime(stateAnime);
    });
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

function suppression(anime){
    storage.get('wishList',function (err, data){
        if(err)throw err;
        var num=0;
        data.forEach(function(element){
            console.log(element.titre);
            if(element.titre == anime){
                data.splice(num, 1);
                save(data);
                location.reload();
                return;
            }else{
                num++;
            }
        });
    });
}

function ajout(){
    document.getElementById("newAnime").style.display="inline";
    document.getElementById("wishList").style.display="none";
}

function deletedb(){
    storage.remove('wishList', function(error) {
  if (error) throw error;
});
}

document.getElementById('search').addEventListener('new-window', function (event){
    document.getElementById('search').src = event.url;
})