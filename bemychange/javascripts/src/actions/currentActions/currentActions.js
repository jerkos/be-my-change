import {fillUptag, getTagsNumber} from "../utils";

require('../../home');
const moment = require('moment');
require('moment/locale/fr');
const flatpickr = require("flatpickr");
import { French } from "flatpickr/dist/l10n/fr.js"
flatpickr.localize(French);

import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from '../../components/veil/veil';
import {SidebarAction} from '../sidebarActions/sidebarActions';
import {CreateAction} from '../createAction/step1';
import {ActionCard} from "../actionCard/actionCard";
import anime from 'animejs'

import '../../css/popovers.less';
import '../../css/avatar.less';
import './currentActions.less';
import {CreateEvent} from "../createEvent/createEvent";


class ActionsList extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['ACTIONS_LIST_TO_UPDATE'];
    }

    constructor(props, store) {
        super(props, store);
    }

    componentDidMount() {
        const allCallbacks = anime({
            targets: '.card',
            opacity: 1,
            delay: function(el, i) { return 100 + (i * 100); },
            duration: function(el, i) { return 500 + (i * 500); }
          });
    }

    partitionList(input, spacing) {
        let output = [];
        for (let i = 0; i < input.length; i += spacing) {
            output[output.length] = input.slice(i, i + spacing);
        }
        return output;
    }

    render() {
         const nbActions = this.state.minisidebar ? 4 : 3;
        const colSize = this.state.minisidebar ?  'm3' : 'm4';
        if (!(this.state.selectedActions || []).length) {
            return (
                <section class="empty">
                    <div class="empty-icon">
                        <i class="lnr lnr-rocket fa-3x"/>
                    </div>
                    <h4 class="empty-title">Pas d'action ici...</h4>
                    <p class="empty-subtitle">Rechercher une action qui vous correspond
                        <a href="#createAction"
                           onclick={() => {
                               $('#createAction').modal({
                                   startingTop: '2%'
                               });
                           }}
                           > ici
                        </a> !
                    </p>
                </section>
            );
        }
        return <div id="actions-card">
            {this.partitionList(this.state.selectedActions || [], nbActions).map(subactions =>
                <div class="row">
                    {subactions.map(action =>
                        <div class={`col ${colSize} s12`}>
                            <ActionCard userAction={action} />
                        </div>
                    )}
                </div>
            )}
        </div>
    }
}


class MainTitle extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['TITLE_TO_REFRESH'];
    }

    componentDidMount() {
        tippy('.add-action', {
            html: document.querySelector('#eventOrNot'),
            arrow: true,
            distance: 15,
            placement: 'left',
            trigger: 'click',
            interactive: true
        });
    }

    render() {
        return (
            <h1 class="main-title">
                Mes actions en cours ({(this.state.selectedActions || []).length})

                <div id="eventOrNot">
                    <ul class="collection">
                        <li>
                            <a href="#createAction"
                               onclick={() => {
                                   $('#createAction').modal({
                                       startingTop: '2%'
                                   });
                               }}
                            >
                                <i class="fa fa-plus" style="color:#62dbb3; min-height: 15px; min-width: 15px; margin-right:5px"/>
                                Action
                            </a>
                        </li>
                        <li>
                            <a href="#createEvent"
                               onclick={() => {
                                   $('#createEvent').modal({
                                       startingTop: '4%', // Starting top style attribute
                                       endingTop: '1%'
                                   });
                               }}
                            >
                                <i class="fa fa-plus" style="color:#62dbb3; min-height: 15px; min-width: 15px; margin-right:5px"/>
                                Evènement
                            </a>
                        </li>
                    </ul>
                </div>
                <span href="#" class="right hbtn-action hbtn-main-color add-action"
                   title="Hello world"
                >
                    <i class="material-icons white-text">add</i>
                </span>
            </h1>
        );
    }
}


