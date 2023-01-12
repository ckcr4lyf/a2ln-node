import { PairingServer } from '../lib/pairingServer.js';
import { NotificationServer } from '../lib/notificationServer.js';

const keys = {
    publicKey: 'NrUa/J@7SEiev!<@y#bA::*2Uan:z+hV8dI&xcSX',
    secretKey: 'DZ74HqyFA#9(2<?w8o%NR+Z#1L?x*Dxz{(Y6%+=F'
}

const sn2 = new NotificationServer({
    address: '0.0.0.0',
    port: '6969',
    keys: keys,
});

const sp2 = new PairingServer({
    address: '0.0.0.0',
    port: '31224',
    notificationPort: sn2.options.port,
    notificationPublicKey: sn2.options.keys.publicKey,
});

await sp2.bind();
await sn2.bind();
sp2.start();
sn2.start();

sp2.on('pair', pairData => {
    console.log('got pairing event', pairData);
});

sn2.on('imageNotification', inData => {
    console.log(`got image notification! app: ${inData.app}, title: ${inData.title}, body: ${inData.body}`);
})
