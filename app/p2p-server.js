const websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

//peers= ws://localhost:5001,ws://localhost:5002
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new websocket.Server({ port: P2P_PORT });
    server.on('connection', (socket) => this.connectSocket(socket)); // event listener listening for connection event
    this.connectToPeers();
    console.log(`Listening for P2P connections on port ${P2P_PORT}`);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new websocket(peer);
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected');
    this.messageHandler(socket);
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  messageHandler(socket) {
    socket.on('message', (message) => {
      const data = JSON.parse(message);
      console.log('data', data);
    });
  }
}

module.exports = P2pServer;
