import * as SimpleDom from 'simpledom-component';
import {ComposedComponent, ParentComponent} from '../../composedComponent'
import '../../css/empty.less';
import '../../css/common.less';
import './participants.less';

const gravatar = require('gravatar');

/*
class Pagination extends SimpleDom.Component {
    constructor(props, store) {
        super(props, store);
        console.log('current_page:' + this.props.current_page);
        this.current_page = this.props.current_page || 1;
    }
    render() {
        return (
            <ul class="pagination">
                <li class={this.current_page === 1 ? "disabled": "waves-effect"}>
                    <a href="#!"><i class="material-icons">chevron_left</i></a>
                </li>
                {[...Array(this.props.total_pages).keys()].map(number => {
                    return (
                        <li class={this.current_page === (number + 1) ? "active": "waves-effect"}>
                            <a href={this.current_page === (number + 1) ? '#': this.props.baseUrl + (number + 1)}>
                                {number + 1}
                            </a>
                        </li>
                    );
                })}
                <li class={this.current_page === this.props.total_pages ? "disabled": "waves-effect"}>
                    <a href="#!"><i class="material-icons">chevron_right</i></a>
                </li>
            </ul>
        );
    }
 }
*/

class Participant extends ComposedComponent {
    eventsToSubscribe() {
        return ['PARTICIPANT_TO_UPDATE'];
    }

    render() {
        return (
            <li style="pointer: cursor; display: flex; flex-direction: column; justify-content: center;"
                class="collection-item avatar">
                <div style="display: flex; justify-content: space-around;">
                    {SimpleDom.predicate(this.props.user.email,
                        () => <img class="circle" src={gravatar.url(this.props.user.email, {s: '60'})}/>,
                        () => <div class="avatar-spec avatar-spec-sm"
                                   style="color: white; background-color: #5764c6;"
                                   data-initial={this.props.user.username.slice(0, 2) || ''}
                        />
                    )}
                    <p class="info-points">
                    <span class="title">
                        <a target="_blank"
                           href={`/users/profile?name=${this.props.user.username}`}>{this.props.user.username}</a>
                        </span>
                        <br/>
                        <span>
                    {this.props.user.points_pers
                    + this.props.user.points_env
                    + this.props.user.points_rel
                    }
                </span> points
                    </p>
                    <div class="participant-action">
                        <p class="action">
                            <span class="lnr lnr-plus-circle"/>
                            Ajouter à mes connexions
                        </p>
                        <p class="action">
                            <span class="lnr lnr-bubble"/>
                            Envoyer un message
                        </p>
                    </div>
                </div>
            </li>
        );
    }
}

class ParticipantList extends ComposedComponent {

    render() {
        return (
            <ul class="collection">
                {this.cstate.users.map(user => <Participant parent={this.props.parent} user={user}/>)}
            </ul>
        );
    }
}

export class ParticipantTab extends ParentComponent {
    constructor(props, store) {
        super(props, store);
        this.cstate = {
            users: this.props.users,
            action: this.props.action,
            total_pages: this.props.total_pages,
            current_page: this.props.current_page
        };
    }

    render() {
        return (
            <div class="action-info">
                <h4 class="action-info-title">
                    <img class="action-info-image" src={this.props.action.image_url}/>
                    <span>{this.props.action.title}</span>
                </h4>
                <div class="action-info-author">Créé par <span>{this.props.action.creator.username}</span></div>
                <div class="row" style="padding: 0 15%">
                    <ParticipantList
                        parent={this}
                    />
                </div>
            </div>
        );
    }
}