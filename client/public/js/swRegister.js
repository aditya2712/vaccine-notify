
// register service worker

if(navigator.serviceWorker){
    window.addEventListener('load', ()=>{
        navigator.serviceWorker
        .register('/js/serviceWorker.js')
        .then(reg => console.log('Service Worker Registered'))
        .catch(err => console.log('Service Worker Error: '+ err))
    })
}