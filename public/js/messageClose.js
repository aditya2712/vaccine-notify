let msg = document.querySelector('.flashMessage');
setTimeout(() => {
    msg.style.display = "none";
}, 3000);

function closeIt(){
    msg.style.display = "none";
}