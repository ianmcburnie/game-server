var Tile = require('./Tile'),
    Terrain = require('./Terrain');

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}    

function Board(size) {
    this.size = size || 0;
    this.tiles = [];
    this.objects = {};

    for (var rowIdx = 0; rowIdx < this.size; rowIdx++) {
        this.tiles[rowIdx] = [];
        for (var colIdx = 0; colIdx < this.size; colIdx++) {
            this.tiles[rowIdx][colIdx] = new Tile(rowIdx, colIdx, Terrain.water);
        } 
    }
}

Board.prototype.putObject = function(object, tileId) {
    this.objects[object.id] = tileId || this.getRandomTile().id;
};

Board.prototype.deleteObject = function(object) {
    delete this.objects[object.id];
};

Board.prototype.getObject = function(object) {
    return this.objects[object.id];
};

Board.prototype.getTile = function(row, col) {
    return this.tiles[row][col];
};

Board.prototype.getRandomTile = function() {
    return this.tiles[getRandomInt(0,this.size - 1)][getRandomInt(0,this.size - 1)];
};

module.exports = Board;