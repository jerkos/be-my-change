import '../../home';

import * as SimpleDom from 'simpledom-component';
import './tagSelector.less';

export class TagSelector extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['TAG_SELECTOR_UPDATE'];
    }

    componentDidMount() {
        this.input.focus();
    }

    render() {
        return (
            <input type="text"
                   value={this.props.tags || this.state.tagsToCreate || ''}
                   ref={ref => this.input = ref}
                   onchange={e => {
                       this.store.updateState({tagsToCreate: e.target.value})
                   }}
            />
        );
    }
}