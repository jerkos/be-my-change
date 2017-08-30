import * as SimpleDom from 'simpledom-component';
import { ComposedComponent, ParentComponent } from '../composedComponent'
require('../css/empty.less');

class Participant extends ComposedComponent {
    render() {
        return (
            <a onclick={() => this.updateCState({ selectedUser: this.props.user }, 'UPDATE_USER_PANEL')}
                style="pointer: cursor" class="collection-item">
                <div class="avatar-spec avatar-spec-sm"
                    style="color: white; background-color: #5764c6;"
                    data-initial={this.props.user.username.slice(0, 2) || ''}
                />
                <strong style="padding-left: 20px;">{this.props.user.username}</strong>
            </a>
        );
    }
}

class ParticipantList extends ComposedComponent {   
    render() {
        return (
            <div class={`col s${this.props.col || 6}`}>
                <ul class="collection">
                    {(this.cstate.users || []).map(user =>
                        <Participant parent={this.props.parent} user={user} />
                    )}
                </ul>
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
                    const userAction = this.cstate.selectedUser.user_actions.find(uaction => uaction.id === uaction.id);
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
        this.cstate = { users: this.props.users };
        console.log(this.cstate);
    }

    componentDidMount() {
        setTimeout(this.searchInput.focus(), 1000);
    }

    render() {
        return (
            <div>
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
                    />
                    <InformationPane
                        parent={this}
                    />
                </div>
            </div>
        );
    }
}