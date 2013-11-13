var WebSocketServer = require('ws').Server,
    Board = require('./Board'),
    Player = require('./Player'),
    wss = new WebSocketServer({port: 8080}),
    board = new Board(9),
    playerIdx = 0,
    players = {};

wss.broadcast = function(data, broadcaster) {
    for(var i in this.clients) {
        var client = this.clients[i];
        if (client !== broadcaster) {
            client.send(JSON.stringify(data));
        }
    }
};

wss.on('connection', function(ws) {
    var playerId = 'p-' + playerIdx++,
        player;

    console.log('clients', wss.clients.length);

    players[playerId] = player = new Player(playerId);

    board.putObject(player);

    ws.on('message', function onMessage(message) {
        var data = JSON.parse(message);
        console.log('onmessage', data);
        wss.broadcast({type: data.type, board: board, players: players, playerId: playerId}, ws);
    });

    ws.on('close', function onClose(code) {
        console.log('onclose', code);
        board.deleteObject(player);
        wss.broadcast({type:'leave', board: board, players: players, playerId: playerId, code: code}, ws);     
        delete players[playerId];
    });

    ws.send(JSON.stringify({type: 'init', board: board, players: players, playerId: playerId}));
    wss.broadcast({type: 'join', board: board, players: players, playerId: playerId}, ws);
});