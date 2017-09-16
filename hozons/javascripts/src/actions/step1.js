require('../home');
const moment = require('moment')
const flatpickr = require("flatpickr");
require('moment/locale/fr');
require('../css/steps.less');
require('../css/tooltips.less');
require('../css/popovers.less');
require('../css/user.less');
import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from '../veil';
import { ComposedComponent, ParentComponent } from '../composedComponent'

class CreateActionStep1 extends ComposedComponent {
    eventsToSubscribe() {
        return ['STEP1_REFRESH'];
    }
    render() {
        return (
            <div class="boxed-layout">
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

class CreateActionStep2 extends ComposedComponent {

    eventsToSubscribe() {
        return ['STEP2_REFRESH'];
    }

    handleActionTypeChange(event) {
        console.log(event);
        this.updateCState({ actionType: event.target.value });
    }
    componentDidMount() {
        $('.action-type').material_select();
        $('.action-type').on('change', this.handleActionTypeChange);
    }

    render() {
        console.log(this.cstate)
        return (
            <div class="boxed-layout">
                <h3>Dans le vif du sujet</h3>
                <div class="row">
                    <p style="font-size: 1.2em">Quel est le type de votre nouvelle action ?</p>
                    <div class="input-field col s12" style="margin-top: -10px">
                        <select class="action-type">
                            <option selected={this.cstate.actionType === 'PERS' || undefined} value="PERS">Personnel</option>
                            <option selected={this.cstate.actionType === 'REL' || undefined} value="REL">Relationnel</option>
                            <option selected={this.cstate.actionType === 'ENV' || undefined} value="ENV">Environnemental</option>
                        </select>
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
                                        console.log('hello');
                                        this.updateCState({ isPublic: !(this.cstate.isPublic || false) })
                                    }} />
                                <span class="lever"></span>
                                Oui
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row" style="padding-top: 18px">
                    <p style="font-size: 1.2em">Voulez-vous indiquer une adresse ?</p>
                    <div class="input-field col s12" style="margin-top: -10px">
                        <input
                            type="text"
                            placeholder="addresse de l'évènement"
                            value={this.cstate.actionAddress || ''}
                            onchange={e => this.updateCState({ actionAddress: e.target.value })}
                        />
                    </div>
                </div>
                <div class="row">
                    <p style="font-size: 1.2em">une heure ?</p>
                    <div class="input-field col s12" style="margin-top: -10px">
                        <input
                            type="time"
                            value={this.cstate.actionTime || ''}
                            onchange={e => this.updateCState({ actionTime: e.target.value })}
                        />
                    </div>
                </div>
                <div class="row">
                    <button class="left btn"
                        onclick={e => {
                            this.updateCState({ currStep: 1 }, 'CHANGE_STATE');
                        }}>Retour en arrière</button>
                    <button class="right btn"
                        onclick={e => {
                            this.updateCState({ currStep: 3 }, 'CHANGE_STATE');
                        }}>Passer à la fin</button>
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
            <div class="boxed-layout">
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
                                        body: JSON.stringify(this.cstate)
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
                <h2 class="en-tete">J'agis</h2>
                <div style="padding: 0 25%">
                    <div class="row">
                        <Step currStep={this.cstate.currStep || 1} />
                    </div>
                    <div class="row">
                        <div class="col s8">
                            {stepDiv}
                        </div>
                        <div class="col s4" style='min-height: 600px;background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ja0wQ5FjkLKKKzjaOduug3YARtDbI7mjQu6qJ17MSzrDfCNG1A"); background-size: cover; background-position: center;'>
                        </div>
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