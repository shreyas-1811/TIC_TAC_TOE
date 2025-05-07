let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newGameBtn=document.querySelector("#newGame");
let msgContainer=document.querySelector(".msgContainer");
let msg=document.querySelector("#msg");

let turnX=true;  
let count = 0; //To Track Draw
//to store winning patterns
const winningPatterns=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];


const resetGame=()=>{
    turnX=true;  
    count=0;
    enableBoxes();
    boxes.innerText="";
    msgContainer.classList.add("hidden");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
      
        if(turnX){
          box.style.color="#034748";
            box.innerText="X";
            turnX=false;
        }else{
          box.style.color="#001021";
            box.innerText="O";
            turnX=true;
        }
        box.disabled=true;
        count++;

        let isWinner = checkWinner();
        
        if (count === 9 && !isWinner) {
            gameDraw();
          }

    })
})


const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hidden");
    disableBoxes();
  };

  
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(Winner)=>{
    disableBoxes();
    msg.innerText=`Congratulations , Winner is ${Winner}`;
    msgContainer.classList.remove("hidden")
}

const checkWinner = () => {
    for (let pattern of winningPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          return true;
        }
      }
    }
  };

newGameBtn.addEventListener("click",resetGame);

resetBtn.addEventListener("click",resetGame);