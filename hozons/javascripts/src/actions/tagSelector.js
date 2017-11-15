import '../home';

import * as SimpleDom from 'simpledom-component';
import './tagSelector.less';

export class TagSelector extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['TAG_SELECTOR_UPDATE'];
    }

    render() {
        return (
            <div class="row">
                <div class="tag-selector">
                    <div class="tag-selector-input">
                        <input type="text"
                               value={this.props.tags || this.state.tagsToCreate || ''}
                               onchange={e => {
                                   this.store.updateState({tagsToCreate: e.target.value})
                               }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}