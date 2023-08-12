const time = document.querySelector("#time")
const text =document.querySelector("#text")
const marks  =document.querySelector("#marks")
const dis = document.querySelector("#dis")
const correct =document.querySelector("#correct")
const wrong = document.querySelector("#wrong")
const accuracy = document.querySelector("#accuracy")
const result = document.querySelector("#result")
var refPara = "Typing offers numerous benefits in today's digital age. One of the most significant advantages is its speed and efficiency. Compared to handwriting, typing allows for much faster input of text, enabling individuals to complete tasks and communicate more quickly. This increased speed directly translates to heightened productivity, saving valuable time in various personal and professional activities. Another key benefit of typing is its impact on communication. With the prevalence of digital communication channels such as emails, instant messaging, and social media, typing has become an essential skill for effective and efficient communication. People can exchange information swiftly, connect with others globally, and collaborate seamlessly, transcending geographical boundaries."
const ref = refPara.split(" ");
var start = false;
var wpm=0;
var error=0;
var inter;
var sec=59;
var paraSum=""
text.focus();
let i=0; 


for(let i=0;i<ref.length;i++){
    paraSum = paraSum+`<span id="${i}">${ref[i]}</span> `
}

dis.innerHTML=paraSum

document.getElementById(i).classList.add("highlight");

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
        result.style.backgroundColor="#ffc18e"
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
