/**
 * @typedef PairingServerProperties
 * @type {object}
 * @property {string} address - the address to bind the server to
 * @property {string} port - the port for the server to listen on
 */

export class PairingServer {

    /**
     * @param {PairingServerProperties} options - Options for the pairing server
     */
    constructor(options){
        this.options = options;
    }

}