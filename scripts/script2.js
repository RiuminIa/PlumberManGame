var matrixElements=[];
const gridSistem1=document.querySelector('.gridSistem1');
const gridSistem2=document.querySelector('.gridSistem2');
var elementsMenu=[];
var elementOnGame=new Map();
var elementOnGameRecurs=new Map();
var toElement=[];
var fromElement=[];
var rightMatrix=[];
var actualMenu=0;
var dragDropElem=0;
function initialLeftGrid(){
  matrixElements=new Array(actualLevel.size[1]*actualLevel.size[0]);
  rightMatrix=new Array(actualLevel.size[1]*actualLevel.size[0]);
  rightMatrix=actualLevel.rightRoutMatrix[0].slice();
  matrixElements.fill(0);
  actualLevel.figures.forEach(e=>{
    elementsMenu.push([allFigures.get(e[0]),e[1]]);
  })
  for(let a=0;a<gridSistem1.children.length;a++){
    try{
      let amount=document.createElement("div");
      amount.className="amount";
      amount.id="amount"+a;
      gridSistem1.children[a].append(amount);
      for(let z=0;z<(elementsMenu[a][1]+1);z++){
        let figur=createElement(elementsMenu[a][0][0],actualLevel.figures[a][0]);
        if(z==0){
          figur.style.opacity=0.2;
          $(figur).attr("draggable", "false");
          figur.style.display="none";
        }
        else{
          figur.children[0].style.transform="rotate(0deg)";
          figur.style.display="none";
          figur.className="fill"+" amount"+a;
        }
        gridSistem1.children[a].append(figur);
      }
      elementOnGame.set("amount"+a,[elementsMenu[a][0][1],actualLevel.figures[a][0],0]);
      elementOnGameRecurs.set(""+actualLevel.figures[a][0],"amount"+a);
    }
    catch(error){}
  }
  arrowParams();
  changeAmount();
  initialGrid();
  initialRightGrid();
}
function arrowParams(){
  $("#arrowUp").attr("draggable", "false");
  $("#arrowDown").attr("draggable", "false");
  if(stackAmount==1){
    $("#up").attr("style","display:none");
    $("#down").attr("style","display:none");
  return;
  }
  $('#down').click(function(){
      let beforeMenu=actualMenu;
      actualMenu=(actualMenu+1)%stackAmount;
      $('.stack'+beforeMenu).css('display','none');
      $('.stack'+actualMenu).css('display','flex');
  });
  $('#up').click(function(){
    let beforeMenu=actualMenu;
    if((actualMenu-1)<0){
      actualMenu=stackAmount-1;
    }
    else{
      actualMenu=(actualMenu-1)%stackAmount;
    }
    $('.stack'+beforeMenu).css('display','none');
    $('.stack'+actualMenu).css('display','flex');
});
}

function initialGrid(){
const fill = document.querySelectorAll('.fill');
const empties = document.querySelectorAll('.grid-item');
//listeners fo drag object
fill.forEach(e=>{
    e.addEventListener('dragstart', dragStart);
    e.addEventListener('dragend', dragEnd);
    e.addEventListener('touchmove',function(a){
     dragStart(a,this);
    });
    e.addEventListener('touchend',function(e){
      actualPosition=[0,0];
      try{
      actualFill.style.left ="";
        actualFill.style.top ="";
        actualFill.style.border="none";
        dragDropElem=document.elementFromPoint(coordsActual[0],coordsActual[1]);
      if(dragDropElem.id.length>=1 && dragDropElem.id.length<3){
        dragDrop();
      }
      else if(dragDropElem.tagName=='path'){
        dragDropElem=dragDropElem.parentElement.parentElement.parentElement.parentElement;
        dragDrop();
      }
    }
      catch(error){}
      coordsActual=[0,0];
      dragDropElem=0;
    })
    e.addEventListener('click',function(){
      rotate(this);
  });
});
// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
};
}
function rotate(element){
  if(element.parentElement.id.length>=1){
    for(let x=0;x<matrixElements[element.parentElement.id][0].length;x++){
      matrixElements[element.parentElement.id][0][x]=(matrixElements[element.parentElement.id][0][x]+1)%4;
    }
    matrixElements[element.parentElement.id][2]=(parseInt(element.children[0].style.transform.match(/\d+/))+90)%360;
       }
  element.children[0].style.transform="rotate("+((parseInt(element.children[0].style.transform.match(/\d+/))+90)%360)+"deg)";

}
function initialRightGrid(){
  actualLevel.from.forEach(e=>{
    fromElement.push([fromFigur.get("from"),e]);
  })
  actualLevel.to.forEach(e=>{
    toElement.push([toFigur.get("to"),e]);
  })
  toElement.forEach(e=>{
    let figur=createElement(e[0][0],"to");
    $(figur).attr("draggable", "false");
    figur.children[0].children[0].style.transform="matrix(1 0 0 1 230 250)"
    gridSistem2.children[e[1]].append(figur);
  })
  fromElement.forEach(e=>{
    let figur=createElement(e[0][0],"from");
    $(figur).attr("draggable", "false");
    figur.children[0].children[0].style.transform="matrix(1 0 0 1 300 320)"
    gridSistem2.children[e[1]].append(figur);
  })
}



