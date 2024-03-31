import { v4 as uuidv4 } from "uuid";
import { md5 } from 'js-md5';
export class Explorer {
  constructor(options = {}) {
    this.id = uuidv4();
    //this.md5_fetch_method = "GET" //"HEAD"
  }

scan(options) {
    const urls = options.urls
    for (let url of options.urls) {
        this._scan_url(url, options)
    }
}

async _scan_url(url, options) {
    let emprunte = await this._emprunte(url)
    this.log( emprunte.url, emprunte.md5)
    if (options.public) {
        this.log("public", url)
    }
    if (options.private) {
        this.log("private", url)
    }
    if (options.friends) {
        this.log("friends", url)
    }
}

async _emprunte(url) {
let emp = {url: url}
    try {
        let headers = new Headers({
            //Accept: "application/json",
            //Authorization: `Bearer ${API_KEY}`,
          });
        const response = await fetch(url, {headers, method: "GET"}); // HEAD// GET // OPTIONS
        // console.log("response",response)
        const contentType = response.headers.get("content-type");
        const lastmodified = response.headers.get("Last-Modified"); // n'apparait pas avec HEAD, retester avec pplus d'urls !!!
        this.log("CT",contentType, lastmodified)
        // if (!contentType || !contentType.includes("application/json")) {
        //   throw new TypeError("Oops, we haven't got JSON!");
        // }
        const responseData = await response.text();
        // console.log("TEXT",responseData)
        emp.text = responseData
        emp.md5 = md5(responseData)
        //console.log("Emprunte",url_md5)
        // md5.head = await fetch(url, {method: this.md5_fetch_method})  
        // md5.contenttype = md5.head.headers.get("content-type");
		// md5.contentsize = md5.head.headers.get("content-length");
		// md5.lastmodified = md5.head.headers.get("Last-Modified"); // n'apparait pas avec HEAD, retester avec pplus d'urls !!!
        // md5.body = await md5.head.body
    }catch(err) {
        console.log(err)
    }finally {
        return emp
    }
    
    
    
}






















  log(...args) {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    console.log("[" + hour + ":" + min + ":" + sec+"]\t"+this.id+"\t", ...args);
  }
}
