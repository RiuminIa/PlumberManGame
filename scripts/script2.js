const allFigures=[["straight",[1,3]],["lid",[2]],["cross",[1,2,3,4]],["corner",[2,3]],["triangle",[1,3,4]]];

const gridSistem1=document.querySelector('.gridSistem1');
console.log(gridSistem1.children)
// Fill listeners
for(let a=0;a<gridSistem1.children.length;a++){
  let straight=createElement(straigtPipe,"fill");  
  gridSistem1.children[a].append(straight);
}
const fill = document.querySelectorAll('.fill');
const empties = document.querySelectorAll('.grid-item');
fill.forEach(e=>{
    e.addEventListener('dragstart', dragStart);
    e.addEventListener('dragend', dragEnd);
    e.addEventListener('click',function(){
    this.children[0].style.transform="rotate(-90deg)";
  });
});
// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
};

// Drag Functions
var actualFill;
function dragStart() {
  this.className += ' hold';
  actualFill=this;
  setTimeout(() => (this.className = 'invisible'), 2);
}

function dragEnd() {
  this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className +=' hovered';
}

function dragLeave() {
  this.className = 'grid-item';
}

function dragDrop() {
  this.className = 'grid-item';
  this.append(actualFill);
}