require('../home')
const moment = require('moment')
require('moment/locale/fr');
const flatpickr = require("flatpickr");
const francese = require("flatpickr/dist/l10n/fr.js").fr;
flatpickr.localize(francese);

import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from '../components/veil/veil';
import { createSlider } from '../components/slider/slider';
import { CommentariesTab } from './commentaries';
import { ParticipantTab } from './participants';
import {SidebarAction} from './sidebarActions';

require('../css/popovers.less')
require('../css/avatar.less');

import './currentActions.less';

class ActionCard extends SimpleDom.Component {

    eventsToSubscribe() {
        return ['ACTION_CARD_RELOAD'];
    }

    constructor(props, store) {
        super(props, store);
        this.userAction = this.props.userAction;
    }

    static cropTitle(title, maxLength = 20) {
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + '...'
        }
        return title;
    }

    static formatHours(time) {
        return time.replace('une', '1').replace('un', '1').replace('heure', 'h');
    }

    getBadgeColour() {
        const kind = this.userAction.action.kind;
        if (kind === 'PERS') {
            return 'yellow';
        } else if (kind === 'ENV') {
            return 'green';
        }
        return 'blue';
    }

    render() {
        let self = this;
        return (
            <div class="card my-card">
                <div class="card-image waves-block waves-light">
                    <a data-fancybox 
                        data-caption={this.userAction.action.title} 
                        href={this.userAction.action.image_url}>
                        <img class="lozad" src={this.userAction.action.image_url} />
                    </a>
                    <span class={`badge ${this.getBadgeColour()} white-text my-card-indicator`}>
                            {this.userAction.action.kind}
                    </span>
                </div>
                <div class="card-content" data-tooltip={this.userAction.action.title}>
                    <span class="card-title activator grey-text text-darken-4"
                        style="font-size: 1.4em;"
                    >
                        {ActionCard.cropTitle(this.userAction.action.title, 20)}
                        <i class="material-icons right">more_vert</i>
                    </span>
                    <div>
                        <div>
                            <div class="chip" style="font-size: 10px">
                                <i class="material-icons tiny">alarm</i>
                                {ActionCard.formatHours(moment(this.userAction.start_date).fromNow(true))}
                            </div>
                            <div class="chip" style="font-size: 10px">
                                <i class="tiny material-icons">alarm_off</i>
                                {ActionCard.formatHours(moment(this.userAction.start_date).from(moment(this.userAction.end_date), true))}
                            </div>
                            <div class="chip" style="font-size: 10px">
                                <i class="tiny material-icons">check</i>
                                {this.userAction.nb_succeed || 0}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-reveal">
                    <span class="card-title button-collapse">
                        {this.userAction.action.title}
                        <i class="material-icons right">close</i>
                    </span>
                    <p>{this.userAction.action.description}</p>
                    <p style="display: flex;align-items: center;justify-content: space-around;">
                        <a class="btn-floating waves-effect waves-light cyan lighten-2 tooltip"
                            data-position="bottom"
                            data-tooltip="Voir les commentaires à propros de cette action"
                            onclick={event => {
                                withVeilAndMessages(
                                    fetchJsonData(`/users/actions/${this.userAction.action.id}/commentaries`),
                                    true
                                ).then(commentaries =>
                                    createSlider(
                                        `Commentaires associées à cette action`,
                                        <CommentariesTab
                                            action={this.userAction.action}
                                            commentaries={commentaries || []}
                                        />,
                                        event
                                    ));
                            }}
                        >
                            <i class="material-icons">question_answer</i>Hello
                        </a>
                        <a class="btn-floating waves-effect waves-light cyan lighten-2"
                            onclick={event => {
                                withVeilAndMessages(
                                    fetchJsonData(`/users/actions/${this.userAction.action.id}/participants`),
                                    true
                                ).then(({ users, total_pages, current_page }) => {
                                    createSlider(
                                        `Participants`,
                                        <ParticipantTab
                                            users={users || []}
                                            action={this.userAction.action}
                                            total_pages={total_pages}
                                            current_page={current_page}
                                        />,
                                        event
                                    )
                                })
                            }}
                        >
                            <i class="material-icons">people</i>
                        </a>

                        <a class="btn-floating waves-effect waves-light cyan lighten-2"
                            onclick={e => {
                                console.log('plus clicked');
                            }}>
                            <i class="material-icons">add</i>
                        </a>
                    </p>
                </div>
                <div class="card-action">
                    {SimpleDom.predicate(this.state.selectedDate === moment(new Date()).format('YYYY-MM-DD'), 
                        () => <p> 
                                {SimpleDom.predicate(
                                    moment(this.userAction.last_succeed).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD'),  
                                    () => <p>Déjà fait !</p>,
                                    () => <a class="purple-text lighten-2-text" href="#" style="color: black, margin-right: 0"
                                            onclick={ e => {
                                                withVeilAndMessages(
                                                    fetchJsonData(`/users/actions/user-action/done/${this.userAction.id}`),
                                                    true
                                                ).then(userAction => {
                                                    this.userAction = userAction;
                                                    this.store.updateState({}, 'ACTION_CARD_RELOAD');
                                                })
                                            }}
                            
                                            >
                                                J'ai effectué cette action !
                                            </a>
                                )}
                                <a class="right grey-text" style="font-size: 8px">Abandon</a>
                            </p>
                    )}
                </div>
            </div>
        );
    }
}


