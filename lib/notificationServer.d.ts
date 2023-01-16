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
    constructor(options: NotificationServerProperties);
    options: NotificationServerProperties;
    bound: boolean;
    socket: any;
    /**
     * bind() binds the socket to the provided address & port and starts listening for connections
     * @returns a promise that resolves when the bind operation is complete.
     */
    bind(): Promise<void>;
    /**
     * start() will begin listening for notifications on the socket.
     * for now, it will just log the data.
     * @returns void
     */
    start(): void;
    _listen(): Promise<void>;
    /**
     *
     * @param {'imageNotification'} event
     * @param {(imageNotificationData: { app: string, title: string, body: string, image: Buffer }) => void} listener
     * @returns {this}
     */
    on(event: 'imageNotification', listener: (imageNotificationData: {
        app: string;
        title: string;
        body: string;
        image: Buffer;
    }) => void): this;
}
export type CurveKeys = {
    publicKey: string;
    secretKey: string;
};
export type NotificationServerProperties = {
    /**
     * - the address to bind the server to
     */
    address: string;
    /**
     * - the port for the server to listen on
     */
    port: string;
    /**
     * - the predefined server keys. If not provided, they will be generated.
     */
    keys: CurveKeys | undefined;
};
import { EventEmitter } from "events";
