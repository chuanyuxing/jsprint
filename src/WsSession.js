'use strict';

class WsSession{

    constructor(ws, api){
        this.api = api;
        this.messageQueue = [];
        this.ws = ws;                     
    }

    send(message){        
        if(!this.ws){
            throw new Error('WsSession is not a right state.');
        }
        console.log('request[' + this.api + ']:' + message);
        if (this.ws.readyState === 1) {
           
            switch(message.constructor){
            case 'test'.constructor:               
                this.ws.send(message);
                break;
            case [].constructor:
                this.ws.send(message.join('|'));
                break;
            case {}.constructor:
                this.ws.send(JSON.stringify(message));
                break;
            default:               
                this.ws.send(message);
            }
        }else{
            this.messageQueue.push(message);
        }
    }  

    close(){
        if(this.ws){
            console.log('close connection[' + this.api + ']');
            this.ws.close();
        }
    }

    onopen(){
        console.log('open connection[' + this.api + ']');
        while (this.messageQueue.length > 0) {
            this.ws.send(this.messageQueue.pop());
        }
    }

    onmessage(message){
        console.log('response[' + this.api + ']:' + message);
    }

    onclose(){
        console.log('close[' + this.api + ']');
    }

    onerror(message){
        console.log('error[' + this.api + ']:' + message);
    }       
}
export default WsSession;