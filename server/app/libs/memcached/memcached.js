const Memcached = require('memcache-plus');

const SERVER_ADDR = '127.0.0.1';
const SERVER_PORT = '11211';


let client = null;

exports.connect = () => {
    client = new Memcached({
        // Specify 2 hosts
        hosts: [`${SERVER_ADDR}:${SERVER_PORT}`],
        // Decrease the netTimeout from the 500ms default to 200ms
        netTimeout: 200,
        // reconnect: false,
        backoffLimit: 10,
        bufferBeforeError: 1,
        queue: false,
        // disabled: true,
        onNetError: () => {
        }
    });
}

exports.get = async (key) => {
    try {
        return await client.get(key);
    } catch (e) {
        return null;
    }
}

exports.set = async (key, value, lifitime = 10) => {
    try {
        await client.set(key, value, lifitime);
    } catch (e) {

    }
}
