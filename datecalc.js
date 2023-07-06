
class DateBox {
  constructor(id, chg) {
    this.id = id;
    this.whenChanged = chg;
    this.set(new Date, false);
    addListener(this.id, "change", this.updated.bind(this));
  }
  set(value, update = true) {
    const dateString = value.toISOString().substring(0, 10);
    this.value = new Date(dateString);
    document.getElementById(this.id).value = dateString;
    if (update) { eval(this.whenChanged + "()") }
  }
  updated() {
    this.value = new Date(document.getElementById(this.id).value);
    eval(this.whenChanged + "()")
  }
}


window.onload = initialise;

function initialise() {
  // event listeners
  addListener("end-date-weeks", "change", calc_end_date)
  addListener("set-end-date-as-start-btn", "click", set_as_start)
  addListener("block-weeks", "change", block_end)
  addListener("add-block-to-list-btn", "click", add_block)

  diffStartDate = new DateBox("diff-start-date", "calc_difference");
  diffEndDate = new DateBox("diff-end-date", "calc_difference");
  calc_difference();

  calcStart = new DateBox("end-date-start", "calc_end_date");
  calcEnd = new Date()
  calc_end_date();

  blockStart = new DateBox("block-start-date", "block_end");
  blockEnd = new DateBox("block-end-date", "console.log");
}

function addListener(elem, type, fn) {
  document.getElementById(elem).addEventListener(type, fn);
}

function calc_difference() {
  var start = diffStartDate.value;
  var end = diffEndDate.value;
  var diff = end - start; //difference in milliseconds

  var days = diff / (1000 * 60 * 60 * 24);
  document.getElementById("days").innerHTML = days + ' days';

  var weeks = Math.floor(days / 7) //round to nearest whole number
  var weeks_days = days % 7;
  document.getElementById("weeks").innerHTML = weeks + ' weeks' + ' and ' + weeks_days + ' days';
}

function calc_end_date() {
  var start = calcStart.value;

  var weeks = document.getElementById("end-date-weeks").value;
  calcEnd = new Date(start.getTime() + (weeks * 7 * 24 * 60 * 60 * 1000));

  document.getElementById("end-date-start-out").innerHTML = start.toDateString();
  document.getElementById("end-date-end-out").innerHTML = calcEnd.toDateString();
}

function set_as_start() {
  calcStart.set(calcEnd);
}

function block_end() {
  var start = blockStart.value;
  var weeks = document.getElementById("block-weeks").value;
  var end = new Date(start.getTime() + ((weeks * 7 - 1) * 24 * 60 * 60 * 1000));
  blockEnd.set(end);
}
function add_block() {
  var start = blockStart.value;
  var weeks = document.getElementById("block-weeks").value;
  var end = blockEnd.value;
  var nextStart = new Date(start.getTime() + (weeks * 7 * 24 * 60 * 60 * 1000));

  var li = document.createElement("LI");
  var t = document.createTextNode(start.toDateString() + ' - ' + end.toDateString());
  li.appendChild(t);
  document.getElementById("block-list").appendChild(li);

  blockStart.set(nextStart);
}