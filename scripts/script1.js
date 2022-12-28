var gameDiv=document.getElementById("game");
var data;
var timerId;
var actualLevel;
locOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation || screen.orientation.lock;
locOrientation('landscape');
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
            gameBoard();
    })
    });
    gameDiv.appendChild(groupButtons);
}
var stackAmount=0;
function gameBoard(){
    let square;
    if(0.91*0.66/(actualLevel.size[1]+2)<(0.38/actualLevel.size[0])){
        square=100*0.91*0.66/(actualLevel.size[1]+2)
    }
    else{
        square=100*(0.38/actualLevel.size[0])
    }

    document.getElementById("border").setAttribute("style","top:"+((38-(square*actualLevel.size[0]))/2)+"vw;"+"display:flex")
    let choseElement=document.querySelector('.gridSistem1');
    choseElement.style.width=""+square+"vw";
    stackAmount=parseInt(actualLevel.figures.length/actualLevel.size[0]);
    if((actualLevel.figures.length%actualLevel.size[0])>0){
        stackAmount++;
    }
    document.querySelector('.col-8').setAttribute("style","width:"+(square*(actualLevel.size[1]+2)/0.91)+"%")
    for(let i=0;i<actualLevel.figures.length;i++){
        let element=document.createElement("div");
        element.className="grid grid-item"+" stack"+parseInt(i/actualLevel.size[0]);
        if(parseInt(i/actualLevel.size[0])>0){
            element.style.display="none";
        }
        element.style.width=""+square+"vw";
        element.style.height=""+square+"vw";
        choseElement.appendChild(element);
    }
    let boardGid=document.querySelector('.gridSistem2');
    let z=0;
    for(let x=0;x<actualLevel.size[0]*(actualLevel.size[1]+2);x++){
        let element=document.createElement("div");
        element.className="grid";
        element.style.width=""+square+"vw";
        element.style.height=""+square+"vw";
        if(x%(actualLevel.size[1]+2)!= 0&& x%(actualLevel.size[1]+2)!=(actualLevel.size[1]+1)){
            element.id=""+z;
            z++;
            element.className+=" grid-item";
        }
        else{
            element.style.border="none";
        }
        boardGid.appendChild(element);
    }
    initialLeftGrid();
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
