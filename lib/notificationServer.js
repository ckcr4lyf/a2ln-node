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

        if (options.keys === undefined){
            options.keys = zmq.curveKeyPair();
        }

        this.options = options;
        this.bound = false;
        this.socket = new zmq.Pull({
            curveServer: true,
            curveSecretKey: options.keys.secretKey,
            curvePublicKey: options.keys.publicKey,
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

    /**
     * start() will begin listening for notifications on the socket.
     * for now, it will just log the data.
     * @returns void
     */
    start(){
        if (this.bound !== true){
            throw new Error("server not bound! please await .bind() first");
        }

        void this._listen();
        console.log('listening for notifications');
        return;
    }

    async _listen(){
        while(true){
            const data = await this.socket.receive();

            // This is with an image
            if (data.length === 4){
                // TODO: Events
                this.emit('imageNotification', {
                    app: data[0].toString(),
                    title: data[1].toString(),
                    body: data[2].toString(),
                    image: data[3],
                })
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

    /**
     * 
     * @param {'imageNotification'} event 
     * @param {(imageNotificationData: { app: string, title: string, body: string, image: Buffer }) => void} listener 
     * @returns {this}
     */
    on(event, listener){
        super.on(event, listener);
    }
}