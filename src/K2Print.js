'use strict';

import Browser from './util/Browser';
import WsSessionContainer from './WsSessionContainer';

/**
 * defining usable apis for jsprint.
 */
class K2Print {

    constructor(settings) {  
        this._settings = settings || {
            autoCleanUp:true,
            host:'127.0.0.1',
            port:'55555',
            secure:false
        };   
        const protocol = this._settings.secure ? 'wss' : 'ws';
        const url = `${protocol}://${this._settings.host}:${this._settings.port}/`;
        this._ws_container = new WsSessionContainer(url);
    }

    reconfigure(settings) {
        this._ws_container && this._ws_container.destory();              
        if(settings) {
            if( settings.constructor !== {}.constructor){
                throw new Error('k2print expects a json object at arguments[0],as follows:\r\n' + JSON.stringify(this._settings));
            }
            Object.assign(this._settings, settings);
        }  
        if(this._settings.autoCleanUp && Browser.inBrowser()) {
            const k2p = this;
            const orginalHandler = window.onbeforeunload;
            window.onbeforeunload=function(event) {                  
                orginalHandler && orginalHandler(event);                    
                k2p.destory();               
            };           
        }
        const protocol = this._settings.secure ? 'wss' : 'ws';
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
                resolve(JSON.parse( message || '{}'));
            };
            session.onerror = function(message) {
                reject(JSON.parse( message || '{}'));
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
                resolve(JSON.parse( message || '{}'));
            };
            session.onerror = function(message) {
                reject(JSON.parse( message || '{}'));
            };
        });
    }

    download_file(args) {
        const wsContainer =  this._ws_container;
        return new Promise(function(resolve,reject){
            const session = wsContainer.openSession('download_file');
            session.send(args);
            session.onmessage = function(message) {
                resolve(JSON.parse( message || '{}'));
            };
            session.onerror = function(message) {
                reject(JSON.parse( message || '{}'));
            };
        });
    }

    destory() {
        this._ws_container && this._ws_container.destory();
    }
}
export default K2Print;