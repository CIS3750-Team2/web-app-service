class Storage {
    constructor(prefix) {
        this.prefix = prefix + '_';
        this.engine = localStorage;
    }

    // generic methods

    makeKey = (key) => `${this.prefix}${key}`;

    serialize = (data) => JSON.stringify(data);

    deserialize = (data) => JSON.parse(data);

    set = (key, value) => {
        if (!key) return false;

        try {
            this.engine.setItem(this.makeKey(key), this.serialize(value));
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    get = (key) => {
        if (!key) return undefined;
        try {
            return this.deserialize(this.engine.getItem(this.makeKey(key)));
        } catch(err) {
            console.error(err);
            return undefined;
        }
    };
}

const instance = new Storage('ZOOM_v1');

/**
 * Creates a redux middleware that will store a portion of the state into local storage
 * @param prop The portion of the state that should be saved
 * @returns {function(*=): function(*): function(*=): *} Redux ready middleware
 */
const getMiddleware = (prop) => (store) => (next) => (action) => {
    const prev = store.getState()[prop];
    const result = next(action);
    const value = result[prop];

    if (prev !== value) {
        instance.set(`state_${prop}`, value);
    }

    return result;
};

const getInitial = (prop) => instance.get(`state_${prop}`);

export {
    getMiddleware as storedStateMiddleware,
    getInitial as getStoredState,
    instance as default
};
