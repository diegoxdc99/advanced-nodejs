//SErver
const dgram = require('dgram'); // modulo para los datagramas

const server = dgram.createSocket('udp4'); //crea el servidor

server.on('listening', () => console.log('UDP Server listening')); //evento de escucha

//evento cuando se manda un mensaje
// primer parametro mensaje, segundo información del que la envia
server.on('message', (msg, rinfo) => {
  console.log(`${rinfo.address}:${rinfo.port} - ${msg}`);
})

const PORT = 3333;
const HOST = '127.0.0.1';
server.bind(PORT, HOST); //para escuchar en este host y puerto


//Client


//crea un socket en diferente puerto cada segundo
// setInterval(() => {
//   const client = dgram.createSocket('udp4'); //crea un socket en un puerto diferente
//   client.send('Diego rocks', PORT, HOST, (err)=> {
//     if (err) throw err;

//     console.log('UDP message sent');
//     client.close();
//   });
// }, 1000)

// ejemplo básico para crear y enviar un datagram
// const client = dgram.createSocket('udp4'); //crea un socket en un puerto diferente
// client.send('Diego rocks', PORT, HOST, (err)=> {
//   if (err) throw err;

//   console.log('UDP message sent');
//   client.close();
// });

// enviando usando buffer, también se puede enviar un vector y no es necesario el inicio y el tamaño
const client = dgram.createSocket('udp4'); //crea un socket en un puerto diferente
const msg = Buffer.from('Diego rocks buffer');

client.send(msg, 0, msg.length, PORT, HOST, (err)=> {
  if (err) throw err;

  console.log('UDP message sent');
  client.close();
});
