fetch('https://divyavrat-jugtawat-katapult.github.io/apicall.json').then(res=>res.json()).then(data=>{
console.log(data)
if(data?.jsFile)loaderScript(data.jsFile)
            .then(() => {
                console.log("loaded");
            })
            .catch((e) => {
                console.log("error", e);
            });
})
function loaderScript(scriptUrl) {
    return new Promise(function (res, rej) {
        let script = document.createElement('script');
        script.src = scriptUrl;
        script.type = 'text/javascript';
        script.async = true;
        script.onload = res;
        //let logError = logScriptLoadingError.bind(null, rej, scriptUrl)
        //script.addEventListener('error', logError);
        script.addEventListener('load', res);
        document.body.appendChild(script);
    });
}
