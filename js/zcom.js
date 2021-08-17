
function ZComAction() {
    const actions = this;
    actions.contentLoaded = [];

    function currentPath() {
        let path = './';
        const scripts = document.getElementsByTagName('script');
        let current = Array.from(scripts).filter(s => s.src.indexOf("js/zcom.js") !== -1);
        if (current.length > 0) {
            
            path = current[0].src.substring(0, current[0].src.lastIndexOf('zcom.js') );
        }
        return path;
    }
    const defaultPath = currentPath();

    actions.loadJS = function(url, implementationCode){
        let scriptTag = document.createElement('script');
        scriptTag.src = defaultPath+url;
    
        if (typeof implementationCode !== 'undefined') {
            scriptTag.onload = implementationCode;
            scriptTag.onreadystatechange = implementationCode;    
        }
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
        //document.body.appendChild(scriptTag);
    };

    actions.pageLoadListener = function (func) {
        actions.contentLoaded.push(func);
    }

    actions.pageLoadFire = function () {
        actions.contentLoaded.forEach(function (event) { event(); });
    }
}



window.zComAction = new ZComAction();
window.zComAction.loadJS('test.js', function () {
    window.zComAction.pageLoadFire();
});

// window.addEventListener("DOMContentLoaded", function () {
//     window.zComAction.pageLoadFire();
// });




