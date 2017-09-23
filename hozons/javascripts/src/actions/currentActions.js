require('../home')
const moment = require('moment')
require('moment/locale/fr');
const flatpickr = require("flatpickr");

import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from '../veil';
import { createSlider } from '../slider'
import { CommentariesTab } from './commentaries'
import { ParticipantTab } from './participants'

require('../css/popovers.less')
require('../css/avatar.less');


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
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <a data-fancybox 
                        data-caption={this.userAction.action.title} 
                        href={this.userAction.action.image_url}>
                        <img height="150" class="lozad" src={this.userAction.action.image_url} />
                    </a>
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4"
                        style="font-size: 1.4em;"
                    >
                        {ActionCard.cropTitle(this.userAction.action.title, 10)}
                        <span class={`badge small ${this.getBadgeColour()} white-text`}
                            style="border-radius: 5px; position: absolute">
                            {this.userAction.action.kind}
                        </span>
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
            {this.partitionList(this.state.selectedActions || [], 3).map(subactions =>
                <div class="row">
                    {subactions.map(action =>
                        <div class="col m4 s12">
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
                <h2 class="en-tete">J'agis</h2>
                <div class="boxed-layout" style="margin-top: 50px;">
                    <div class="row">
                        <div id="actions" class="col s12">
                            <div class="row">
                                <div class="col s4">
                                    <div style="position: fixed; margin-top: -50px;">
                                        <input style="visibility: hidden;" class="flatpicker" type="date" />
                                    </div>
                                </div>
                                <div class="col s8">
                                    {SimpleDom.predicate(!this.state.selectedActions.length,
                                        () => {
                                            return (
                                                <section style="margin-top: 50px;" class="empty">
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

    const store = new SimpleDom.Store();
    withVeilAndMessages(fetchJsonData(`/users/actions/get`),
        true)
        .then(actions => {
            console.log(actions);
            store.updateState({ actions, selectedActions: actions, selectedDate: moment(new Date()).format('YYYY-MM-DD')});
            SimpleDom.renderToDom('container', <App />, store);

            // jquery functions
            $('.tabs').tabs();
            flatpickr('.flatpicker',
                {
                    inline: true,
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
