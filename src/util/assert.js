export function assert (condition, message) {
    if (!condition) {
        throw new Error(`[k2print] ${message}`);
    }
}