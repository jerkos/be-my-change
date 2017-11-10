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
                    <span class="card-title grey-text text-darken-4" style="font-size: 1.4em;">
                        {ActionCard.cropTitle(this.userAction.action.title, 20)}
                    </span>
                    <div class="card-content-action-info">
                        <div class="progress">
                            <div class="determinate" style="width: 70%"/>
                        </div>
                        <p>
                            <a class="hbtn-action tooltip"
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
                                <div class="action-indicator">
                                    28
                                </div>
                                <span class="lnr lnr-bubble fa-2x"/>
                            </a>
                            <a class="hbtn-action"
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
                                <span class="lnr lnr-users fa-2x"/>
                            </a>

                            <a class="hbtn-action"
                               onclick={e => {
                                   console.log('plus clicked');
                               }}>
                                <span class="lnr lnr-layers fa-2x"/>
                            </a>
                        </p>
                    </div>
                </div>
                <div class="card-action">
                    {SimpleDom.predicate(this.state.selectedDate === moment(new Date()).format('YYYY-MM-DD'),
                        () => <p>
                            {SimpleDom.predicate(
                                moment(this.userAction.last_succeed).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD'),
                                () => <p><span class="lnr lnr-thumbs-up fa-2x"/>Fait !</p>,
                                () => <a href="#"
                                         onclick={ e => {
                                             e.preventDefault();
                                             withVeilAndMessages(
                                                 fetchJsonData(`/users/actions/user-action/done/${this.userAction.id}`),
                                                 true
                                             ).then(userAction => {
                                                 this.userAction = userAction;
                                                 this.store.updateState({}, 'ACTION_CARD_RELOAD');
                                             })
                                         }}

                                >
                                    <span class="lnr lnr-rocket fa-2x"/>Action réalisée ?
                                </a>
                            )}
                        </p>
                    )}
                </div>
            </div>
        );
    }
}