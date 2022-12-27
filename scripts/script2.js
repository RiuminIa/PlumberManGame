var matrixElements=[];
const gridSistem1=document.querySelector('.gridSistem1');
const gridSistem2=document.querySelector('.gridSistem2');
var elementsMenu=[];
var elementOnGame=new Map();
var toElement=[];
var fromElement=[];
var actualMenu=0;
function initialLeftGrid(){
  matrixElements=new Array(actualLevel.size[1]*actualLevel.size[0]);
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
//Rotate function
fill.forEach(e=>{
    e.addEventListener('dragstart', dragStart);
    e.addEventListener('dragend', dragEnd);
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
function dragStart() {
  // this.className += ' hold';
  this.style.border="solid 5px #ccc"
  actualFill=this;
  console.log(actualFill.parentElement);
  if(actualFill.parentElement.id.length>=1){
    console.log("old")
    //flingElement=[...matrixElements[actualFill.parentElement.id]];
    fatherElement=actualFill.parentElement;
    //matrixElements[actualFill.parentElement.id]=0;
  }
  else{
    console.log("new")
    let name=elementOnGame.get("amount"+parseInt(actualFill.className.match(/\d+/)))[1];
    let coords=[...elementOnGame.get("amount"+parseInt(actualFill.className.match(/\d+/)))[0]];
    let angle=parseInt(this.children[0].style.transform.match(/\d+/));
    for(let x=0;x<coords.length;x++){
      coords[x]=(coords[x]+angle/90)%4;
    }
    flingElement=[coords,name,angle];
  }
  console.log(flingElement+"aaa");
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
  this.style.border="ridge 1px";
  //this.className = 'grid grid-item';;
  console.log("countChild "+this.children.length);
  if(actualFill.parentElement.id.length>=1){
    matrixElements[actualFill.parentElement.id]=0;
  }
    if(this.id.length>=1){
      let named=elementOnGame.get("amount"+parseInt(actualFill.className.match(/\d+/)))[1];
      let coords=[...elementOnGame.get("amount"+parseInt(actualFill.className.match(/\d+/)))[0]];
      let angle=parseInt(actualFill.children[0].style.transform.match(/\d+/));
      for(let x=0;x<coords.length;x++){
        coords[x]=(coords[x]+angle/90)%4;
      }
      flingElement=[coords,named,angle];
      if(this.children.length==0 || this==fatherElement){
        matrixElements[this.id]=flingElement;
        if(this.children.length==0){
          this.append(actualFill);
        }
      }
      else{
        matrixElements[fatherElement.id]=flingElement;
      }
    }
    else if(actualFill.className.search(this.children[0].id)>0){
      if (this.lastChild.className!="amount"){
        this.lastChild.style.display="none";
      }
      this.append(actualFill);
    }
    // if(actualFill.className.search(this.children[0].id)>0){
    //   if (this.lastChild.className!="amount"){
    //     this.lastChild.style.display="none";
    //   }
    //   this.append(actualFill);
    // }
  
    console.log("error")
    
    
  changeAmount();
  console.log(matrixElements[this.id]);
  console.log(matrixElements);
}