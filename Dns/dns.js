const dns = require('dns');

// obtiene la IP usando libuv
// dns.lookup('www.pragma.com.co', (err, address) => {
//   console.log('primera ' + address);
// });

// obtiene la dirección IPv4
// dns.resolve4('google.com', (err, address) => {
//   console.log('segunda ' + address);
// });


// Segundo parametro es el tipo de registro A, MX
// dns.resolve('pluralsight.com', 'MX', (err, address) => {
//   console.log(address);
// });

// obtiene la url o host de una ip
dns.reverse('172.217.28.110', (err, hostnames) => {
  console.log(hostnames);
});



