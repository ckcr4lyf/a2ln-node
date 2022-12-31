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
