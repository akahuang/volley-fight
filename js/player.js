function Player(number, name) {
  this.number = number;
  this.name = name;
  this.record_count = {};
  this.record_history = [];
}

Player.prototype.addRecord = function(action, result) {
  console.info("%s %s %s", this.name, action, result);
  this.record_history.push({action: action, result: result});
  if (!(action in this.record_count)) {
    this.record_count[action] = {};
  } 
  if (!(result in this.record_count[action])) {
    this.record_count[action][result] = 0;
  } 
  this.record_count[action][result] += 1;
}

Player.prototype.popRecord = function() {
  if (this.record_history == []) {
    alert('There is no record!');
    return;
  }
  record = this.record_history.pop();
  this.record_count[record.action][record.result] -= 1;
}
