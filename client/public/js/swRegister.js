const publicKey = 'BBRGVCdMH_tml2OIEFHmREmf5DsxWRHO4BnJAafxZwfu6uBTWrlcdB1FmZqIjpaZwEM8Mf9uytilmpiWFM760QE'
// register service worker

if('serviceWorker' in navigator){
    send().catch(err => console.log(err))
}

async function send(){
    console.log("registering SW...")
    const register = await navigator.serviceWorker.register('/serviceWorker.js', {scope: '/'});
    console.log("Service Worker Registered...");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    })
    console.log('push registered...')
    console.log('sending push')
    await fetch('/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscription), 
        headers:{
            'content-type': 'application/json'
        }
    })
    console.log('push Send')
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}