function changeAmount(){
  for(let a=0;a<gridSistem1.children.length;a++){
    try{  
      if(gridSistem1.children[a].children.length>1){
        gridSistem1.children[a].lastChild.style.display="flex";
      }
      $("#amount"+a).text(""+(gridSistem1.children[a].children.length-2));
  }
    catch(error){}
  }
}
// Drag Functions
var actualFill;
var flingElement;
let fatherElement;
var actualPosition=[0,0];
var coordsActual=[0,0]

function dragStart(e,elem) {
  if(elem!=undefined){
  var touchLocation = e.targetTouches[0];
  var elemWidth=elem.offsetWidth;
  //elem.style.position="absolute";
  coordsActual[0]=touchLocation.pageX;
  coordsActual[1]=touchLocation.pageY;
  actualPosition[0]+=touchLocation.pageX-elem.getBoundingClientRect().left-elemWidth/2;
  actualPosition[1]+=touchLocation.pageY-elem.getBoundingClientRect().top-elemWidth/2;
  elem.style.left =""+(actualPosition[0]) + 'px';
  elem.style.top =""+(actualPosition[1]) + 'px';
  elem.style.border="solid 5px #ccc"
  actualFill=elem;
  }
  else{
    this.style.border="solid 5px #ccc"
    actualFill=this;
  }
  if(actualFill.parentElement.id.length>=1){
    fatherElement=actualFill.parentElement;
  }
}

function dragEnd() {
  // this.className = 'fill';
  this.style.border="none";
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.style.border="dashed";
}

function dragLeave() {
  //this.className = 'grid grid-item';
  this.style.border="ridge 1px";
}

function dragDrop() {
  console.log(dragDropElem);
  if(dragDropElem==0){
    console.log("AAAA")
    dragDropElem=this;
    dragDropElem.style.border="ridge 1px";
  }
  else{
    actualPosition=[0,0];
    coordsActual=[0,0];
  }

  if(actualFill.parentElement.id.length>=1){
    matrixElements[actualFill.parentElement.id]=0;
  }
    if(dragDropElem.id.length>=1){
      let named=elementOnGame.get("amount"+parseInt(actualFill.className.match(/\d+/)))[1];
      let coords=[...elementOnGame.get("amount"+parseInt(actualFill.className.match(/\d+/)))[0]];
      let angle=parseInt(actualFill.children[0].style.transform.match(/\d+/));
      for(let x=0;x<coords.length;x++){
        coords[x]=(coords[x]+angle/90)%4;
      }
      flingElement=[coords,named,angle];
      if(dragDropElem.children.length==0 || dragDropElem==fatherElement){
        matrixElements[dragDropElem.id]=flingElement;
        if(dragDropElem.children.length==0){
          dragDropElem.append(actualFill);
        }
      }
      else if(actualFill.parentElement.id.length>=1){
        matrixElements[fatherElement.id]=flingElement;
      }
    }
    else if(actualFill.className.search(dragDropElem.children[0].id)>0){
      if (dragDropElem.lastChild.className!="amount"){
        dragDropElem.lastChild.style.display="none";
      }
      dragDropElem.append(actualFill);
    }
  changeAmount();
  dragDropElem=0;
}
$("#clear").click(cleanBoard);
$("#start").click(gameStart);
$("#cheat").click(cheatMode);

function cheatMode(){
  $("#clear").click();
  //let rightMatrix=[...actualLevel.rightRoutMatrix[0]];
  ///matrixElements.fill(0);
  for(let i=0;i<rightMatrix.length;i++){
    if(rightMatrix[i]!=0){
      let foundClass=elementOnGameRecurs.get(rightMatrix[i][1]);
      let elemsies= document.querySelectorAll("."+foundClass);
      matrixElements[i]=[...[[...rightMatrix[i][0]],rightMatrix[i][1],rightMatrix[i][2]]];

      elemsies[0].children[0].style.transform="rotate("+rightMatrix[i][2]+"deg)"
      elemsies[0].style.display="flex";
      $("#"+i).append(elemsies[0])
  }
  else{
    matrixElements[i]=0;
  }
  }
  changeAmount();
}


