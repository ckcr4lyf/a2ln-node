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
    }

}