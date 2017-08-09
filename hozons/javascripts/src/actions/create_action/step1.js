const moment = require('moment')
require('moment/locale/fr');
import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from '../../veil';
import { ComposedComponent, ParentComponent } from '../../composedComponent'

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
                            value={this.state.actionTitle || ''}
                            onchange={e => this.store.updateState({ actionTitle: e.target.value })}
                        />
                        {SimpleDom.predicate(
                            !!this.state.errorTitle,
                            () => <p class="red-text" style="margin-top: -10px">{this.state.errorTitle}</p>
                        )}
                    </div>
                </div>
                <div class="row">
                    <p style="font-size: 1.2em;">Quelques mots pour décrire votre action ou évènement</p>
                    <div class="input-field col s12" style="margin-top: -10px">
                        <textarea class="materialize-textarea"
                            onchange={e => this.store.updateState({actionDescription: e.target.value})}
                        >{this.state.actionDescription || 'Entrez une description innovante...'}</textarea>
                    </div>
                    {SimpleDom.predicate(
                            !!this.state.errorDescription,
                            () => <p class="red-text" style="margin-top: -15px">{this.state.errorDescription}</p>
                    )}
                </div>
                <div class="row">
                    <p style="font-size: 1.2em;">Choisissez une image !
                        {SimpleDom.predicate(!!this.state.actionImageUrl,
                            () => <img src={this.state.actionImageUrl} class="responsive-img"/>
                        )}
                    </p>
                   <div class="input-field col s12" style="margin-top: -10px">
                        <input
                            type="url"
                            placeholder="l'image de votre action !"
                            value={this.state.actionImageUrl || ''}
                            onchange={e => this.store.updateState({ actionImageUrl: e.target.value }, 'STEP1_REFRESH')}
                        />
                    </div>
                </div>
                <div class="row">
                    <button class="right btn"
                        onclick={e => {
                            let hasError = false;
                            let errors = {};
                            if (! !!this.state.actionTitle) {
                                hasError = true;
                                errors = {...errors, errorTitle: 'Titre vide !'};
                            }
                            if (! !!this.state.actionDescription) {
                                hasError = true;
                                errors = {...errors, errorDescription: 'Description vide !'};
                            }
                            if (hasError) {
                                this.store.updateState({
                                    errorDescription: errors.errorDescription,
                                    errorTitle: errors.errorTitle
                                }, 'STEP1_REFRESH')
                            } else {
                                this.updateCState({currStep: 2}, 'CHANGE_STATE');
                                //this.store.updateState({}, 'CHANGE_STATE');
                            }
                        }}>Passer à la suite</button>
                </div>
            </div>
        );
    }
}

class CreateActionStep2 extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['STEP2_REFRESH'];
    }

    componentDidMount() {
        $('.action-type').material_select();
    }

    render() {
        return (
            <div class="boxed-layout">
                <h3>Dans le vif du sujet</h3>
                <div class="row">
                    <p style="font-size: 1.2em">Quel est le type de votre nouvelle action ?</p>
                    <div class="input-field col s12" style="margin-top: -10px">
                        <select class="action-type">
                            <option selected value="PERS">Personnel</option>
                            <option value="REL">Relationnel</option>
                            <option value="ENV">Environnemental</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <p style="font-size: 1.2em">Votre action est-publique ?</p>
                    <div class="input-field col s12" style="margin-top: -10px">
                        <div class="switch">
                            <label>
                            Non
                            <input type="checkbox"/>
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
                            value={this.state.actionAddress || ''}
                            onchange={e => this.store.updateState({ actionAddress: e.target.value }, 'STEP2_REFRESH')}
                        />
                    </div>
                </div>
                <div class="row">
                    <p style="font-size: 1.2em">une heure ?</p>
                    <div class="input-field col s12" style="margin-top: -10px">
                       <input
                            type="time"
                            value={this.state.actionTime || ''}
                            onchange={e => this.store.updateState({ actionTime: e.target.value }, 'STEP2_REFRESH')}
                        />
                    </div>
                </div>
                <div class="row">
                    <button class="left btn"    
                        onclick={e => {
                            this.store.updateState({currStep: 1}, 'CHANGE_STATE');
                        }}>Retour en arrière</button>
                    <button class="right btn"
                        onclick={e => {
                            this.props.updatecstate({currStep: 3})
                            this.store.updateState({currStep: 3}, 'CHANGE_STATE');
                        }}>Passer à la fin</button>
                </div>
            </div>
        );
    }
}


class CreateActionStep3 extends SimpleDom.Component {
    render() {
        <div class="boxed-layout">
            <div class="row">
                <button class="center">Créer</button>
            </div>
        </div>
    }   
}


export class CreateAction extends ParentComponent {
    constructor(props, store) {
        super(props, store);
        this.cstate = {};
    }
    
    eventsToSubscribe() {
        return ['CHANGE_STATE'];
    }

    cstateSetter(obj, ...events) {
        this.cstate = {...this.cstate, ...obj};
        this.store.updateState({}, ...events);
    }

    render() {
        let stepDiv = null;
        switch (this.cstate.currStep) {
            case 1:
            case undefined:
                stepDiv = <CreateActionStep1 parent={this}/>
                break;  
            case 2:
                stepDiv = <CreateActionStep2 parent={this}/>
                break;
            case 3:
                stepDiv = <CreateActionStep3 parent={this}/>
                break;
        }
        return (
            <div>
                <div class="row">
                    <div class="col s8">
                        {stepDiv}
                    </div>
                    <div class="col s4" style='min-height: 600px;background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ja0wQ5FjkLKKKzjaOduug3YARtDbI7mjQu6qJ17MSzrDfCNG1A"); background-size: cover; background-position: center;'>
                    </div>
                </div>
                <div class="progress">
                    <div class="determinate" style={{ width: `${(this.state.currStep || 1) * 33.33}%` }}></div>
                </div>
            </div>
        );
    }
}
