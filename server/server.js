const WebSocket = require('ws');

// Sur le fichier server/server.js écrire un serveur websocket en utilisant la librairie ws qui est expose sur le port 3050.
const server = new WebSocket.Server({ port: 3050 });

// A chaque connexion d’un client, le serveur doit faire un console.log New Connection
// Tous les events handlers doivent être des arrows functions
server.on('connection',  (socket) => {
    console.log('New Connection');

    // A chaque réception d’un message du client, le serveur doit faire un console.log New Message : [Le Message Reçu]. Example : New Message : Hello World !
    // Tous les events handlers doivent être des arrows functions
    socket.on('message',  (message) => {
    console.log('New Message : ', message.toString());
    });

    // A chaque déconnexion d’un client, le serveur doit faire un console.log Connection closed
    // Tous les events handlers doivent être des arrows functions
    socket.on('close',  () => {
    console.log('Connection closed');
    });
});
