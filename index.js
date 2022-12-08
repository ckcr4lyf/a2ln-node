import zmq from 'zeromq';

const keys = zmq.curveKeyPair();

const sockNotif = new zmq.Reply({
    curveServer: true,
    curveSecretKey: keys.secretKey,
    curveServerKey: keys.publicKey,
});

const sockPair = new zmq.Reply();

await sockNotif.bind("tcp://0.0.0.0:23045")
await sockPair.bind("tcp://0.0.0.0:4444");

for await (const [msg1, msg2] of sockPair) {
    console.log(msg1.toString(), msg2.toString());
    await sockPair.send(["23045", keys.publicKey]);
}

for await (const [msg] of sockNotif){
    console.log(msg);
}