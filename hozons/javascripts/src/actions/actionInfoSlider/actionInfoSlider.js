import * as SimpleDom from 'simpledom-component';

const moment = require('moment');
require('moment/locale/fr');

import './actionInfoSlider.less';
import '../../css/empty.less';
import {withVeilAndMessages} from "../../components/veil/veil";


class JournalEntries extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['JOURNAL_ENTRIES_TO_REFRESH'];
    }

    constructor(props, store) {
        super(props, store);
        this.editMode = false;
        this.currentText = undefined;
        this.entries = this.props.entries;
    }

    render() {
        return (
            <div class="action-info-journal">
                {SimpleDom.predicate(this.entries.length,
                    () => <ul class="collection action-info-journal-list">
                        {this.entries.map(entry => {
                            return (
                                <li class="collection-item">
                                    <span class="title">
                                        {moment().format('dddd DD MMMM YYYY')}
                                    </span>
                                    <p>{entry.content}</p>
                                </li>
                            );
                        })}
                    </ul>,
                    () => {
                        return (
                            <section class="empty">
                                <div class="empty-icon">
                                    <i class="lnr lnr-rocket fa-3x"/>
                                </div>
                                <h4 class="empty-title">Votre journal est encore vide...</h4>
                                <p class="empty-subtitle">
                                    Ecrivez votre premier ressenti !
                                </p>
                            </section>
                        );
                    }
                )}
                {SimpleDom.predicate(this.editMode,
                    () => {
                        return (
                            <div>
                                <textarea class="materialize-textarea"
                                          onchange={event => this.currentText = event.target.value}
                                />
                                <button class="btn right" onclick={ () => {
                                    const journal = {
                                        content: this.currentText,
                                        action_id: this.props.userAction.action_id,
                                        is_journal: true
                                    };
                                    this.entries.push(journal);
                                    this.editMode = false;
                                    withVeilAndMessages(
                                        fetchJsonData(`/users/actions/${this.props.userAction.action_id}/commentaries`, {
                                            method: 'POST',
                                            body: JSON.stringify(journal)
                                        }),
                                        true
                                    ).then(() => {
                                        this.store.updateState({}, 'JOURNAL_ENTRIES_TO_REFRESH');
                                    })
                                }}>Publier</button>
                            </div>
                        );
                    },
                    () => <a class="hbtn hbtn-action" onclick={() => {
                        this.editMode = true;
                        this.store.updateState({}, 'JOURNAL_ENTRIES_TO_REFRESH');
                    }}>+</a>
                )}
            </div>
        );
    }
}

export class ActionInfo extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['ACTION_INFO_TO_REFRESH'];
    }

    constructor(props, store) {
        super(props, store);
        this.userAction = this.props.userAction;
        this.action = this.userAction.action;
        this.journalEntries = this.props.journalEntries;
        this.editDescription = false;
        this.descriptionContent = this.action.description || '';
    }
    render() {
        return (
            <div class="action-info">
                <h4 class="action-info-title">{this.action.title}</h4>
                <h6 class="action-info-subtitle">Description</h6>
                {SimpleDom.predicate(this.editDescription,
                    () => {
                        return (
                            <textarea class="action-info-editor materialize-textarea"
                                      onblur={event => {
                                          console.log(event.target.value);
                                          this.editDescription = false;
                                          this.descriptionContent = event.target.value;
                                          withVeilAndMessages(
                                              fetchJsonData('/users/actions/create', {
                                                  method: 'PUT',
                                                  body: JSON.stringify({
                                                      actionDescription: this.descriptionContent,
                                                      actionId: this.action.id
                                                  })
                                              })
                                          ).then(() => {
                                              this.userAction.action.description = this.descriptionContent;
                                              this.store.updateState({}, 'ACTION_INFO_TO_REFRESH')
                                          })
                                      }}
                            >
                                {this.descriptionContent}
                            </textarea>
                        )
                    },
                    () => {
                        return (
                            <p class={`action-info-description ${this.action.creator_user_id === currentUser.id ? 'active' : undefined}`}>
                                <span class="action-info-description-edit lnr lnr-pencil"
                                      onclick={() => {
                                          this.editDescription = true;
                                          this.store.updateState({}, 'ACTION_INFO_TO_REFRESH');
                                      }}
                                />
                                {this.descriptionContent.split('\n').map(line => <div>{line}<br/></div>)}
                            </p>
                        );
                    }
                )}
                <h6 class="action-info-subtitle">Journal</h6>
                <JournalEntries
                    entries={this.journalEntries}
                    userAction={this.userAction}
                />
            </div>
        );
    }
}