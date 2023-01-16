import zmq from 'zeromq';
import { EventEmitter } from 'events';

export class PairingServer extends EventEmitter {
    constructor(options){
        super();
        this.options = options;
        this.bound = false;
        this.socket = new zmq.Reply();
    }

    async bind(){
        await this.socket.bind(`tcp://${this.options.address}:${this.options.port}`);
        this.bound = true;
        return;
    }

    start(){
        if (this.bound !== true){
            throw new Error("server not bound! please await .bind() first");
        }

        void this._listen();
        console.log('listening for pairing events');
        return;
    }

    async _listen(){
        // msg1 = IP, msg2 = client public key
        for await (const [msg1, msg2] of this.socket){
            console.log(msg1.toString(), msg2.toString());
            this.emit('pair', {
                ip: msg1.toString(),
                publickKey: msg2.toString(),
            });
            // TODO: client auth?
            await this.socket.send([this.options.notificationPort, this.options.notificationPublicKey]);
        }
    }

    on(event, listener){
        super.on(event, listener);
    }
}
