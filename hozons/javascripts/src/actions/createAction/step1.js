import '../../home';
const flatpickr = require('flatpickr');

import '../../css/steps.less';
import '../../css/tooltips.less';
import '../../css/popovers.less';
import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from '../../components/veil/veil';
import { ComposedComponent, ParentComponent } from '../../composedComponent'
import './createAction.less'
import {fillUptag, getTagsNumber, updateSidebarTags} from "../utils";
import { TagSelector } from "../tagSelector/tagSelector";



class CreateActionStep1 extends ComposedComponent {
    eventsToSubscribe() {
        return ['STEP1_REFRESH'];
    }
    render() {
        return (
            <div>
                <h3><span style="margin-right: 10px;">1.</span>Première étape (1/2)</h3>
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
                    Chercher <a style="color: #62dbb1 !important" href="https://unsplash.com" target="_blank"> ici</a> ou <a style="color: #62dbb1 !important" href="https://pexels.com" target="_blank"> ici</a>
                    </p>
                    <div class="input-field col s12" style="margin-top: -10px">
                        <input
                            type="url"
                            placeholder="l'adresse de l'image !"
                            value={this.cstate.actionImageUrl || ''}
                            onchange={e => this.updateCState({ actionImageUrl: e.target.value })}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="popover popover-right">
                        <a class="right hbtn hbtn-big"
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
                            }}>Passer à la suite</a>
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

    componentDidMount() {       
        flatpickr('.flatpicker-starter');
    }

    /*
    updateSidebarTags() {
        //if (!this.state.tagSlugToCreate) {
        //    return;
        //}
        const newTags = this.state.tagsToCreate.slice(1).split('/');
        let existingTags = this.state.tags;
        let currRank = 1;

        let tagsSlug = '';
        const tagsToCreate = [];
        
        for (const newTag of newTags) {
            const tag = existingTags.find(existingTag => existingTag.name === newTag);

            if (! tag) {
                const obj = {
                    name: newTag,
                    parent_id: +(tagsSlug.split('-').slice(-1)) || null,
                    rank: currRank,
                };
                tagsToCreate.push(obj);
                // existingTags.push(obj);

                // updated later to test ?
                //this.store.updateState({tags: existingTags}, 'SIDEBAR_TO_UPDATE');
            }            
            const newId = !tag ? 0 : tag.id;
            tagsSlug = tagsSlug ? (tagsSlug + '-' + newId) : tagsSlug + newId;
            existingTags = tag ? (tag.sons || []) : [];
            currRank ++;
        }
        return {tagsSlug, tagsToCreate, actualizedTags: existingTags};
    }*/

    render() {
        return (
            <div>
                <h3>2.Suite et fin (2/2)</h3>
                <div class="row">
                    <p class="prompt">Classifier votre action ? 
                        <span style="padding-left: 10px"
                            class="lnr lnr-question-circle tooltip tooltip-right"
                            data-tooltip={'Séparer vos tags par des "/".' + 
                            'Si vous créez un nouveau tag, il apparaitra ' + 
                            'automatiquement dans vos filtres.'}>
                        </span>
                    </p>
                    <div class="col s12" style="max-height: 72px">
                        <TagSelector />
                    </div>
                </div>
                <div class="row">
                    <p class="prompt">Votre action est-publique ?</p>
                    <div class="input-field col s12" style="margin-top: -10px; margin-bottom: 40px;">
                        <div class="switch">
                            <label>
                                Non
                            <input type="checkbox"
                                    checked={(this.cstate.isPublic || false) ? true : undefined}
                                    onchange={e => {
                                        this.updateCState({ isPublic: !(this.cstate.isPublic || false) })
                                    }} />
                                <span class="lever" />
                                Oui
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <p class="prompt">Combien de temps durera votre action (récurrence quotidienne ?):
                        <span style="padding-left: 10px">
                            <em>{`${this.cstate.actionDuration || 21} jours`}</em>
                        </span>
                    </p>
                    <p class="range-field">
                        <input style="border-bottom:none !important;" type="range"
                            value={this.cstate.actionDuration || 21}
                            onchange={e => this.updateCState({ actionDuration: e.target.value }, 'STEP2_REFRESH')} min="0" max="30"
                        />
                    </p>
                </div>
                <div class="row">
                    <p class="prompt"> Quand souhaitez-vous commencer votre action ?
                        <input type="date" style="display: inline !important" class="flatpicker-starter" onchange={e => this.updateCState({ startDate: e.target.value })} />
                    </p>
                </div>
                <div class="row"> 
                    <a class="left hbtn hbtn-big"
                        onclick={e => {
                            this.updateCState({ currStep: 1 }, 'CHANGE_STATE');
                        }}>Retour en arrière</a>
                    <a class="right hbtn hbtn-big"
                        onclick={e => {
                            e.preventDefault();
                            $('#createAction').modal('close');
                            const result = updateSidebarTags(this.state);
                            withVeilAndMessages(
                                window.fetchJsonData('/users/actions/create',
                                    {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            ...this.cstate,
                                            tagsToCreate: result.tagsToCreate,
                                            tagsSlug: result.tagsSlug
                                        })
                                    }), true
                            ).then(({tags, user_action}) => {
                                fillUptag(tags);
                                const countByTagSlug = {};
                                this.state.actions.push(user_action);
                                //test if the user has participated into the action
                                // add maybe user action ?
                                this.state.selectedActions.push(user_action);

                                getTagsNumber(this.state.actions, countByTagSlug);

                                this.store.updateState({
                                        tags,
                                        countByTagSlug
                                    },
                                    'SIDEBAR_TO_UPDATE', 'ACTIONS_LIST_TO_UPDATE', 'TITLE_TO_REFRESH');
                            })
                        }}>Créer l'action</a>
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
                    <a href="#" class="tooltip tooltip-bottom" data-tooltip="Description de votre nouvelle action"/>
                </li>
                <li class={`step-item ${this.props.currStep === 2 ? 'active' : undefined}`}>
                    <a href="#" class="tooltip tooltip-bottom" data-tooltip="Paramètres de l'action"/>
                </li>
            </ul>
        );
    }
}


export class CreateAction extends ParentComponent {
    constructor(props, store) {
        super(props, store);
        this.cstate.actionDuration = 21;
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
        }
        return (
            <div id="top" class="action">
                <div class="row" style="display: none">
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