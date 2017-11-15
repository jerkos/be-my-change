import {fillUptag, getTagsNumber, updateSidebarTags} from "./utils";

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
import { TagSelector } from "./tagSelector";

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

    getFullTag() {
        const userActionTags = this.userAction.tag.split('-');
        let tags = this.state.tags.slice();
        console.log(tags);
        let result = [];

        while (userActionTags.length) {
            const currTag = userActionTags.shift();
            const targetTag = tags.find(tag => '' + tag.id === currTag);
            result.push(targetTag.name);
            if (targetTag && targetTag.sons) {
                tags = targetTag.sons;
                continue;
            }
            break;
        }
        return result.join('/');
    }

    render() {
        let self = this;
        return (
            <div>
            <div id={`card-edit-tag-${this.userAction.id}`} class="modal">
                <div class="modal-content">
                    <h4>Changer de tag</h4>
                    <TagSelector tags={this.getFullTag()}/>
                </div>
                <div class="modal-footer">
                    <div class="right">
                        <a href="#" class="hbtn" style="margin-right: 10px; margin-top: -10px;"
                           onclick={e => {
                               //e.preventDefault();
                               $(`#card-edit-tag-${this.userAction.id}`).modal('close');
                               const result = updateSidebarTags(this.state);
                               withVeilAndMessages(
                                   window.fetchJsonData(`/users/tags/change-tag/${this.userAction.id}`,
                                       {
                                           method: 'POST',
                                           body: JSON.stringify({
                                               tagsToCreate: result.tagsToCreate,
                                               tagsSlug: result.tagsSlug
                                           })
                                       }), true
                               ).then(({tags, user_action}) => {
                                   console.log(tags);
                                   console.log(user_action);
                                   this.userAction.tag = user_action.tag;
                                   fillUptag(tags);
                                   const countByTagSlug = {};
                                   //test if the user has participated into the action
                                   // add maybe user action ?
                                   getTagsNumber(this.state.actions, countByTagSlug);

                                   this.store.updateState({
                                           tags,
                                           countByTagSlug
                                       },
                                       'SIDEBAR_TO_UPDATE', 'ACTIONS_LIST_TO_UPDATE', 'TITLE_TO_REFRESH');
                               })
                           }}
                        >
                            Valider
                        </a>
                    </div>
                </div>
            </div>
            <div class="card my-card" style="opacity: 0">
                <div class="hbtn-action my-card-delete">&#10005;</div>
                <div class="card-image waves-block waves-light">
                    {SimpleDom.predicate(this.userAction.action.image_url,
                        () => {
                            return (
                                <a data-fancybox
                                   data-caption={this.userAction.action.title}
                                   href={this.userAction.action.image_url}>
                                    <img class="lozad" src={this.userAction.action.image_url} />
                                    <div class="card-image-tag"
                                        onclick={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            $(`#card-edit-tag-${this.userAction.id}`).modal('open');

                                            console.log("tag clicked");
                                        }}>
                                        {this.getFullTag()}
                                    </div>
                                </a>
                            );
                        }
                    )}
                </div>
                <div class="card-content" data-tooltip={this.userAction.action.title}>
                    <span class="card-title grey-text text-darken-4" style="font-size: 1.4em;">
                        {ActionCard.cropTitle(this.userAction.action.title, 20)}
                    </span>
                    <div class="card-content-action-info">
                        <div class="progress">
                            <div class="card-content-action-info-start-date">12/10</div>
                            <div class="card-content-action-info-end-date">14/11</div>
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
                                           `Commentaires`,
                                           <CommentariesTab
                                               action={this.userAction.action}
                                               commentaries={commentaries || []}
                                           />,
                                           event,
                                           'lnr lnr-bubble'
                                       ))
                               }}
                            >
                                <div class="action-indicator">28</div>
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
                                <div class="action-indicator">28</div>
                                <span class="lnr lnr-users fa-2x"/>
                            </a>

                            <a class="hbtn-action"
                               onclick={e => {
                                   console.log('plus clicked');
                               }}>
                                <div class="action-indicator">28</div>
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
            </div>
        );
    }
}