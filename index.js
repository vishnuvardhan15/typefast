const time = document.querySelector("#time")
const text =document.querySelector("#text")
const marks  =document.querySelector("#marks")
const dis = document.querySelector("#dis")
const correct =document.querySelector("#correct")
const wrong = document.querySelector("#wrong")
const accuracy = document.querySelector("#accuracy")
const result = document.querySelector("#result")
const refresh = document.querySelector("#refresh")
var start = false;
var wpm=0;
var error=0;
var inter;
var sec=59;
var ref;
var paraSum=""
text.focus();
let i=0; 

async function getPara(){
    var data = await fetch("http://metaphorpsum.com/paragraphs/1/30");
    var refPara = await data.text();
    ref = refPara.split(" ");
    for(let i=0;i<ref.length;i++){
        paraSum = paraSum+`<span id="${i}">${ref[i]}</span> `
    }
    dis.innerHTML=paraSum
}
getPara()

function func(){
    if(sec==60){
        time.innerText="1:00"
    }
    else if(sec<0){
        marks.innerText = wpm +" WPM"
        correct.innerHTML = "Correct words : "+wpm
        wrong.innerHTML = "Wrong words : "+error
        let total = wpm+error
        accuracy.innerHTML = (total==0)?"Accuracy : ---":"Accuracy : "+ Math.round(wpm/total*100)+"%"
        result.style.backgroundColor="#A27B5C"
        clearInterval(inter)
    }
    else{
        if(0<=sec&&sec<=9){
            time.innerText="0:0"+sec;
        }
        else{
            time.innerText ="0:"+sec;
        }
    }
    sec--;
}

text.addEventListener("input",textAlter)
function textAlter(){
    if(start==false){
        inter =setInterval(func,1000)
        start=true;
    }
}

text.addEventListener('keydown', testing);
function testing(e) {
    document.getElementById(i).classList.add("highlight");
    if (e.key === ' ') {
        let myWord = text.value.trim();
        if(ref[i]===myWord){
            wpm++
            document.getElementById(i).style.color="green"
        }
        else{
            error++
            document.getElementById(i).style.color="red"
        }
        i++;
        document.getElementById(i-1).classList.remove("highlight"); 
        document.getElementById(i).classList.add("highlight"); 
        text.value=""
    }
  }

  refresh.addEventListener("click",()=>{
    location.reload();
  })
