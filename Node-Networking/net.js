process.stdout.write('\u001B[2J\u001B[0;0f');

const server = require('net').createServer();
let counter = 0;
let sockets = {};

server.on('connection', socket => {
  socket.id = counter++;
  sockets[socket.id] = socket;

  console.log('client connected :)');
  socket.write('welcome new client!\n');

  socket.on('data', data => {
    socket.write(`${socket.id}: `);
    socket.write(data);
  });

  socket.on('end', () => {
    console.log('Client disconnected :(');
  })

  socket.setEncoding('utf8');
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