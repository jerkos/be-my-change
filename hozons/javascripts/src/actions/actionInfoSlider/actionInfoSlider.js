import * as SimpleDom from 'simpledom-component';
import './actionInfoSlider.less';
import '../../css/empty.less';


class JournalEntries extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['JOURNAL_ENTRIES_TO_REFRESH'];
    }

    render() {
        return (
            <div class="action-info-journal">
                {SimpleDom.predicate(this.props.entries.length,
                    () => <ul class="action-info-journal-list">
                        {this.props.entries.map(entry => {
                            return (
                                <li>{entry.content}</li>
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

                <a class="hbtn hbtn-action">+</a>
            </div>
        );
    }
}

export class ActionInfo extends SimpleDom.Component {
    constructor(props, store) {
        super(props, store);
        this.userAction = this.props.userAction;
        this.action = this.userAction.action;
        this.journalEntries = this.props.journalEntries;
        this.editDescription = false;
    }
    render() {
        return (
            <div class="action-info">
                <h4 class="action-info-title">{this.action.title}</h4>
                <h6 class="action-info-subtitle">Description</h6>
                {SimpleDom.predicate(this.editDescription,
                    () => <textarea class="action-info-editor">{this.action.description}</textarea>,
                    () => <p class="action-info-description">{this.action.description}</p>
                )}
                <h6 class="action-info-subtitle">Journal</h6>
                <JournalEntries
                    entries={this.journalEntries}
                />
            </div>
        );
    }
}