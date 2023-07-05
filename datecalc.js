window.onload = initialise;

function initialise() {
  // event listeners
  addChangeListener("diff-start-date", calc_difference)
  addChangeListener("diff-end-date", calc_difference)
  addChangeListener("end-date-start", calc_end_date)
  addChangeListener("end-date-weeks", calc_end_date)

  addClickListener("set-end-date-as-start-btn", set_as_start)
  addClickListener("add-block-to-list-btn", add_block)

  // Set default values, after adding event listeners :)
  set_to_today('diff-start-date');
  set_to_today("diff-end-date");
  set_to_today('end-date-start');
  set_to_today('block-start-date');

}

function addListener(elem, type, fn) {
  document.getElementById(elem).addEventListener(type, fn);
}
function addChangeListener(elem, fn) {
  addListener(elem, "change", fn);
}
function addClickListener(elem, fn) {
  addListener(elem, "click", fn);
}

function hasChanged(element_id) {
  const ev = new Event('change');
  document.getElementById(element_id).dispatchEvent(ev);
}

function set_to_today(element_id) {
  var today = new Date();
  document.getElementById(element_id).value = today.toISOString().substring(0, 10);

  // const ev = new Event('change');
  // document.getElementById(element_id).dispatchEvent(ev);
  hasChanged(element_id);
}

function calc_difference() {
  var start = new Date(document.getElementById("diff-start-date").value);
  var end = new Date(document.getElementById("diff-end-date").value);
  var diff = end - start; //difference in milliseconds

  var days = diff / (1000 * 60 * 60 * 24);
  document.getElementById("days").innerHTML = days + ' days';

  var weeks = Math.floor(days / 7) //round to nearest whole number
  var weeks_days = days % 7;
  document.getElementById("weeks").innerHTML = weeks + ' weeks' + ' and ' + weeks_days + ' days';

}

function calc_end_date() {
  var start = new Date(document.getElementById("end-date-start").value);
  var weeks = document.getElementById("end-date-weeks").value;
  var end = new Date(start.getTime() + (weeks * 7 * 24 * 60 * 60 * 1000));

  document.getElementById("end-date-end").value = end.toISOString().substring(0, 10);
  document.getElementById("end-date-start-out").innerHTML = start.toDateString();
  document.getElementById("end-date-end-out").innerHTML = end.toDateString();
}

function set_as_start() {
  document.getElementById("end-date-start").value = document.getElementById("end-date-end").value;
  hasChanged("end-date-start");
}

function add_block() {
  var start = new Date(document.getElementById("block-start-date").value);
  var weeks = document.getElementById("block-weeks").value;
  var end = new Date(start.getTime() + (weeks * 7 * 24 * 60 * 60 * 1000) - (24 * 60 * 60 * 1000));
  var li = document.createElement("LI");
  var t = document.createTextNode(start.toDateString() + ' - ' + end.toDateString());
  li.appendChild(t);
  document.getElementById("block-list").appendChild(li);
  document.getElementById("block-start-date").value = end.toISOString().substring(0, 10);
  // calc_end_date();
}