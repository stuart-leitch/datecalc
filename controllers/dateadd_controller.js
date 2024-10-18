import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["start", "weeks", "end"]

  change() {
    var start = new Date(this.startTarget.value)
    var weeks = parseInt(this.weeksTarget.value)
    var end = new Date(start.getTime() + (weeks * 7 * 24 * 60 * 60 * 1000));

    // console.log(end.toDateString())
    this.endTarget.innerHTML = end.toISOString().substring(0, 10);
    // this.endTarget.innerHTML = end.toDateString();
  }

  setStart() {
    this.startTarget.value = this.endTarget.innerHTML
    this.change()
  }
}