function cleanBoard(){
  if($("#start").text()!="open"){
    $("#start").click();
  }
  for(let i=0;i<matrixElements.length;i++){
     let elem=document.getElementById(''+i);
    if(elem.children.length>0){
      let father=document.getElementById(''+(elem.children[0].classList[1])).parentElement;
        elem.children[0].style.display="none";
        if (father.lastChild.className!="amount"){
          father.lastChild.style.display="none";
        }
        father.append(elem.children[0]);
        matrixElements.fill(0)
      }
    }
changeAmount();
}
let flagLose;

function gameStart(){
  const empties = document.querySelectorAll('.grid-item');
  var timer=500;
  if($(this).text()==="open"){
    $(this).text("closed");
  }
  else{
    $(this).text("open");
    empties.forEach(e=>{
      $(e).css('pointer-events','');
      if(e.children.length>0 && e.children[0].className!="amount"){
        e=e.children[0].children[0].children[0].children[0];
        e.setAttribute("style","fill:#88cfd1");
        e.style.display="none";
        $(e).fadeIn(timer+=300);
      }
    });
    return;
  }
  empties.forEach(e=>{
    $(e).css('pointer-events','none');
  });
  flagLose=false;
  var width;
  var height;
  var from;
  var to=[];
  var foundPlaces;
  height=actualLevel.size[0];
  width=actualLevel.size[1];
  from=actualLevel.from[0];
  var indexMasive=[];
  var timer=500;
  actualLevel.to.forEach(e=>{
    to.push(parseInt(e/(width+2)));
  })
  recursFinding(parseInt((from/(width+2))*width),2);
  indexMasive.forEach(e=>{
    let el=document.getElementById(""+e);
    el=el.children[0].children[0].children[0].children[0];
    el.setAttribute("style","fill:#00277b");
    el.style.display="none";
    $(el).fadeIn(timer+=300);
  })
    if (!flagLose && (to.length==0)){
      alert("you are winner");
    }
    else{
      alert("you are loser");
    }
 
  function recursFinding(indexElement,way){

    if (indexMasive.indexOf(indexElement)>-1){
      return;
    }
    if(matrixElements[indexElement][0]===undefined){
      flagLose=true;
      return;
    }
    let element=matrixElements[indexElement][0];
    let found=false;
    let nextStep=[];
    let el=document.getElementById(""+indexElement);
    el=el.children[0].children[0].children[0].children[0];
    for(let i=0;i<element.length;i++){
       if((element[i]==way+2)||(element[i]==way-2)){
        indexMasive.push(indexElement);
          if(matrixElements[indexElement][1]=="tail"){
            // el.setAttribute("style","fill:#00277b");
            // el.style.display="none";
            // $(el).fadeIn(timer+=300);
          return;
          }
          found=true;
       }
       else if((i==(element.length-1)) && !found){
         flagLose=true;
         return;
       }
       else{
          nextStep.push(element[i])
       }
    }
    // el.setAttribute("style","fill:#00277b");
    // el.style.display="none";
    // $(el).fadeIn(timer+=300);


    nextStep.forEach(e=>{
      let w=parseInt(indexElement%width);
      let h=parseInt(indexElement/width);
      let futureElement=indexElement;
      switch(e){
        case 0:
          w--;
          futureElement--;
          break;
        case 1:
          h--;
          futureElement-=width;
        break;
        case 2:
          w++;
          futureElement++;
        break; 
        case 3:
          h++;
          futureElement+=width;
        break;      
      }
      if(h<0 || h>=height || w<0){
        flagLose=true;
        return;
      }
      if(w>=width){
        if((to.indexOf(h))>-1){
          to.splice(to.indexOf(h),1);
        }
        else{
          flagLose=true;
          return;
        }
      }
      else{
        recursFinding(futureElement,e);
      }
    })
    return;
  }
}
function result(to){
  if (!flagLose && (to.length==0)){
    alert("you are winner");
  }
  else{
    alert("you are loser");
  }
  document.getElementById(""+indexMasive[indexMasive.length-1]).removeEventListener('DOMSubtreeModified', result, false);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
