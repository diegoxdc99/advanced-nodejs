process.stdout.write('\u001B[2J\u001B[0;0f');

const server = require('net').createServer();
let counter = 0;
let sockets = {};

function timestamp() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}}`;
}

server.on('connection', socket => {
  socket.id = counter++;


  console.log('client connected :)');
  socket.write('Prese type your name!');

  socket.on('data', data => {
    if(!sockets[socket.id]) {
      socket.name = data.toString().trim();
      socket.write(`Welcome ${socket.name}!\n`);
      sockets[socket.id] = socket;
      return;
    }
    Object.entries(sockets).forEach(([key, cs]) => {
      if (socket.id == key ) return;
      cs.write(`${socket.name}: ${timestamp()}`);
      cs.write(data + '\n\r');
    });
  });

  socket.on('end', () => {
    delete sockets[socket.id];
    console.log('Client disconnected :(');
  })

 // socket.setEncoding('utf8');
})

server.listen(23, () => console.log('server bound'));

// function saludar(mensaje, callback){
//   console.log('procesando algo muy teso');
//   process.nextTick(() => {
//     for(var i = 0; i<999999999; i++) {}
//     callback(null, mensaje)
//   });
// }

// saludar('hola', (err, mensaje) => {
//   console.log('me demoré pero terminé :(');
// })

// console.log('***ultima línea****');