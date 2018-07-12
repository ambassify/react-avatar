export default
class InternalState {

    constructor() {
        this.sourcePointer = 0;
        this.active = true;
        this.fetch = null;
    }

    isActive(state = {}) {
        // Internal state has been reset => we received new props
        if (state.internal !== this)
            return false;

        if (!this.fetch)
            return false;

        if (this.active !== true)
            return false;

        return true;
    }
}
