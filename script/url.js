const storage = require('electron-json-storage');

window.onload = function () {
    storage.get('url', function (e, data) {
        if (e)
            throw e;
        var json = data;
        if (json.length) {
            json.forEach(function (elm) {
                document.getElementById(elm.screen).value = elm.url;
            });
        }
    });
};

function save(json) {
    storage.set('url', json, function (err) {
        if (err)
            throw err;
        console.log('save');
    });
}

function saveUrl() {
    var json = [];
    for (var i = 1; i < 5; i++) {
        json.push({screen: i, url: document.getElementById(i.toString()).value});
    }
    save(json);
    location.assign("chatview.html");
}

function changeUrl1() {
    document.getElementById("1").value = document.getElementById("selectValue").value;
}

function changeUrl2() {
    document.getElementById("2").value = document.getElementById("selectValue").value;
}

function changeUrl3() {
    document.getElementById("3").value = document.getElementById("selectValue").value;
}

function changeUrl4() {
    document.getElementById("4").value = document.getElementById("selectValue").value;
}