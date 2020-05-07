
console.log("ues");
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
});


const search = document.querySelector("input");
const form = document.querySelector("form");
const mesone = document.querySelector('#message1');
const mestwo = document.querySelector('#message2');
form.addEventListener("submit", (event)=>{
   event.preventDefault();
    const location = search.value;
    mesone.textContent = data.forecast;
    fetch('http://localhost:3000/forecast?address='+location+'').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            mesone.value = data.error
        }else{
            mesone.textContent = data.forecast;
            mestwo.textContent = data.location;
        }
    });
});
});