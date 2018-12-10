'use strict';

class WsSession{

    constructor(ws, api) {
        this._api = api;
        this._messageQueue = [];
        this._ws = ws;                     
    }

    send(message) {    
            
        if (!this._ws) {
            throw new Error('WsSession is not a right state.');
        }

        console.log('request[' + this._api + ']:' + message);

        if (this._ws.readyState === 1) {
           
            switch (message.constructor) {
                case 'test'.constructor:               
                    this._ws.send(message);
                    break;
                case [].constructor:
                    this._ws.send(message.join('|'));
                    break;
                case {}.constructor:
                    this._ws.send(JSON.stringify(message));
                    break;
                default:               
                    this._ws.send(message);
            }
        } else {
            this._messageQueue.push(message);
        }
    }  

    close() {
        if (this._ws) {
            console.log('close connection[' + this._api + ']');
            this._ws.close();
        }
    }

    onopen() {
        console.log('open connection[' + this._api + ']');
        while (this._messageQueue.length > 0) {
            this._ws.send(this._messageQueue.pop());
        }
    }

    onmessage(message) {
        console.log('response[' + this._api + ']:' + message);
    }

    onclose() {
        console.log('close[' + this._api + ']');
    }

    onerror(message) {
        console.log('error[' + this._api + ']:' + message);
    }       
}
export default WsSession;