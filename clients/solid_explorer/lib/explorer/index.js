import { v4 as uuidv4 } from "uuid";
import { md5 } from "js-md5";

import { VectorStoreIndex } from "llamaindex";

export class Explorer {
  constructor(options = {}) {
    this.id = uuidv4();
    this.version = "1.0.0";
    //this.md5_fetch_method = "GET" //"HEAD"
  }

  async scan(options) {
    const urls = options.urls;
    const docs = []
    for (let url of options.urls) {
      let doc =await this._scan_url(url, options);
      docs.push(JSON.stringify(doc))
    }

this._query_docs(docs)

  }


async _query_docs(docs){
  console.log("docs",docs)
  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments(docs);

  // Query the index
  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query({
    //query: "What is the license grant in the TOS?",
    query: "Where is the brain?",
  });

  // Output response
  console.log(response.toString());
}





  async _scan_url(url, options) {
    let emprunte = await this._emprunte(url);
    this.log(emprunte.url, emprunte.md5);
    if (options.public) {
      this.log("public", url);
    }
    if (options.private) {
      this.log("private", url);
    }
    if (options.friends) {
      this.log("friends", url);
    }
    return emprunte;
  }

  async _emprunte(url) {
    let emp = { url: url, version: this.version };
    try {
      let headers = new Headers({
        //Accept: "application/json",
        //Authorization: `Bearer ${API_KEY}`,
        Accept: "application/ld+json",
      });
      const response = await fetch(url, { headers, method: "GET" }); // HEAD// GET // OPTIONS
      // console.log("response",response)
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const jsonld = await response.json();
      console.log("JSONLD", jsonld);
      emp.jsonld = jsonld;
      emp.md5 = md5(JSON.stringify(jsonld));
      emp.date = Date.now();

      //   return jsonld;
    } catch (error) {
      console.log("ERROR", error);
      try {
        let headers = new Headers({
          //Accept: "application/json",
          //Authorization: `Bearer ${API_KEY}`,
        });
        const response = await fetch(url, { headers, method: "GET" }); // HEAD// GET // OPTIONS
        // console.log("response",response)
        //const contentType = response.headers.get("content-type");
        //const lastmodified = response.headers.get("Last-Modified"); // n'apparait pas avec HEAD, retester avec pplus d'urls !!!
        //this.log("CT",contentType, lastmodified)
        // if (!contentType || !contentType.includes("application/json")) {
        //   throw new TypeError("Oops, we haven't got JSON!");
        // }
        const responseData = await response.text();
        //console.log("TEXT",responseData)
        emp.text = responseData;
        emp.md5 = md5(responseData);
        emp.date = Date.now();
        //console.log("Emprunte",url_md5)
        // md5.head = await fetch(url, {method: this.md5_fetch_method})
        // md5.contenttype = md5.head.headers.get("content-type");
        // md5.contentsize = md5.head.headers.get("content-length");
        // md5.lastmodified = md5.head.headers.get("Last-Modified"); // n'apparait pas avec HEAD, retester avec pplus d'urls !!!
        // md5.body = await md5.head.body
      } catch (err) {
        console.log(err);
        emp.error = err;
        emp.date = Date.now();
      }
    } finally {
      return emp;
    }
  }

  async _emprunte1(url) {
    let emp = { url: url };
    try {
      let headers = new Headers({
        //Accept: "application/json",
        //Authorization: `Bearer ${API_KEY}`,
      });
      const response = await fetch(url, { headers, method: "GET" }); // HEAD// GET // OPTIONS
      // console.log("response",response)
      const contentType = response.headers.get("content-type");
      const lastmodified = response.headers.get("Last-Modified"); // n'apparait pas avec HEAD, retester avec pplus d'urls !!!
      this.log("CT", contentType, lastmodified);
      // if (!contentType || !contentType.includes("application/json")) {
      //   throw new TypeError("Oops, we haven't got JSON!");
      // }
      const responseData = await response.text();
      console.log("TEXT", responseData);
      emp.text = responseData;
      emp.md5 = md5(responseData);
      emp.date = Date.now();
      //console.log("Emprunte",url_md5)
      // md5.head = await fetch(url, {method: this.md5_fetch_method})
      // md5.contenttype = md5.head.headers.get("content-type");
      // md5.contentsize = md5.head.headers.get("content-length");
      // md5.lastmodified = md5.head.headers.get("Last-Modified"); // n'apparait pas avec HEAD, retester avec pplus d'urls !!!
      // md5.body = await md5.head.body
    } catch (err) {
      console.log(err);
    } finally {
      return emp;
    }
  }

  log(...args) {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    console.log(
      "[" + hour + ":" + min + ":" + sec + "]\t" + this.id + "\t",
      ...args
    );
  }
}
