var gameDiv=document.getElementById("game");
var data;
var data2;
var dataEasy;
var dataHard;
var timerId;
var actualLevel;

// locOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation || screen.orientation.lock;
// locOrientation('landscape');
initGame();
screen.lockOrientation('landscape');

function initGame(){
    let groupButtons=document.createElement("div");
    groupButtons.className="groupButtons";
    let button1=document.createElement("button");
    button1.className="btn text-white btn-primary  startButtons"
    button1.innerHTML="Continue";
    if(checkCookie()){
    button1.addEventListener("click",function(){
        gameDiv.removeChild(gameDiv.lastChild);
        var codes = getCookie();
        var dCodes = codes[0];
        var dCodes2 = codes[1]; 
        if((parseInt(dCodes.match(/\d+/)))>5){
            parseData("hard","continue",dCodes,dCodes2);
        }
        else{
            parseData("easy","continue",dCodes,dCodes2);
        }
    })
    }
    else{
        button1.disabled=true;
    }
    //button1.disabled=true;
    let button2=document.createElement("button");
    button2.className="btn text-white btn-primary  startButtons"
    button2.innerHTML="New game";
    button2.addEventListener("click",function(){
        gameDiv.removeChild(gameDiv.lastChild)
        deleteCookie();
        newGame();
    })
    let button3=document.createElement("button");
    button3.className="btn text-white btn-primary  startButtons"
    button3.innerHTML="Rules";
    button3.addEventListener("click", function(){
        gameDiv.removeChild(gameDiv.lastChild);
        displayRules();
    });

    groupButtons.appendChild(button1);
    groupButtons.appendChild(document.createElement("br"));
    groupButtons.appendChild(button2);
    groupButtons.appendChild(document.createElement("br"));
    groupButtons.appendChild(button3);
    gameDiv.appendChild(groupButtons)
}
function continueGame(dCodes,dCodes2){
        console.log(data);
        console.log(actualLevel);
        actualLevel=data.find(e => e.title === dCodes);
        console.log(actualLevel);
        gameBoard();
        rightMatrix=dCodes2.slice();
        cheatMode();
        rightMatrix=actualLevel.rightRoutMatrix[0].slice();
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
        parseData(this.innerText.toLowerCase(),"new")
    })
    let button2=document.createElement("button");
    button2.className="btn text-white btn-primary  startButtons"
    button2.innerHTML="Hard";
    button2.addEventListener("click",function(){
        gameDiv.removeChild(gameDiv.lastChild);
        parseData(this.innerText.toLowerCase())
    })
    let button3=document.createElement("button");
    button3.className="btn text-white btn-primary  startButtons"
    button3.innerHTML="back";
    button3.addEventListener("click",function(){
        gameDiv.removeChild(gameDiv.lastChild);
        initGame();
    })
    
    groupButtons.appendChild(button1);
    groupButtons.appendChild(document.createElement("br"));
    groupButtons.appendChild(button2);
    groupButtons.appendChild(document.createElement("br"));
    groupButtons.appendChild(button3);
    gameDiv.appendChild(groupButtons)
}

function levelsMenu(param){
    let groupButtons=document.createElement("div");
    groupButtons.className="groupButtons";
    let a=document.createElement("h2");
    a.innerHTML="Choose a level:";
    a.style.margin="5px";
    a.style.padding="0";
    groupButtons.appendChild(a);
    if(param!=undefined){
        let button1=document.createElement("button");
        button1.className="btn text-white btn-primary  startButtons"
        button1.innerHTML="Continue";
        button1.addEventListener("click",function(){
            gameDiv.removeChild(gameDiv.lastChild);
            var codes = getCookie();
            var dCodes = codes[0];
            var dCodes2 = codes[1]; 
            continueGame(dCodes,dCodes2);
        })
        groupButtons.appendChild(button1);
        groupButtons.appendChild(document.createElement("br"));
    }
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
            setCookie(levelName,matrixElements);
    })
    });
    let button3=document.createElement("button");
    button3.className="btn text-white btn-primary  startButtons"
    button3.innerHTML="back";
    button3.addEventListener("click",function(){
        gameDiv.removeChild(gameDiv.lastChild);
        data=undefined;
        newGame();
    })
    groupButtons.appendChild(button3);
    gameDiv.appendChild(groupButtons);
}
var stackAmount;
function gameBoard(){
    let square;
    stackAmount=0;
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

function parseData(difficulty,game,dCodes,dCodes2){
    if(difficulty=="easy"){
    readTextFile("./scripts/"+"hard"+".json", function(text){
        data2=JSON.parse(text);
    });
    }
    else{
        readTextFile("./scripts/"+"easy"+".json", function(text){
            data2=JSON.parse(text);
        });
    }
    readTextFile("./scripts/"+difficulty+".json", function(text){
        data = JSON.parse(text);
    });
    timerId = setInterval(() => checkData(game,dCodes,dCodes2), 5);
}
function checkData(game,dCodes,dCodes2){
    if (data!=undefined){
        clearInterval(timerId);
        timerId=0;
        if (game==="continue"){
            continueGame(dCodes,dCodes2)
        }
        else{
            levelsMenu();
        }
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

function displayRules(){
    let rulesText=document.createElement("div");
    rulesText.className="rulesText";
    rulesText.style.position="absolute";
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");

    let a1=document.createElement("p");
    a1.innerHTML="1. - choose a difficulty";
    a1.style.margin="5px";
    a1.style.color="white";
    a1.style.fontSize="2vw";
    a1.style.textShadow="2px 2px 4px #0094FF";
    a1.style.padding="0";
    rulesText.appendChild(a1);
    let a2=document.createElement("p");
    a2.innerHTML="2. - choose a level";
    a2.style.margin="5px";
    a2.style.color="white";
    a2.style.fontSize="2vw";
    a2.style.textShadow="2px 2px 4px #0094FF";
    a2.style.padding="0";
    rulesText.appendChild(a2);
    let a3=document.createElement("p");
    a3.innerHTML="3. - you'll see a bar at the left, from there you can drag a pipe and drop it into the grid to the right. The goal is to make a path from the faucet to the end pipe. Tapping a placed pipe will rotate it. You can put back a pipe back to its place where you picked it up from. If you think you put together a working path, click/tap the 'open' button to check your path. Before you can make any changes to yout path, you need to close the water. Hitting the clear button will reset the grid. Hitting the 'cheat' button will show a working path. If you wish to go back to the menus, hit the 'back button'";
    a3.style.margin="5px";
    a3.style.color="white";
    a3.style.fontSize="2vw";
    a3.style.textShadow="2px 2px 4px #0094FF";
    a3.style.padding="0";
    rulesText.appendChild(a3);

    let button4=document.createElement("button");
    button4.className="btn text-white btn-primary  startButtons"
    button4.innerHTML="back";
    button4.addEventListener("click",function(){
        gameDiv.removeChild(gameDiv.lastChild);
        initGame();
    })
    rulesText.appendChild(button4);
    gameDiv.appendChild(rulesText);
}