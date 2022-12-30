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

