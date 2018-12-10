'use strict';

import WsSessionContainer from './WsSessionContainer';

/**
 * Class for access local printer.
 */
class K2Print{
    constructor(){  
        this._settings = {
            autoCleanUp:true,
            autoReconnect:true,
            host:'127.0.0.1',
            port:'55555',
            useSsl:false
        };   
        const protocol = this._settings.useSsl ? 'wss' : 'ws';
        const url = `${protocol}://${this._settings.host}:${this._settings.port}/`;
        this._ws_container = new WsSessionContainer(url);
    }

    reconfigure(args){
        if(this._ws_container){
            this._ws_container.destory();
        }       
        if(args){
            if( args.constructor !== {}.constructor){
                throw new Error('k2print expects a json object at arguments[0],as follows:\r\n' + JSON.stringify(this._settings));
            }
            Object.assign(this._settings,args);
        }  
        if(this._settings.autoCleanUp && typeof window !== 'undefined'){
            const k2p = this;
            const orginalHandler = window.onbeforeunload;
            window.onbeforeunload=function(event){  
                if(orginalHandler){
                    orginalHandler(event);     
                }    
                k2p.destory();               
            };           
        }
        const protocol = this._settings.useSsl ? 'wss' : 'ws';
        const url = `${protocol}://${this._settings.host}:${this._settings.port}/`;
        this._ws_container = new WsSessionContainer(url);
    }

    /**
     * get local printer list.
     */
    get_printers(callback){    
        if(!this._ws_container) return null; 
        const session = this._ws_container.openSession('get_printers');
        session.send('-');
        session.onmessage = function(message){
            if(callback) callback(message);
        };
        return session;
    }

    /**
     * perform printing in local pc. 
     */
    print_execute(args, callback){
        if(!this._ws_container) return null; 
        const session = this._ws_container.openSession('print_execute');
        session.send(args);
        session.onmessage = function(message){
            if(callback) callback(message);
        };
        return session;
    }

    download_file(args, callback){
        if(!this._ws_container) return null; 
        const session = this._ws_container.openSession('download_file');
        session.send(args);
        session.onmessage = function(message){
            if(callback) callback(message);
        };
        return session;
    }

    destory(){
        if(!this._ws_container) return; 
        this._ws_container.destory();
    }
}
export default K2Print;