import WsSession from './WsSession';

'use strict';
class WsSessionContainer{
    constructor(baseUrl){
        this._baseUrl = baseUrl;
        this._sessions = new Map();
    }

    openSession(api){  
        console.log('request api:' + api);      
        if(this._sessions.has(api)){
            return this._sessions.get(api);
        }      
        const url = this._baseUrl + (this._baseUrl.endsWith('/') ?  api : '/'+api);
        console.log('Open web socket from:' + url);
        const ws = new WebSocket(url);
        const session = new WsSession(ws, api);    
        ws.onopen = function(){
            session.onopen();
        };
        ws.onmessage = function(event){          
            session.onmessage(event.data);
        };
        ws.onerror = function(error){
            session.onerror(error);
        };    
        ws.onclose = function(){
            this._sessions.delete(api);
            session.onclose();
        };
        this._sessions.set(api, session);
        return session;
    }

    closeSession(api){
        if(this._sessions.has(api)){
            this._sessions.get(api).close();
        }
    }
    
    destory(){
        for (let session of this._sessions.values()){
            session.close();
        }
    }
}
export default WsSessionContainer;