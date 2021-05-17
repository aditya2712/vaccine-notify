
// register service worker

if(navigator.serviceWorker){
    window.addEventListener('load', ()=>{
        navigator.serviceWorker
        .register('../serviceWorker.js',{scope: '/'})
        .then(reg => console.log('Service Worker Registered'))
        .catch(err => console.log('Service Worker Error: '+ err))
    })
}