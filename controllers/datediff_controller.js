import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["start", "end", "days", "weeks"]

  change() {
    var start = new Date(this.startTarget.value)
    var end = new Date(this.endTarget.value)

    var diffDays = end - start; //difference in milliseconds
    var days = diffDays / (1000 * 60 * 60 * 24);

    this.daysTarget.innerHTML = `${days} days`;

    var weeks = Math.floor(days / 7) //round to nearest whole number
    var weeks_days = days % 7;

    this.weeksTarget.innerHTML = `${weeks} weeks and ${weeks_days} days`;
  }
}