import K2Print from '../../src/K2Print';
describe('K2Print.js', () => {
    it('has a function named get_printers that returns a Promise value', () => {
        const k2print = new K2Print();
        expect(typeof k2print.get_printers).toBe('function')
        expect(k2print.get_printers()).toEqual(jasmine.any(Promise))
    })

    it('has a function named print_execute that returns a Promise value', () => {
        const k2print = new K2Print();
        expect(typeof k2print.print_execute).toBe('function')
        expect(k2print.print_execute()).toEqual(jasmine.any(Promise))
    })

    it('has a function named download_file that returns a Promise value', () => {
        const k2print = new K2Print();
        expect(typeof k2print.download_file).toBe('function')
        expect(k2print.download_file()).toEqual(jasmine.any(Promise))
    })
})