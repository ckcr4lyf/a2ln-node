import zmq from 'zeromq';
import { EventEmitter } from 'events';

/**
 * @typedef CurveKeys
 * @type {object}
 * @property {string} publicKey
 * @property {string} secretKey
 */

/**
 * @typedef NotificationServerProperties
 * @type {object}
 * @property {string} address - the address to bind the server to
 * @property {string} port - the port for the server to listen on
 * @property {CurveKeys | undefined} keys - the predefined server keys. If not provided, they will be generated.
 */

export class NotificationServer extends EventEmitter {

    /**
     * @param {NotificationServerProperties} options - Options for the notification server
     */
    constructor(options){
        super();

        const keys = options.keys || zmq.curveKeyPair();

        this.options = options;
        this.bound = false;
        this.socket = new zmq.Pull({
            curveServer: true,
            curveSecretKey: keys.secretKey,
            curvePublicKey: keys.publicKey,
        });
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

    async _listen(){
        while(true){
            const data = await this.socket.receive();

            // This is with an image
            if (data.length === 4){
                // TODO: Events
                console.log(`[IMAGE] App: ${data[0].toString()}, Title: ${data[1].toString()}, Body: ${data[2].toString()}`)
            } else if (data.length === 3){
                // TODO: Events
                console.log(`App: ${data[0].toString()}, Title: ${data[1].toString()}, Body: ${data[2].toString()}`)
            } else {
                // Fucked up
                console.log(`ERROR! Recevied data of length: ${data.length}`);
            }
        }
    }
}