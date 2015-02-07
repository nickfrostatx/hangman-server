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

Game.prototype.checkWinners = function(player) {
  var that = this;

  // Map of whether spaces win
  var winners = {};
  for (var i = 0; i < 9; i++) {
    winners[i] = false;
  };

  // See if every space in a given list of spaces matches player
  var check = function(spaces) {
    var isRow = true;
    for (var i = 0; i < spaces.length; i++) {
      if (that.spaces[spaces[i]] != player) {
        isRow = false;
        break;
      };
    };
    if (isRow) {
      for (var i = 0; i < spaces.length; i++) {
        winners[spaces[i]] = true;
      };
    };
  };

  // Surprisingly, this is simpler than manually setting up a bunch of loops

  // Rows
  check([0, 3, 6]);
  check([1, 4, 7]);
  check([2, 5, 8]);

  // Cols
  check([0, 1, 2]);
  check([3, 4, 5]);
  check([6, 7, 8]);

  // Diagonal
  check([0, 4, 8]);
  check([2, 4, 6]);

  // Create a list
  var winningSpaces = [];
  for (var i = 0; i < 9; i++) {
    if (winners[i]) {
      winningSpaces.push(i);
    };
  };

  if (winningSpaces.length == 0) {
    return false
  };

  return winningSpaces;
};

module.exports = function() {
  return new Game();
};
