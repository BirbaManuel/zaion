// const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:3050');

socket.addEventListener('open', function (event) {
  socket.send('Salut serveur, je suis connecté !');
});

socket.addEventListener('message', function (event) {
  console.log('Message reçu du serveur : ', event.data);
});

socket.addEventListener('error', function (event) {
  console.error('WebSocket erreur : ', event);
});

socket.addEventListener('close', function (event) {
  console.log('WebSocket est déconnecté');
});

function decodeBase64(str) {
  const base64 = str.split(',')[1]; // Récupère la partie encodée en base64 après la virgule
  const decoded = atob(base64); // Décodage base64
  return decoded;
}

function sendFiles() {
  const fileInputs = document.querySelectorAll('input[type=file]');
  const files = [];

  // Parcourir les inputs de type file pour récupérer les fichiers sélectionnés
  fileInputs.forEach((input) => {
    if (input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        files.push(input.files[i]);
      }
    }
  });

  // Si des fichiers ont été sélectionnés, on les envoie via WebSocket
  if (files.length > 0) {
    for (let file of files ) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', (event) => {
			const content = event.target.result;
			console.log(decodeBase64(content));
			const fileData = {
			name: file.name,
			type: file.type,
			data: decodeBase64(content)
			};
        	const res = JSON.stringify(fileData);
			socket.send(fileData.data);
		});
      }

    // A la réception d'un message du serveur WebSocket, on affiche le message dans la console du navigateur
    socket.addEventListener('message', (event) => {
      console.log('Message reçu du serveur :', event.data);
    });
  }
}

