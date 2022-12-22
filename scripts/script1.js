var gameDiv=document.getElementById("game");
initGame();
function initGame(){
    let groupButtons=document.createElement("div");
    groupButtons.className="groupButtons";
    let button1=document.createElement("button");
    button1.className="btn text-white btn-primary m-2 startButtons"
    button1.innerHTML="Continue";
    button1.disabled=true;
    let button2=document.createElement("button");
    button2.className="btn text-white btn-primary m-2 startButtons"
    button2.innerHTML="New game";
    let button3=document.createElement("button");
    button3.className="btn text-white btn-primary m-2 startButtons"
    button3.innerHTML="Rules";
    groupButtons.appendChild(button1);
    groupButtons.appendChild(document.createElement("br"));
    groupButtons.appendChild(button2);
    groupButtons.appendChild(document.createElement("br"));
    groupButtons.appendChild(button3);
    gameDiv.appendChild(groupButtons)
}
