import zmq from 'zeromq';
import { EventEmitter } from 'events';


export class NotificationServer extends EventEmitter {
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
        console.log('listening for notifications');
        return;
    }

    async _listen(){
        while(true){
            const data = await this.socket.receive();

            // This is with an image
            if (data.length === 4){
                this.emit('imageNotification', {
                    app: data[0].toString(),
                    title: data[1].toString(),
                    body: data[2].toString(),
                    image: data[3],
                })
            } else if (data.length === 3){
                this.emit('textNotification', {
                    app: data[0].toString(),
                    title: data[1].toString(),
                    body: data[2].toString(),
                })
            } else {
                // Fucked up
                console.log(`ERROR! Recevied data of length: ${data.length}`);
            }
        }
    }

}