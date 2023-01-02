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
    constructor(options: PairingServerProperties);
    options: PairingServerProperties;
    bound: boolean;
    socket: any;
    /**
     * bind() binds the socket to the provided address & port and starts listening for connections
     * @returns a promise that resolves when the bind operation is complete.
     */
    bind(): Promise<void>;
    /**
     * start() will begint o listen for messages on the socket for pairing requests
     * and accept ANY/ALL speicication-valid pairing requests (NO CLIENT AUTH!!!)
     * @returns void
     */
    start(): void;
    _listen(): Promise<void>;
}
export type PairingServerProperties = {
    /**
     * - the address to bind the server to
     */
    address: string;
    /**
     * - the port for the server to listen on
     */
    port: string;
    /**
     * - public key of the notification server
     */
    notificationPublicKey: string;
    /**
     * - port the notification server is listening on
     */
    notificationPort: string;
};
//# sourceMappingURL=pairingServer.d.ts.map