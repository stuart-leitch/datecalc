import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["start", "weeks", "end", "list"]

  changedStart() {
    var start = new Date(this.startTarget.value)
    var weeks = parseInt(this.weeksTarget.value)
    var end = new Date(start.getTime() + (weeks * 6 * 24 * 60 * 60 * 1000));

    this.endTarget.value = end.toISOString().substring(0, 10);

  }
  changedWeeks() {
    this.changedStart()
  }
  changedEnd() {
    var end = new Date(this.endTarget.value)
    var weeks = parseInt(this.weeksTarget.value)
    var start = new Date(end.getTime() - (weeks * 6 * 24 * 60 * 60 * 1000));

    this.startTarget.value = start.toISOString().substring(0, 10);
  }

  addBlock() {
    var start = this.startTarget.value;
    var weeks = this.weeksTarget.value;
    var end = this.endTarget.value;

    var t = document.createTextNode(start + ' - ' + end + ' (' + weeks + 'w)');
    var li = document.createElement("LI");
    li.appendChild(t);
    this.element.appendChild(li);

    var nextStart = end + (1 * 24 * 60 * 60 * 1000);
    this.startTarget.value = nextStart
    this.changedStart()
  }
}