import '../../home';
const flatpickr = require('flatpickr');
const moment = require('moment');
require('moment/locale/fr');

const SimpleMDE = require('simplemde');
require('../../../node_modules/simplemde/dist/simplemde.min.css');

import '../../css/steps.less';
import '../../css/tooltips.less';
import '../../css/popovers.less';
import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from '../../components/veil/veil';
import './createEvent.less'
import {fillUptag, getTagsNumber, updateSidebarTags} from "../utils";
import { TagSelector } from "../tagSelector/tagSelector";

export class CreateEvent extends SimpleDom.Component {

    eventsToSubscribe() {
        return ['CREATE_EVENT_TO_CHANGE'];
    }

    constructor(props, store) {
        super(props, store);
        this.title = '';
        this.description = '';
        this.tag = undefined;
        this.isPublic = true;
        this.startDate = moment.now();
        this.startTime = "00:00";
        this.imageUrl = '';
        this.mdeEditor = undefined;
    }

    componentDidMount() {
        flatpickr('.flatpicker-event-date', {
            altInput: true,
            altFormat: 'l d F Y',
            defaultDate: new Date(),
            onChange: (_, date) => {
                this.startDate = moment(date).format('YYYY-MM-DD');
            }
        });
        flatpickr('.flatpicker-event-time', {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            onChange: (_, date) => {
                console.log(date);
                this.startDate = date;
            }
        });
        this.mdeEditor = new SimpleMDE({
            element: document.getElementById('createEventDescription')
        });
    }

    render() {
        return (
            <div>
                <h3>Création d'un nouvel évènement</h3>
                <div class="row">
                    <p className="prompt">
                        Quel est le titre de l'évènement ?
                        <input type="text" placeholder="Votre super titre !"/>
                    </p>
                </div>
                <div class="row">
                    <p class="prompt">Classifier votre évènement ?
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
                    <p className="prompt">
                        Décrivez votre action
                    </p>
                    <textarea id="createEventDescription">
                        {this.description || ''}
                    </textarea>
                </div>
                <div class="row">
                    <p class="prompt">Votre évènement est-publique ?</p>
                    <div class="input-field col s12" style="margin-top: -10px; margin-bottom: 40px;">
                        <div class="switch">
                            <label>
                                Non
                                <input type="checkbox"
                                       checked={(this.isPublic || false) ? true : undefined}
                                       onchange={() => {
                                           this.isPublic = ! this.isPublic || false;
                                       }} />
                                <span class="lever" />
                                Oui
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <p class="prompt">
                        Ajouter une l'url d'une image !
                        <input type="text" onchange={e => this.imageUrl = e.target.value}/>
                    </p>
                </div>
                <div class="row">
                    <div class="col s6">
                        <p class="prompt"> Quand aura lieu l'évènement ?
                            <input type="date" style="display: inline !important" class="flatpicker-event-date"
                            />
                        </p>
                    </div>
                    <div className="col s6">
                        <p class="prompt"> A quelle heure ?
                            <input type="date" style="display: inline !important" class="flatpicker-event-time"
                            />
                        </p>
                    </div>
                </div>
                <div class="row">
                    <a class="right hbtn hbtn-big"
                       onclick={e => {
                           e.preventDefault();
                           $('#createEvent').modal('close');
                           const result = updateSidebarTags(this.state);
                           withVeilAndMessages(
                               window.fetchJsonData('/users/actions/create',
                                   {
                                       method: 'POST',
                                       body: JSON.stringify({
                                           title: this.actionTitle,
                                           description: this.actionDescription,
                                           actionImageUrl: this.imageUrl,
                                           actionDuration: 1,
                                           isPublic: true,
                                           startDate: this.startDate + " " + this.startTime,
                                           isEvent: true,
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
                       }}>Créer l'évènement</a>
                </div>
            </div>
        );
    }
}