let msg = document.querySelector('.flashMessage');

setTimeout(() => {
    if(msg)
    msg.style.display = "none";
}, 3000);

function closeIt(){
    msg.style.display = "none";
}