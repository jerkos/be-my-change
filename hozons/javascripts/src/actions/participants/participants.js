import * as SimpleDom from 'simpledom-component';
import { ComposedComponent, ParentComponent } from '../../composedComponent'
import { withVeilAndMessages } from '../../components/veil/veil';
require('../../css/empty.less');
import '../../css/common.less';
const gravatar = require('gravatar');


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


class Participant extends ComposedComponent {
    eventsToSubscribe() {
        return ['PARTICIPANT_TO_UPDATE'];
    }

    render() {
        return (
            <a onclick={() => {
                    withVeilAndMessages(
                        fetchJsonData(`/users/actions/get/${this.props.user.id}/${this.cstate.action.id}`),
                        true
                    ).then(userAction =>
                        this.updateCState({ selectedUser: this.props.user, selectedUserAction: userAction }, 'UPDATE_USER_PANEL')
                    )
                }}
                style="pointer: cursor" class="collection-item">
                {SimpleDom.predicate(this.props.user.email,
                    () => <img class="circle" src={gravatar.url(this.props.user.email, { s: '30' })} />,
                    () => <div class="avatar-spec avatar-spec-sm"
                            style="color: white; background-color: #5764c6;"
                            data-initial={this.props.user.username.slice(0, 2) || ''}
                          />
                )}
                <strong style="padding-left: 20px;">{this.props.user.username}</strong>
            </a>
        );
    }
}

class ParticipantList extends ComposedComponent {
    partitionList(input, spacing) {
        let output = [];
        for (let i = 0; i < input.length; i += spacing) {
            output[output.length] = input.slice(i, i + spacing);
        }
        return output;
    }

    render() {
        return (
            <div class={`col s${this.props.col || 6}`}>
                <div>
                    {this.partitionList((this.cstate.users || []), 2).map(userList =>
                        <div class="row">
                            {userList.map(user =>
                                <div class="col m6 s12">
                                    <Participant parent={this.props.parent} user={user} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <Pagination
                    total_pages={this.cstate.total_pages}
                    current_page={this.cstate.current_page}
                    baseUrl={`/users/actions/${this.cstate.action.id}/participants?page=`}
                />
            </div>
        );
    }
}

class InformationPane extends ComposedComponent {
    eventsToSubscribe() {
        return ['UPDATE_USER_PANEL'];
    }

    render() {
        console.log(this.cstate);
        return (
            <div class={`col s${this.props.col || 6}`}>
                {SimpleDom.predicate(this.cstate.selectedUser, () => {
                    const userAction = this.cstate.selectedUserAction;
                    return (
                        <div>
                            <h1>{this.cstate.selectedUser.username}</h1>
                            <div style="padding: 5px 0;">
                                <div style="display: inline-block; min-width: 150px;"><em>Action entreprise le:</em></div>
                                <div style="display: inline-block; padding: 5px 10px; background-color: lightgrey; border-radius: 5px">
                                    {userAction.created_date || 'Iconnu...'}
                                </div>
                            </div>
                            <div style="padding: 5px 0;">
                                <div style="display: inline-block; min-width: 150px;">Action commencée le: </div>
                                <div style="display: inline-block; padding: 5px 10px; background-color: lightgrey; border-radius: 5px">
                                    {userAction.start_date}
                                </div>
                            </div>
                            <div style="padding: 5px 0;">
                                <div style="display: inline-block; min-width: 150px;">Action terminée le: </div>
                                <div style="display: inline-block; padding: 5px 10px; background-color: lightgrey; border-radius: 5px">
                                    {userAction.end_date}
                                </div>
                            </div>
                            <div style="padding: 5px 0;">
                                <div style="display: inline-block; min-width: 150px;"># défis réussi: </div>
                                <div style="display: inline-block; padding: 5px 10px; background-color: lightgrey; border-radius: 5px">
                                    {userAction.nb_succeed}
                                </div>
                            </div>
                            <div>
                                <a class="right waves-effect waves-light btn"><i class="material-icons left">cloud</i>PROFIL</a>
                            </div>
                        </div>
                    );
                }, () => {
                    return (
                        <section class="empty">
                            <div class="empty-icon">
                                <i class="lnr lnr-user fa-3x"></i>
                            </div>
                            <h4 class="empty-title">Sélectionner un utilisateur</h4>
                            <p class="empty-subtitle">Click the button to start a conversation</p>
                        </section>
                    )
                })}
            </div>
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
        console.log(this.cstate);
    }

    componentDidMount() {
        setTimeout(this.searchInput.focus(), 1000);
    }

    render() {
        return (
            <div>
                <h2 class="inspire en-tete"></h2>
                <div class="row">
                    <div class='col s8 offset-s2'>
                        <nav class="search-nav">
                            <div class="nav-wrapper">
                                <form>
                                    <div class="input-field">
                                        <input id="search" type="search" ref={ref => this.searchInput = ref} />
                                        <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                                        <i class="material-icons">close</i>
                                    </div>
                                </form>
                            </div>
                        </nav>
                    </div>
                </div>
                <div class="row">
                    <ParticipantList
                        parent={this}
                        col={12}
                    />
                </div>
            </div>
        );
    }
}