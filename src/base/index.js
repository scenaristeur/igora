import chalk from "chalk";
import { v4 as uuidv4 } from "uuid";

export class Base {
  constructor(options = {}) {
    this.options = options;
    this.id = uuidv4();
    this.flag = "[BASE]";
    this.chalk = chalk;
  }

  log(...args) {
   // if (this.options.debug) {
      const date = new Date();
      const hour = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();
      console.log("[" + hour + ":" + min + ":" + sec+"]\t", this.chalk(this.flag, ...args));
    //}
  }
}