class App extends SimpleDom.Component {
    render() {
        return (
            <div id="top" class="action">
                <div id="createAction" class="modal" style="display: none">
                    <div class="modal-content">
                        <CreateAction />
                    </div>
                </div>
                <div id="createEvent" class="modal" style="display: none">
                    <div class="modal-content">
                        <CreateEvent />
                    </div>
                </div>
                <div class="boxed-layout">
                    <SidebarAction />
                    <div class="row">
                        <div id="actions" class="col s12">
                            <MainTitle/>
                            <hr/>
                            <div class="row action-filter">
                                <div class="action-date-picker input-field">
                                    <i class="lnr lnr-calendar-full prefix">
                                    </i>
                                    <input class="flatpicker" type="date"/>
                                </div>
                                <div class="action-search input-field">
                                    <i class="lnr lnr-magnifier prefix">
                                    </i>
                                    <input type="search" onkeyup={event => {
                                        setTimeout(() => {
                                            const name = event.target.value.toLowerCase();
                                            let newSelectedActions = [];
                                            if (!name) {
                                                newSelectedActions = this.state.selectedActions;
                                            } else {
                                                newSelectedActions = this.state.selectedActions.filter(userAction => {
                                                    const parentAction = userAction.action;
                                                    return parentAction.title.toLowerCase().includes(name) ||
                                                        parentAction.description.toLowerCase().includes(name)
                                                });
                                            }
                                            // update sidebar
                                            this.store.updateState({
                                                selectedActions: newSelectedActions
                                            }, 'ACTIONS_LIST_TO_UPDATE', 'MAIN_TITLE_TO_UPDATE');
                                        }, 300);
                                    }}/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    <ActionsList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

$(document).ready(function () {

    const store = new SimpleDom.Store();

    store.subscribe('ACTION_VIEW_TO_UPDATE', (state, oldState) => {
        // TODO refactor a bit this shit
        const newSelectedActions = !store.state.selectedTagSlug ? store.actions
            : store.state.actions.filter(action => {
                const splitted = store.state.selectedTagSlug.split('-');
                return action.tags.map(tag => {
                    const splittedTag = tag.tag_slug.split('-');
                    let i = 0;
                    while (i < splitted.length && i < splittedTag.length) {
                        if (splitted[i] !== splittedTag[i]) {
                            return false;
                        }
                        ++i;
                    }
                    return true;
                }).some(bool => bool)
            });

        store.updateState({
            selectedActions: newSelectedActions
        }, 'ACTIONS_LIST_TO_UPDATE', 'MAIN_TITLE_TO_UPDATE');
    });

    withVeilAndMessages(
        Promise.all([getUserActions(), allTags()]), true)
        .then(([{actions, counting}, tags]) => {
            fillUptag(tags);
            const countByTagSlug = {};
            getTagsNumber(actions, countByTagSlug);
            store.updateState({ 
                actions,
                countByTagSlug,
                selectedActions: actions.slice(),
                selectedDate: moment(new Date()).format('YYYY-MM-DD'),
                tags,
                activeTags: new Set(),
                actionsDataCount: counting
            });
            
            SimpleDom.renderToDom('container', <App />, store);
            
            // jquery functions
            flatpickr('.flatpicker',
                {
                    altInput: true,
                    altFormat: 'l d F Y',
                    defaultDate: new Date(),
                    onChange: (_, date) => {
                        withVeilAndMessages(
                            getUserActions(moment(date).format('YYYY-MM-DD')),
                            true
                        ).then(({actions, counting}) => {
                            const countByTagSlug = {};
                            getTagsNumber(actions, countByTagSlug);

                            store.updateState({
                                actions,
                                countByTagSlug,
                                selectedActions: actions.slice(),
                                actionsDataCount: counting,
                                selectedDate: date }, 'ACTIONS_LIST_TO_UPDATE', 'SIDEBAR_TO_UPDATE')
                        })
                    }
                }
            );
        });
});
