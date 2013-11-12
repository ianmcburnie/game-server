function Tile(row, col, terrain) {
    this.terrain = terrain;
    this.id = 't-'+row+'-'+col;
    this.row = row;
    this.col = col;
    //this.resources = {};
    //this.players = {};
}

module.exports = Tile;