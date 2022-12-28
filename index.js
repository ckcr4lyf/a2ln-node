import zmq from 'zeromq';
import { PairingServer } from './lib/pairingServer.js';

const keys = {
    publicKey: 'NrUa/J@7SEiev!<@y#bA::*2Uan:z+hV8dI&xcSX',
    secretKey: 'DZ74HqyFA#9(2<?w8o%NR+Z#1L?x*Dxz{(Y6%+=F'
}

// const zapHandler = new zmq.Reply();
// await zapHandler.bind("inproc://zeromq.zap.01");

const sockNotif = new zmq.Pull({
    curveServer: true,
    curveSecretKey: keys.secretKey,
    curvePublicKey: keys.publicKey,
    // zapDomain: "inproc://zeromq.zap.01",
    // zapEnforceDomain: false,
});

const sockPair = new zmq.Reply();
const sp2 = new PairingServer({
    address: '0.0.0.0',
    port: '31224',
    notificationPort: '6969',
    notificationPublicKey: keys.publicKey,
});

await sockNotif.bind("tcp://0.0.0.0:6969")
// await sockPair.bind("tcp://0.0.0.0:4444");

await sp2.bind();
sp2.start();

// (async() => {
//     for await (const [msg1, msg2] of sockPair) {
//         console.log(msg1.toString(), msg2.toString());
//         await sockPair.send([Buffer.from("6969"), Buffer.from(keys.publicKey)]);
//     }
// })();

(async() => {
    while (true){
        const msg = await sockNotif.receive();
        if (msg.length === 4){
            console.log(`[IMAGE] App: ${msg[0].toString()}, Title: ${msg[1].toString()}, Body: ${msg[2].toString()}`)
        } else {
            console.log(`App: ${msg[0].toString()}, Title: ${msg[1].toString()}, Body: ${msg[2].toString()}`)
        }
    }
})();
