import '../home';
const moment = require('moment')
const flatpickr = require('flatpickr');
require('moment/locale/fr');
require('../css/steps.less');
require('../css/tooltips.less');
require('../css/popovers.less');
import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from '../components/veil/veil';
import { ComposedComponent, ParentComponent } from '../composedComponent'
import './createAction.less'

class CreateActionStep1 extends ComposedComponent {
    eventsToSubscribe() {
        return ['STEP1_REFRESH'];
    }
    render() {
        return (
            <div>
                <h3>Première étape <small>ça ne sera pas long...</small></h3>
                <div class="row">
                    <p style="font-size: 1.2em;">Quel est le titre de votre nouvelle action ?</p>
                    <div class="input-field col s12" style="margin-top: -10px">
                        <input
                            type="text"
                            placeholder="le titre de votre nouvelle action !"
                            value={this.cstate.actionTitle || ''}
                            onchange={e => this.updateCState({ actionTitle: e.target.value })}
                        />
                        {SimpleDom.predicate(
                            !!this.cstate.errorTitle,
                            () => <p class="red-text" style="margin-top: -10px">{this.cstate.errorTitle}</p>
                        )}
                    </div>
                </div>
                <div class="row">
                    <p style="font-size: 1.2em;">Quelques mots pour décrire votre action ou évènement</p>
                    <div class="input-field col s12" style="margin-top: -10px">
                        <textarea class="materialize-textarea"
                            onchange={e => this.updateCState({ actionDescription: e.target.value })}
                            placecholder={!!this.cstate.actionDescription ? undefined : "Entrez une description innovante..."}
                        >{this.cstate.actionDescription}</textarea>
                    </div>
                    {SimpleDom.predicate(
                        !!this.cstate.errorDescription,
                        () => <p class="red-text" style="margin-top: -15px">{this.cstate.errorDescription}</p>
                    )}
                </div>
                <div class="row">
                    <p style="font-size: 1.2em;">Choisissez une image !
                        {SimpleDom.predicate(!!this.cstate.actionImageUrl,
                            () => <img src={this.cstate.actionImageUrl} class="responsive-img" />
                        )}
                    </p>
                    <div class="input-field col s12" style="margin-top: -10px">
                        <input
                            type="url"
                            placeholder="l'image de votre action !"
                            value={this.cstate.actionImageUrl || ''}
                            onchange={e => this.updateCState({ actionImageUrl: e.target.value })}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="popover popover-right">
                        <button class="right btn"
                            onclick={e => {
                                let hasError = false;
                                let errors = {};
                                if (! !!this.cstate.actionTitle) {
                                    hasError = true;
                                    errors = { ...errors, errorTitle: 'Titre vide !' };
                                }
                                if (! !!this.cstate.actionDescription) {
                                    hasError = true;
                                    errors = { ...errors, errorDescription: 'Description vide !' };
                                }
                                if (hasError) {
                                    this.updateCState({
                                        errorDescription: errors.errorDescription,
                                        errorTitle: errors.errorTitle
                                    }, 'STEP1_REFRESH')
                                } else {
                                    this.updateCState({ currStep: 2 }, 'CHANGE_STATE');
                                }
                            }}>Passer à la suite</button>
                    </div>
                </div>
            </div>
        );
    }
}

