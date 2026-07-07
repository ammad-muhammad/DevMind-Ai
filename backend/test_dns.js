const dns = require('dns');

console.log('Testing SRV and TXT lookup for clustrer0.9whiqxj.mongodb.net');
dns.resolveSrv('_mongodb._tcp.clustrer0.9whiqxj.mongodb.net', (err, addresses) => {
  if (err) console.error('SRV Error for clustrer0:', err.message);
  else console.log('SRV Success for clustrer0:', addresses);
});

dns.resolveTxt('clustrer0.9whiqxj.mongodb.net', (err, records) => {
  if (err) console.error('TXT Error for clustrer0:', err.message);
  else console.log('TXT Success for clustrer0:', records);
});

console.log('Testing SRV and TXT lookup for cluster0.9whiqxj.mongodb.net');
dns.resolveSrv('_mongodb._tcp.cluster0.9whiqxj.mongodb.net', (err, addresses) => {
  if (err) console.error('SRV Error for cluster0:', err.message);
  else console.log('SRV Success for cluster0:', addresses);
});

dns.resolveTxt('cluster0.9whiqxj.mongodb.net', (err, records) => {
  if (err) console.error('TXT Error for cluster0:', err.message);
  else console.log('TXT Success for cluster0:', records);
});
