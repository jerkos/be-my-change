require('../home');
import * as SimpleDom from 'simpledom-component';
require('../css/layout.less');
require('../css/tooltips.less');
require('../css/avatar.less');
require('../css/popovers.less');

const moment = require('moment');
require('moment/locale/fr');
const gravatar = require('gravatar');

import { withVeilAndMessages } from '../veil';
import { createSlider } from '../slider';
import { CommentariesTab } from './commentaries';
import { ParticipantTab } from './participants';


class InviteModalContent extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['INVITE_TO_REFRESH'];
    }

    render() {
        return (
            <div>
                <div class="modal-content">
                    <h4>{this.state.test}</h4>
                    <p>A bunch of text</p>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>
        );
    }
}

class ParticipateModalContent extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['PARTICIPATE_TO_REFRESH']
    }

    render() {
        return (
            <div>
                <div class="modal-content">
                    <h4>Participer à une nouvelle action</h4>
                    <h2>{(this.state.participateAction || {}).title}</h2>
                    <p>Vous aller participer à une nouvelle action. Soyez perséverant !</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-action modal-close waves-effect waves-green btn-flat"
                        onclick={() => {
                            console.log("hello there");
                            withVeilAndMessages(
                                fetchJsonData(`/users/actions/participate/${this.state.participateAction.id}`),
                                true
                            ).then(userAction => {
                                const tryFindAction = this.state.actions
                                    .map(action => action.id)
                                    .find(actionId => actionId === userAction.action.id);
                                if (!tryFindAction) {
                                    this.state.actions.push(userAction);
                                    this.store.updateState({ actions }, 'ACTIONS_LIST_TO_UPDATE');
                                }
                            })
                        }}
                    >
                        C'est parti !
                    </button>
                </div>
            </div>
        );
    }
}

export class LookForAction extends SimpleDom.Component {

    static getCategoryLabel(category) {
        if (category === 'PERS')
            return 'Personnel';
        else if (category === 'REL')
            return 'Relationnel';
        return 'Environnement';
    }

    static cropTitle(title, maxLength = 20) {
        if (title.length > maxLength) {
            return title.slice(0, 20) + '...'
        }
        return title;
    }

    eventsToSubscribe() {
        return ['LOOK_FOR_UPDATE'];
    }

    componentDidMount() {
        if (this.inputRef)
            this.inputRef.focus();
        this.inputRef.value = this.value || '';
        $(this.selectKind).material_select();
    }

