const {request} = require('https');

const name = "API AQG"
const emotePass = '';
const emoteFail = '';

function check(){
    out = {
        "total": 5,
        "pass": 4, // can be "failed"
        "text": "Texte à afficher\n"+
                "dans le champ de l'Embed"
    }
    let t = "";
    let total = 2;
    let pass = 0;
    let resBase = checkApiBase();
    t += (resBase.pass ? '' : '') + "**API Base** " + resBase.t + '\n';
}

function checkApiBase() {
    return {
        "pass": true,
        "t": "[up: 123ms ; down: 321ms]"
    }
}

module.exports = {
    check,
    name
}