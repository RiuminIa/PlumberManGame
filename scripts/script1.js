var gameDiv=document.getElementById("game");
var data;
var timerId;
var actualLevel;

initGame();

function initGame(){
    let groupButtons=document.createElement("div");
    groupButtons.className="groupButtons";
    let button1=document.createElement("button");
    button1.className="btn text-white btn-primary  startButtons"
    button1.innerHTML="Continue";
    button1.disabled=true;
    let button2=document.createElement("button");
    button2.className="btn text-white btn-primary  startButtons"
    button2.innerHTML="New game";
    button2.addEventListener("click",function(){
        gameDiv.removeChild(gameDiv.lastChild)
        newGame();
    })
    let button3=document.createElement("button");
    button3.className="btn text-white btn-primary  startButtons"
    button3.innerHTML="Rules";
    groupButtons.appendChild(button1);
    groupButtons.appendChild(document.createElement("br"));
    groupButtons.appendChild(button2);
    groupButtons.appendChild(document.createElement("br"));
    groupButtons.appendChild(button3);
    gameDiv.appendChild(groupButtons)
}
function newGame(){
    console.log("aaa")
    let groupButtons=document.createElement("div");
    groupButtons.className="groupButtons";
    let a=document.createElement("h2");
    a.innerHTML="Choose a difficulty:";
    a.style.margin="5px";
    a.style.padding="0";
    groupButtons.appendChild(a);
    let button1=document.createElement("button");
    button1.className="btn text-white btn-primary  startButtons"
    button1.innerHTML="Easy";
    button1.addEventListener("click",function(){
        //console.log(this.innerText.toLowerCase());
        gameDiv.removeChild(gameDiv.lastChild);
        parseData(this.innerText.toLowerCase())
    })
    let button2=document.createElement("button");
    button2.className="btn text-white btn-primary  startButtons"
    button2.innerHTML="Hard";
    button2.addEventListener("click",function(){
        console.log("hard");
        gameDiv.removeChild(gameDiv.lastChild);
        parseData(this.innerText.toLowerCase())
    })
    
    groupButtons.appendChild(button1);
    groupButtons.appendChild(document.createElement("br"));
    groupButtons.appendChild(button2);
    gameDiv.appendChild(groupButtons)
}
function levelsMenu(){
    let groupButtons=document.createElement("div");
    groupButtons.className="groupButtons";
    let a=document.createElement("h2");
    a.innerHTML="Choose a level:";
    a.style.margin="5px";
    a.style.padding="0";
    groupButtons.appendChild(a);
    data.forEach(element => {
        let button=document.createElement("button");
        button.className="btn text-white btn-primary  startButtons"
        button.innerHTML=element.title;
        groupButtons.appendChild(button);
        groupButtons.appendChild(document.createElement("br"));
        button.addEventListener("click",function(){
            gameDiv.removeChild(gameDiv.lastChild);
            actualLevel=element;
            document.getElementById("border").style.display="grid";
    })
    });
    gameDiv.appendChild(groupButtons);
}

function parseData(difficulty){
    readTextFile("./scripts/"+difficulty+".json", function(text){
        data = JSON.parse(text);
    });
    timerId = setInterval(() => checkData(), 5);
}
function checkData(){
    if (data!=undefined){
        clearInterval(timerId);
        timerId=0;
        levelsMenu();
    }
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
