import * as SimpleDom from 'simpledom-component';

/**
 * global state contained in the store is never affected
 * use instead a 'cstate' for common state shared by a
 * parent component and its children
 */
export class ParentComponent extends SimpleDom.Component {
    constructor(props, store) {
        super(props, store);
        this._cstate = {};
    }

    cstateSetter(obj, ...events) {
        this._cstate = {...this._cstate, ...obj};
        this.store.updateState({}, ...events);
    }

    cstateGetter() {
        return this._cstate;
    }

    get cstate() {
        return this._cstate;
    }

    set cstate(obj) {
        this._cstate = {...this._cstate, ...obj};
    }
}


export class ComposedComponent extends SimpleDom.Component {

    updateCState(obj, ...events) {
        this.props.parent.cstateSetter(obj, ...events);
    }

    get cstate() {
        return this.props.parent.cstateGetter();
    }
}