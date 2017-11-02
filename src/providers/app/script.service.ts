import {Injectable} from "@angular/core";

declare var document: any;

@Injectable()
export class ScriptService {

private scripts: any = {};

constructor() {
    [{name:"aura",src:"http://app.aurahealth.io/static/widget.js"}].forEach((script: any) => {
        this.scripts[script.name] = {
            loaded: false,
            src: script.src
        };
    });
}

/*load(...scripts: string[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
}*/

loadScript(name: string, cid: string) {
    document.getElementById('ext_scripts').innerHTML = "";
    return new Promise((resolve, reject) => {
        //resolve if already loaded
            //load script
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = this.scripts[name].src;
            script.id = "aura-widget";
            script.setAttribute("data-content-id",cid);
            if (script.readyState) {  //IE
                script.onreadystatechange = () => {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        this.scripts[name].loaded = true;
                        resolve({script: name, loaded: true, status: 'Loaded'});
                    }
                };
            } else {  //Others
                script.onload = () => {
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                };
            }
            script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
            document.getElementById('ext_scripts').appendChild(script);
        
    });
}

}