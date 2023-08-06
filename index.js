const time = document.querySelector("#time")
const text =document.querySelector("#text")
const marks  =document.querySelector("#marks")
var inter;
var sec=60;

function func(){
    if(sec==60){
        time.innerText="1:00"
    }
    else if(sec<0){
        var sentence = text.value.trim();
        var arr = sentence.split(" ")
        marks.innerText =arr.length+" WPM"
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
text.addEventListener("focus",textAlter)
function textAlter(){
    inter =setInterval(func,1000)
}
