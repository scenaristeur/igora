
import chalk from "chalk";

export class Base {
  constructor(options = {}) {
    this.options = options;
    this.flag = "[BASE]";
    this.chalk = chalk;
  }

  log(...args) {
    if (this.options.debug) {
      const date = new Date();
      const hour = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();
      console.log("[" + hour + ":" + min + ":" + sec+"]\t", this.chalk(this.flag, ...args));
    }
  }
}