class TagSelector extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['TAG_SELECTOR_UPDATE'];
    }

    constructor(props, store) {
        super(props, store);

        this.currentTagRank = 1;
        this.tagsByRank = {};
        this.selectedTagByRank = {};

        // results
        this.store.updateState({
            tagSlugToCreate: '',
            tagsToCreate: []            
        })
    }

    componentDidMount() {
        withVeilAndMessages(
            fetchJsonData(`/users/tags/all?rank=${this.currentTagRank}`),
            true
        ).then(tags => {
            this.tagsByRank[this.currentTagRank] = tags;
            const self = this;
            Object.keys(this.tagsByRank).forEach(rank => {
                const tagsRanked = this.tagsByRank[rank];
                const tagsIds = {};
                tagsRanked.forEach(t => tagsIds[t.name] = null);
                $(`#autocomplete-input-${rank}`).autocomplete({
                    data: tagsIds,
                    limit: 20,
                    onAutocomplete: function(val) {
                        let slug = self.state.tagSlugToCreate;
                        
                        if (self.currentTagRank > rank ) {
                            for(let i = +rank + 1; i <= self.currentTagRank; ++i) {
                                delete self.tagsByRank[i];
                                self.store.updateState({
                                    tagSlugToCreate: slug.split('-').slice(0, -1).join('-')
                                });
                            }
                            self.currentTagRank = rank;
                            self.store.updateState({}, 'TAG_SELECTOR_UPDATE');
                            return;
                        }
                        self.selectedTagByRank[rank] = val;

                        // update path;
                        self.store.updateState({
                            tagSlugToCreate: slug += (slug ? '-' : '') + self.tagsByRank[rank].find(tag => tag.name === val).id
                            
                        });
                        
                        self.currentTagRank = +rank + 1;
                        self.tagsByRank[self.currentTagRank] = undefined;
                        self.store.updateState({}, 'TAG_SELECTOR_UPDATE');
                    },
                    minLength: 1
                });
                $(`#autocomplete-input-${rank}`).on('blur', function(event) {
                    if (!self.selectedTagByRank[rank]) {
                        self.selectedTagByRank[rank] = event.target.value;
                        self.currentTagRank = +rank + 1;
                        self.store.updateState({
                            tagsToCreate: tagsToCreate.concat([{
                                name: event.target.value,
                                parentId: +(self.state.tagSlug.split('-').slice(-1)[0])
                            }]),
                            tagSlugToCreate: self.state.tagSlugToCreate += '-0'
                        })
                        self.tagsByRank[self.currentTagRank] = undefined;
                        self.store.updateState({}, 'TAG_SELECTOR_UPDATE');
                    }
                });
            });
        })
    }

    render() {
        return (
            <div class="row">
                <div class="tag-selector">
                <div class="input-field tag-selector-input">
                    <i class="material-icons prefix">textsms</i>
                    <input 
                        type="text" 
                        id={`autocomplete-input-${1}`} 
                        class="autocomplete" 
                        value={this.selectedTagByRank[1]}/>
                        <label 
                            class={this.selectedTagByRank[1] ? 'active' : undefined}
                            for="autocomplete-input">{`Tag Rang ${1}`}
                        </label>
                </div>
                {Object.keys(this.tagsByRank).filter(rank => rank > 1).map((rank, i) => {
                    return (
                        [   <span class="lnr lnr-chevron-right tag-selector-separator">
                            </span>,
                            <div class="input-field tag-selector-input">
                            <input 
                                type="text" 
                                id={`autocomplete-input-${rank}`} 
                                class="autocomplete" 
                                value={this.selectedTagByRank[rank]}/>
                            <label 
                                class={this.selectedTagByRank[rank] ? 'active' : undefined}
                                for="autocomplete-input">{`Tag Rang ${rank}`}
                            </label>
                        </div>
                        ]
                    );
                })}
                <span class="lnr lnr-plus-circle tag-selector-plus"
                    onclick={event => {
                         //this.selectedTagByRank[this.currentTagRank] = val;
                         if (!this.selectedTagByRank[self.currentTagRank]) {
                             return;
                         }
                         this.currentTagRank += 1;
                         this.tagsByRank[self.currentTagRank] = undefined;
                         this.store.updateState({}, 'TAG_SELECTOR_UPDATE');
                    }}
                >
                </span>
               </div>
            </div>
        );
    }
}


class CreateActionStep2 extends ComposedComponent {

    eventsToSubscribe() {
        return ['STEP2_REFRESH'];
    }

    handleActionTypeChange(event) {
        this.updateCState({ actionType: event.target.value });
    }
    componentDidMount() {
        $('.action-type').material_select();
        $('.action-type').on('change', this.handleActionTypeChange);
    }

