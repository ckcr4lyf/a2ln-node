import zmq from 'zeromq';

/**
 * @typedef PairingServerProperties
 * @type {object}
 * @property {string} address - the address to bind the server to
 * @property {string} port - the port for the server to listen on
 * @property {string} notificationPublicKey - public key of the notification server
 * @property {string} notificationPort - port the notification server is listening on
 */

export class PairingServer {

    /**
     * @param {PairingServerProperties} options - Options for the pairing server
     */
    constructor(options){
        this.options = options;
        this.socket = new zmq.Reply();
    }

    /**
     * start binds the socket to the provided address & port and starts listening for connections
     * @returns a promise that resolves when the bind operation is complete.
     */
    start(){
        return this.socket.bind(`tcp://${this.options.address}:${this.options.port}`);
    }

}