    render() {
        return (
            <div>
                <div id="modal-invite" class="modal">
                    <InviteModalContent />
                </div>
                <div id="modal-participate" class="modal">
                    <ParticipateModalContent />
                </div>
                <div class="boxed-layout">
                    <div class="row">
                        <div class="input-field col s8 offset-s2">
                            <i class="material-icons prefix">search</i>
                            <input type="text" value="" ref={ref => this.inputRef = ref}
                                onkeyup={event => {
                                    this.lastTimerId = this.timerId;
                                    if (this.lastTimerId) {
                                        clearTimeout(this.lastTimerId);
                                    }
                                    this.value = event.target.value;
                                    if (this.value.length < 3) {
                                        return;
                                    }
                                    this.timerId = setTimeout(() => {
                                        fetchJsonData(`/users/actions/matching-with-text?text=${this.value}`)
                                            .then(data => this.store.updateState({ lastActions: data }, 'LOOK_FOR_UPDATE'))
                                    }, 500);
                                }} />
                        </div>
                    </div>
                    {
                        ['PERS', 'REL', 'ENV'].map(category => {
                            return (
                                <div>
                                    <h3><small style="color:lightgrey">#</small>{LookForAction.getCategoryLabel(category)}</h3>
                                    <div class="container">
                                        <div class="columns col-gapless" style="min-height: 200px">
                                            {(this.state.lastActions
                                                .filter(action => action.kind === category) || [])
                                                .map(action => {
                                                    return (
                                                        <div class="column col-3">
                                                            <div class="popover popover-right" style="width: 100%">
                                                                <div style={
                                                                    `background-image: url('${action.image_url || 'http://via.placeholder.com/400x200'}');
                                                                background-size: cover; background-repeat: no-repeat; background-position: center center;
                                                                min-height: 200px; max-height: 200px; width: 100% important;
                                                                cursor: pointer;
                                                                `}
                                                                    onclick={() => {
                                                                        this.store.updateState({ participateAction: action }, 'PARTICIPATE_TO_REFRESH')
                                                                        $('#modal-participate').modal('open');
                                                                    }}
                                                                ></div>
                                                                <div class="popover-container" style="max-width: 250px">
                                                                    <div class="arrow-left"></div>
                                                                    <div class="card">
                                                                    <div class="card-content">
                                                                    <p style="display: flex;align-items: center;justify-content: space-around;">
                                                                        <a class="btn-floating waves-effect waves-light cyan lighten-2 tooltipped"
                                                                            data-position="bottom"
                                                                            data-tooltip="Voir les commentaires à propros de cette action"
                                                                            onclick={event => {
                                                                                withVeilAndMessages(
                                                                                    fetchJsonData(`/users/actions/${action.id}/commentaries`),
                                                                                    true
                                                                                ).then(commentaries =>
                                                                                    createSlider(
                                                                                        `Commentaires associées à cette action`,
                                                                                        <CommentariesTab
                                                                                            action={action}
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
                                                                                    fetchJsonData(`/users/actions/${action.id}/participants`),
                                                                                    true
                                                                                ).then(({ users, total_pages, current_page }) => {
                                                                                    createSlider(
                                                                                        `Participants`,
                                                                                        <ParticipantTab
                                                                                            users={users || []}
                                                                                            action={action}
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
                                                                            onclick={function (e) {
                                                                                console.log('clicked')
                                                                            }}>
                                                                            <i class="material-icons">add</i>
                                                                        </a>
                                                                    </p>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row" style="padding-top: 10px;">
                                                                <div class="col s6">
                                                                    <span style="font-weight: bold; padding-left: 5px;">
                                                                        {LookForAction.cropTitle(action.title)}
                                                                    </span>
                                                                </div>
                                                                <div class="col s3">
                                                                    <div class="popover popover-right">
                                                                        <img src={gravatar.url(action.creator.email, { s: '30' })}
                                                                            class="circle"
                                                                            style="margin-left: 10px"
                                                                        />
                                                                        <div class="popover-container">
                                                                            <div class="card">
                                                                                <div class="card-content black-text">
                                                                                    <span class="card-title">{action.creator.username}<small> life changer {moment(action.creator.created_at).fromNow()}</small></span>
                                                                                    <p><em>Titre:</em> Overlord</p>
                                                                                    <p style="display: flex;align-items: center;justify-content: space-around;">
                                                                                        <figure class="avatar-spec white-text" data-intial="100">
                                                                                        </figure>
                                                                                        <figure class="avatar-spec white-text" data-intial="100">
                                                                                        </figure>
                                                                                        <figure class="avatar-spec white-text" data-intial="100">
                                                                                        </figure>
                                                                                    </p>
                                                                                </div>
                                                                                <div class="card-action">
                                                                                    <a href="#">Voir son profile</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col s3">
                                                                    <div class="chip pull-right"
                                                                        style="margin-right: 15px;">
                                                                        {action.initial_nb_days + 'j'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}


class App extends SimpleDom.Component {
    render() {
        console.log(this.state);
        return (
            <div id="top" class="action">
                <h2 class="en-tete">J'agis</h2>
                <div class="boxed-layout" style="margin-top: 50px;">
                    <div class="row">
                        <div id="lookfor" class="col s12">
                            <LookForAction />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

$(document).ready(function () {

    const store = new SimpleDom.Store();
    withVeilAndMessages(
        fetchJsonData('/users/actions/last-actions'),
        true)
        .then(lastActions => {
            store.updateState({ lastActions });
            SimpleDom.renderToDom('container', <App />, store);

        });
});



