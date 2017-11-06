import {fillUptag, getTagsNumber} from "./utils";

require('../home');
const moment = require('moment');
require('moment/locale/fr');
const flatpickr = require("flatpickr");
const francese = require("flatpickr/dist/l10n/fr.js").fr;
flatpickr.localize(francese);

import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from '../components/veil/veil';
import {SidebarAction} from './sidebarActions';
import {CreateAction} from './step1';
import {ActionCard} from "./actionCard";
import anime from 'animejs'


import '../css/popovers.less';
import '../css/avatar.less';
import './currentActions.less';


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
        if (!this.state.selectedActions.length) {
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

    render() {
        return (
            <h1 class="main-title">
                Mes actions en cours ({this.state.selectedActions.length})
                <a href="#createAction" class="right hbtn-action hbtn-main-color add-action"
                   onclick={() => {
                       $('#createAction').modal({
                           startingTop: '2%'
                       });
                   }}
                >
                    <i class="material-icons white-text">add</i>
                </a>
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
                                        const name = event.target.value.toLowerCase();
                                        let newSelectedActions = [];
                                        if (!name) {
                                            newSelectedActions = this.state.actions;
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
                                        }, 'ACTIONS_LIST_TO_UPDATE', 'MAIN_TITLE_TO_UPDATE')
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
        const newSelectedActions = !store.state.selectedTagSlug ? store.actions
            : store.state.actions.filter(action =>
                action.tag.startsWith(store.state.selectedTagSlug));

        store.updateState({
            selectedActions: newSelectedActions
        }, 'ACTIONS_LIST_TO_UPDATE', 'MAIN_TITLE_TO_UPDATE');
    });

    withVeilAndMessages(
        Promise.all([
            fetchJsonData(`/users/actions/get`), 
            fetchJsonData('/users/tags/all')
        ]),
        true)
        .then(([actions, tags]) => {

            fillUptag(tags);
            const countByTagSlug = {};
            getTagsNumber(actions, countByTagSlug);

            store.updateState({ 
                actions,
                countByTagSlug,
                selectedActions: actions.slice(),
                selectedDate: moment(new Date()).format('YYYY-MM-DD'),
                tags
            });
            
            SimpleDom.renderToDom('container', <App />, store);
            
            // jquery functions
            flatpickr('.flatpicker',
                {
                    altInput: true,
                    defaultDate: new Date(),
                    onChange: (_, date, inst) => {
                        withVeilAndMessages(
                            fetchJsonData(`/users/actions/get?date=${moment(date).format('YYYY-MM-DD')}`),
                            true
                        ).then(actions => {
                            console.log(actions);
                            //fillUptag(tags);
                            const countByTagSlug = {};
                            getTagsNumber(actions, countByTagSlug);

                            store.updateState({
                                actions,
                                countByTagSlug,
                                selectedActions: actions.slice(),
                                selectedDate: date }, 'ACTIONS_LIST_TO_UPDATE', 'SIDEBAR_TO_UPDATE')
                        })
                    }
                }
            );
        });
});