class ActionsList extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['ACTIONS_LIST_TO_UPDATE'];
    }

    constructor(props, store) {
        super(props, store);
    }

    partitionList(input, spacing) {
        let output = [];
        for (let i = 0; i < input.length; i += spacing) {
            output[output.length] = input.slice(i, i + spacing);
        }
        return output;
    }

    render() {
        return <div id="actions-card">
            {this.partitionList(this.state.selectedActions || [], 4).map(subactions =>
                <div class="row">
                    {subactions.map(action =>
                        <div class="col m3 s12">
                            <ActionCard userAction={action} />
                        </div>
                    )}
                </div>
            )}
        </div>
    }
}

class App extends SimpleDom.Component {
    render() {
        return (
            <div id="top" class="action">
                <div class="boxed-layout">
                    <SidebarAction 
                        tags={this.state.tags}
                    />
                    <div class="row">
                        <div id="actions" class="col s12">
                            <h1 class="main-title">
                                Mes actions en cours ({this.state.selectedActions.length})
                                <a href="#create-action" class="right hbtn-action hbtn-main-color add-action">
                                    <i class="material-icons white-text">add</i>
                                </a>
                            </h1>
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
                                    <input type="search"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12">
                                    {SimpleDom.predicate(!this.state.selectedActions.length,
                                        () => {
                                            return (
                                                <section class="empty">
                                                    <div class="empty-icon">
                                                        <i class="lnr lnr-user fa-3x"></i>
                                                    </div>
                                                    <h4 class="empty-title">Vous n'avez pas encore d'action en cours !</h4>
                                                    <p class="empty-subtitle">Rechercher une action qui vous correspond !</p>
                                                </section>
                                            );
                                        },
                                        () => <ActionsList />
                                    )}
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

    function fillUptag(tags, val='') {
        for (let tag of tags) {
            let value = val ? val + '-' + tag.id : tag.id + '';
            tag.tag_slug = value; 

            if (tag.sons && tag.sons.length) {
                fillUptag(tag.sons, value);
            }
        }
    }

    function getTagsNumber(actions, result) {
        function plusOne(key) {
            if (!Object.keys(result).includes(key)) {
                result[key] = 0;
            }
            result[key] += 1;
        }

        for (let action of actions) {
            const targetTag = action.tag;
            plusOne(targetTag);

            let val = targetTag.split('-');
            val.pop();
            while (val.length !== 0) {
                plusOne(val.join('-'));
                val.pop();
            }
        }   
    }

    const store = new SimpleDom.Store();

    store.subscribe('ACTION_VIEW_TO_UPDATE', (state, oldState) => {
        store.updateState({
            selectedActions: store.state.actions.filter(action => 
                action.tag.startsWith(store.state.selectedTagSlug)
            )
        }, 'ACTIONS_LIST_TO_UPDATE');
    })

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
                selectedActions: actions, 
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
                        console.log(date);
                        withVeilAndMessages(
                            fetchJsonData(`/users/actions/get?date=${moment(date).format('YYYY-MM-DD')}`),
                            true
                        ).then(actions =>
                            store.updateState({ actions, selectedActions: actions, selectedDate: date }, 'ACTIONS_LIST_TO_UPDATE')
                            )
                    }
                }
            );
        });
});
