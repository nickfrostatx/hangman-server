var Game = function() {
  this.spaces = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.turn = 1;
};

Game.prototype.move = function(player, space) {
  if (this.turn != player) {
    return false;
  };
  if (isNaN(space) || space < 0 || space > 8 || this.spaces[space] != 0) {
    return false;
  };
  this.spaces[space] = player;
  this.turn = (this.turn == 1) ? 2 : 1;
  return true;
};

module.exports = function() {
  return new Game();
};
