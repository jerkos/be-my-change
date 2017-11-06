import {fillUptag, getTagsNumber} from "./utils";

require('../home');
const moment = require('moment');
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
import {CreateAction} from './step1';
import anime from 'animejs'


import '../css/popovers.less';
import '../css/avatar.less';
import './actionCard.less';

export class ActionCard extends SimpleDom.Component {

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
            <div class="card my-card" style="opacity: 0">
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