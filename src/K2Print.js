'use strict';

import WsSessionContainer from './WsSessionContainer';

/**
 * defining usable apis for jsprint.
 */
class K2Print {
    constructor() {  
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

    reconfigure(args) {
        this._ws_container && this._ws_container.destory();              
        if(args) {
            if( args.constructor !== {}.constructor){
                throw new Error('k2print expects a json object at arguments[0],as follows:\r\n' + JSON.stringify(this._settings));
            }
            Object.assign(this._settings, args);
        }  
        if(this._settings.autoCleanUp && typeof window !== 'undefined') {
            const k2p = this;
            const orginalHandler = window.onbeforeunload;
            window.onbeforeunload=function(event) {                  
                orginalHandler && orginalHandler(event);                    
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
    get_printers() {  
        const wsContainer =  this._ws_container;
        return new Promise(function(resolve,reject){
            const session = wsContainer.openSession('get_printers');
            session.send('-');
            session.onmessage = function(message) {
                resolve(message);
            };
            session.onerror = function(message) {
                reject(message);
            };
        });
    }

    /**
     * perform print in local pc. 
     */
    print_execute(args) {
        const wsContainer =  this._ws_container;
        return new Promise(function(resolve,reject){
            const session = wsContainer.openSession('print_execute');
            session.send(args);
            session.onmessage = function(message) {
                resolve(message);
            };
            session.onerror = function(message) {
                reject(message);
            };
        });
    }

    download_file(args) {
        const wsContainer =  this._ws_container;
        return new Promise(function(resolve,reject){
            const session = wsContainer.openSession('download_file');
            session.send(args);
            session.onmessage = function(message) {
                resolve(message);
            };
            session.onerror = function(message) {
                reject(message);
            };
        });
    }

    destory() {
        this._ws_container && this._ws_container.destory();
    }
}
export default K2Print;