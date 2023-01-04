import zmq from 'zeromq';
import { EventEmitter } from 'events';

/**
 * @typedef PairingServerProperties
 * @type {object}
 * @property {string} address - the address to bind the server to
 * @property {string} port - the port for the server to listen on
 * @property {string} notificationPublicKey - public key of the notification server
 * @property {string} notificationPort - port the notification server is listening on
 */

export class PairingServer extends EventEmitter {

    /**
     * @param {PairingServerProperties} options - Options for the pairing server
     */
    constructor(options){
        super();
        this.options = options;
        this.bound = false;
        this.socket = new zmq.Reply();
    }

    /**
     * bind() binds the socket to the provided address & port and starts listening for connections
     * @returns a promise that resolves when the bind operation is complete.
     */
    async bind(){
        await this.socket.bind(`tcp://${this.options.address}:${this.options.port}`);
        this.bound = true;
        return;
    }

    /**
     * start() will begint o listen for messages on the socket for pairing requests
     * and accept ANY/ALL speicication-valid pairing requests (NO CLIENT AUTH!!!)
     * @returns void
     */
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
            // TODO: emit an event with the IP, key?
            console.log(msg1.toString(), msg2.toString());
            this.emit('pair', {
                ip: msg1.toString(),
                publickKey: msg2.toString(),
            });
            // TODO: client auth?
            await this.socket.send([this.options.notificationPort, this.options.notificationPublicKey]);
        }
    }
}
