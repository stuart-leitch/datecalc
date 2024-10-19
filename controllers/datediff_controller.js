import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["start", "end", "output"]

  change() {
    var start = new Date(this.startTarget.value)
    var end = new Date(this.endTarget.value)

    var diffDays = end - start; //difference in milliseconds
    var days = diffDays / (1000 * 60 * 60 * 24);

    var weeks = Math.floor(days / 7) //round to nearest whole number
    var weeks_days = days % 7;

    var output = `${days} days <br>or<br> ${weeks} weeks, ${weeks_days} days`;

    this.outputTarget.innerHTML = output;
  }
}