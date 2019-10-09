class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == undefined)
            throw new Error();
        else {
            this.config = config;
            this.current = config.initial;
            this.history = [];
            this.undoHistory = [];
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.current;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.history.push(this.current);
            this.current = state;
            this.undoHistory = [];
        }
        else
            throw new Error;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.current].transitions[event]) {
            this.history.push(this.current);
            this.current = this.config.states[this.current].transitions[event];
            this.undoHistory = [];
        }
        else
            throw new Error;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.current = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = [];
        if (event == null) {
            for (let key in this.config.states) {
                arr.push(key);
            }
            return arr;
        } else {
            for (let key in this.config.states) {
                if (this.config.states[key].transitions[event]) {
                    arr.push(key);
                }
            }
            return arr;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length > 0) {
            this.undoHistory.push(this.current);
            this.current = this.history.pop();
            return true;
        }
        else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.undoHistory.length > 0) {
            this.history.push(this.current);
            this.current = this.undoHistory.pop();
            return true;
        }
        else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.undoHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
