import storage from 'electron-store';
const path = "./paramChat"

window.onload = function () {
    let json = storage.get('path');
    if (json.length) {
        for (let i = 1; i < 5; i++) {
            document.getElementById(i).value = json[i - 1];
        }
    }
}

function save(json) {
    storage.set({path: json});
    document.location.href = "./chatview.html";
}

function saveUrl() {
    var json = [];
    for (let i = 1; i < 5; i++) {
        json.push(document.getElementById(i).value);
    }
    save(json);
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