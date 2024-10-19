import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["start", "weeks", "end", "note", "blocks"]

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


    var li = document.createElement("LI");
    var t = document.createTextNode(start + ' - ' + end + ' (' + weeks + 'w) { ' + this.noteTarget.value + ' }');
    li.appendChild(t);
    this.blocksTarget.appendChild(li);

    var nextStart = new Date(new Date(end).getTime() + (1 * 24 * 60 * 60 * 1000));
    console.log(nextStart)

    this.startTarget.value = nextStart.toISOString().substring(0, 10);
    this.changedStart()
  }
}