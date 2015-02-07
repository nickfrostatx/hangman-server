var events = require('events');
var game = require('./game');

var waiting = null;

var Player = function() {
  this.emitter = new events.EventEmitter();
  this.playerID = null;
  this.opponent = null;
  this.game = null;
};

Player.prototype.postConnect = function() {
  if (waiting === null) {
    waiting = this;
  } else {
    var g = game();
    var opponent = waiting;
    this.newGame(2, opponent, g);
    opponent.newGame(1, this, g);
    waiting = null;
  };
};

Player.prototype.disconnect = function() {
  if (this.opponent === null) {
    waiting = null;
  } else {
    waiting = this.opponent;
    this.opponent.playerID = null;
    this.opponent.opponent = null;
    this.opponent.game = null;
    this.opponent.emitter.emit('opponent left');
  };
};

Player.prototype.newGame = function(playerID, opponent, game) {
  this.playerID = playerID;
  this.opponent = opponent;
  this.game = game;

  this.emitter.emit('newgame', playerID);
};

Player.prototype.move = function(space) {
  if (!this.game.move(this.playerID, space)) {
    return false;
  };

  this.opponent.emitter.emit('move', space);
};



module.exports = function() {
  return new Player();
};
