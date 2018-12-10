/**
 * Module dependencies.
 */
import K2Print from './K2Print';

/**
 * Create an instance of K2Print and 
 * bind it as a property of window object.
 */
const k2print = new K2Print();
if (typeof window !== 'undefined') {
    window.k2print = k2print;
}
export default k2print;

