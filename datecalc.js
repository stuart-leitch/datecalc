function initialise() {
  set_to_today('diff-start-date');
  set_to_today("diff-end-date");
  set_to_today('end-start-date');
  set_to_today('block-start-date');
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
  var start = new Date(document.getElementById("end-start-date").value);
  var weeks = document.getElementById("end-weeks").value;
  var end = new Date(start.getTime() + (weeks * 7 * 24 * 60 * 60 * 1000));
  document.getElementById("end-date").innerHTML = end.toDateString();
}

function set_as_start() {
  var end = new Date(document.getElementById("end-date").innerHTML);
  document.getElementById("end-start-date").value = end.toISOString().substring(0, 10);
  calc_end_date();
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
  calc_end_date();
}
function set_to_today(element_id) {
  var today = new Date();
  document.getElementById(element_id).value = today.toISOString().substring(0, 10);

  const ev = new Event('change');
  document.getElementById(element_id).dispatchEvent(ev);
}