    render() {
        console.log(this.cstate)
        return (
            <div>
                <h3>Dans le vif du sujet</h3>
                <div class="row">
                    <p style="font-size: 1.2em">Classifier votre action ?</p>
                    <div class="col s12">
                        {<TagSelector />}
                    </div>
                </div>
                <div class="row">
                    <p style="font-size: 1.2em">Votre action est-publique ?</p>
                    <div class="input-field col s12" style="margin-top: -10px">
                        <div class="switch">
                            <label>
                                Non
                            <input type="checkbox"
                                    checked={(this.cstate.isPublic || false) ? true : undefined}
                                    onchange={e => {
                                        this.updateCState({ isPublic: !(this.cstate.isPublic || false) })
                                    }} />
                                <span class="lever"></span>
                                Oui
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row" style="padding-top: 50px;">
                    <a class="left hbtn"
                        onclick={e => {
                            this.updateCState({ currStep: 1 }, 'CHANGE_STATE');
                        }}>Retour en arrière</a>
                    <a class="right hbtn"
                        onclick={e => {
                            this.updateCState({ currStep: 3 }, 'CHANGE_STATE');
                        }}>Passer à la fin</a>
                </div>
            </div>
        );
    }
}


class CreateActionStep3 extends ComposedComponent {
    eventsToSubscribe() {
        return ['STEP3_REFRESH'];
    }

    componentDidMount() {
        flatpickr('.flatpicker-starter');
    }

    render() {
        return (
            <div>
                <div class="row">
                    <p>Combien de temps durera votre action (récurrence quotidienne ?):
                        <span style="padding-left: 10px">
                            <em>{`${this.cstate.actionDuration} jours`}</em>
                        </span>
                    </p>
                    <p class="range-field">
                        <input type="range"
                            value={this.cstate.actionDuration || 21}
                            onchange={e => this.updateCState({ actionDuration: e.target.value }, 'STEP3_REFRESH')} min="0" max="30"
                        />
                    </p>
                </div>
                <div class="row">
                    <p> Quand souhaitez-vous commencer votre action ?</p>
                    <input type="date" class="flatpicker-starter" onchange={e => this.updateCState({ startDate: e.target.value })} />
                </div>
                <div class="row">
                    <button class="left btn"
                        onclick={e => {
                            this.updateCState({ currStep: 2 }, 'CHANGE_STATE');
                        }}>Retour en arrière</button>
                    <button class="right btn"
                        onclick={e => {
                            withVeilAndMessages(
                                window.fetchJsonData('/users/actions/create',
                                    {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            ...this.cstate, 
                                            tagSlugToCreate: this.state.tagSlugToCreate,
                                            tagsToCreate: this.state.tagsToCreate
                                        })
                                    }).then(console.log('action properly saved !'))
                            )
                            console.log('action to be created');
                        }}>Créer la nouvelle action</button>
                </div>
            </div>
        );
    }
}

class Step extends SimpleDom.Component {
    render() {
        return (
            <ul class="step">
                <li class={`step-item ${this.props.currStep === 1 ? 'active' : undefined}`}>
                    <a href="#" class="tooltip" data-tooltip="Description de votre nouvelle action"></a>
                </li>
                <li class={`step-item ${this.props.currStep === 2 ? 'active' : undefined}`}>
                    <a href="#" class="tooltip" data-tooltip="Step 2"></a>
                </li>
                <li class={`step-item ${this.props.currStep === 3 ? 'active' : undefined}`}>
                    <a href="#" class="tooltip" data-tooltip="Step 3"></a>
                </li>
            </ul>
        );
    }


}


export class CreateAction extends ParentComponent {
    constructor(props, store) {
        super(props, store);
    }

    eventsToSubscribe() {
        return ['CHANGE_STATE'];
    }

    render() {
        let stepDiv = null;
        switch (this.cstate.currStep) {
            case 1:
            case undefined:
                stepDiv = <CreateActionStep1 parent={this} />
                break;
            case 2:
                stepDiv = <CreateActionStep2 parent={this} />
                break;
            case 3:
                stepDiv = <CreateActionStep3 parent={this} />
                break;
        }
        return (
            <div id="top" class="action">
                <div class="row">
                    <Step currStep={this.cstate.currStep || 1} />
                </div>
                <div class="row">
                    <div class="col s12">
                        {stepDiv}
                    </div>
                </div>
            </div>
        );
    }
}


$(document).ready(function () {
    const store = new SimpleDom.Store();
    SimpleDom.renderToDom('container', <CreateAction />, store);

});