var matrixElement=[];
const gridSistem1=document.querySelector('.gridSistem1');
const gridSistem2=document.querySelector('.gridSistem2');
var elementsMenu=[];
var toElement=[];
var fromElement=[];
function initialLeftGrid(){
  actualLevel.figures.forEach(e=>{
    elementsMenu.push([allFigures.get(e[0]),e[1]]);
  })
  for(let a=0;a<gridSistem1.children.length;a++){
    try{
      let amount=document.createElement("div");
      amount.className="amount";
      amount.id="amount"+a;
      gridSistem1.children[a].append(amount);
      for(let z=0;z<elementsMenu[a][1];z++){
        let figur=createElement(elementsMenu[a][0][0],actualLevel.figures[a][0]);
        figur.children[0].style.transform="rotate(0deg)";
        figur.style.display="none";
        figur.className="fill"+" amount"+a;
        gridSistem1.children[a].append(figur);
      }
    }
    catch(error){}
  }
  changeAmount();
  initialGrid();
  initialRightGrid();
}
function initialGrid(){
const fill = document.querySelectorAll('.fill');
const empties = document.querySelectorAll('.grid-item');
fill.forEach(e=>{
    e.addEventListener('dragstart', dragStart);
    e.addEventListener('dragend', dragEnd);
    e.addEventListener('click',function(){
      this.children[0].style.transform="rotate("+((parseInt(this.children[0].style.transform.match(/\d+/))+90)%360)+"deg)";
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
function initialRightGrid(){
  console.log("fs");
  actualLevel.from.forEach(e=>{
    fromElement.push([fromFigur.get("from"),e]);
  })
  actualLevel.to.forEach(e=>{
    toElement.push([toFigur.get("to"),e]);
  })
  toElement.forEach(e=>{
    let figur=createElement(e[0][0],"to");
    figur.children[0].children[0].style.transform="matrix(1 0 0 1 230 250)"
    gridSistem2.children[e[1]].append(figur);
  })
  fromElement.forEach(e=>{
    let figur=createElement(e[0][0],"from");
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
      $("#amount"+a).text(""+(gridSistem1.children[a].children.length-1));
  }
    catch(error){}
  }
}
// Drag Functions
var actualFill;
function dragStart() {
  // this.className += ' hold';
  this.style.border="solid 5px #ccc"
  actualFill=this;

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
  this.className +=' hovered';
}

function dragLeave() {
  this.className = 'grid grid-item';
}

function dragDrop() {
  this.className = 'grid grid-item';
  try{
    this.children[0]
    if(actualFill.className.search(this.children[0].id)>0){
      if (this.lastChild.className!="amount"){
        this.lastChild.style.display="none";
      }
      this.append(actualFill);
    }
  }
  catch(error){
    this.append(actualFill);
  }
  changeAmount();
}