import '../../home';
import * as SimpleDom from 'simpledom-component';

const moment = require('moment');
require('moment/locale/fr');
const SimpleMDE = require('simplemde');

import './actionInfoSlider.less';
import '../../css/empty.less';
import {withVeilAndMessages} from "../../components/veil/veil";
import {getFullTag, updateSidebarTags} from "../utils";
import {TagSelector} from "../tagSelector/tagSelector";
import "../tagSelector/tagSelector.less";
import {saveCommentary, updateCommentary} from "../../services/commentary";
import {updateUserAction} from "../../services/action";
import {changeTags} from "../../services/tag";


class ModifiableTextArea extends SimpleDom.Component {

    eventsToSubscribe() {
        return [`ENTRY_TO_REFRESH_${this.props.id}`];
    }

    constructor(props, store) {
        super(props, store);
        this.editMode = this.props.editMode || false;
        this.mdeEditor = undefined;
        this.markdownContent = this.props.content || '';
        this.validateButtonText = this.props.buttonText || 'Valider';
    }

    componentDidMount() {
        if (this.editMode) {
            this.mdeEditor = new SimpleMDE({
                element: document.getElementById(`entryEditor${this.props.id}`)
            });
        } else {
            const element = document.getElementById(`entryTarget${this.props.id}`);
            if (this.mdeEditor) {
                this.markdownContent = this.mdeEditor.value();
            }
            element.innerHTML = SimpleMDE.prototype.markdown(this.markdownContent);
        }
    }

    render() {
        if (this.editMode) {
            return (
                <div style="overflow: scroll;">
                    <textarea id={`entryEditor${this.props.id}`}>
                        {this.markdownContent}
                    </textarea>
                    <button class="btn right"
                            onclick={() => {
                                this.editMode = false;
                                this.markdownContent = this.mdeEditor.value();
                                this.props.onValidate(this.markdownContent)
                                    .then(() => this.store.updateState({}, `ENTRY_TO_REFRESH_${this.props.id}`))
                            }}
                    >
                        {this.validateButtonText}
                    </button>
                </div>
            );
        }
        return (
            <div class="mde-container">
                <div class="mde-container-action">
                    <a href="#" class="hbtn hbtn-action edit-button edit-button-pencil"
                       onClick={() => {
                           this.editMode = true;
                           this.store.updateState({}, `ENTRY_TO_REFRESH_${this.props.id}`)
                       }}
                    >
                        <i class="lnr lnr-pencil"/>
                    </a>
                    <a href="#" class="hbtn hbtn-action edit-button edit-button-trash"
                       onClick={() => {
                           const journalEntries = this.state.journalEntries.filter(
                               entry => entry.id !== this.props.entryId
                           );
                           this.store.updateState({journalEntries}, 'JOURNAL_ENTRIES_TO_REFRESH');
                       }}
                    >
                        <i class="lnr lnr-trash"/>
                    </a>
                </div>
                <p id={`entryTarget${this.props.id}`}>
                </p>
            </div>
        );
    }
}


class JournalEntry extends SimpleDom.Component {

    constructor(props, store) {
        super(props, store);
        this.entry = this.props.entry;
        this.markdownContent = (this.props.entry || {}).content || '';
    }

    render() {
        technicalId++;
        return (

            <li class="collection-item" style="position: relative">
                <div class="row">
                    <span class="title">
                        {moment(this.entry.created_at).format('dddd DD MMMM YYYY') ||
                        moment().format('dddd DD MMMM YYYY')}
                    </span>
                    <ModifiableTextArea
                        id={technicalId}
                        entryId={this.entry.id}
                        content={this.markdownContent}
                        onValidate={markdownContent => {
                            return withVeilAndMessages(
                                updateCommentary(this.entry.id, {
                                    content: markdownContent,
                                    commentaryId: this.entry.id
                                }),
                                true
                            ).then(commentary => {
                                let entry = this.state.journalEntries.find(comm => comm.id === commentary.id);
                                entry.content = commentary.content;
                                this.store.updateState({journalEntries: this.state.journalEntries});
                            });
                        }}
                    />
                </div>
            </li>

        );
    }
}


let technicalId = 0;

class JournalEntries extends SimpleDom.Component {

    eventsToSubscribe() {
        return ['JOURNAL_ENTRIES_TO_REFRESH'];
    }

    constructor(props, store) {
        super(props, store);
        this.editMode = false;
    }

    render() {
        return (
            <div class="action-info-journal">
                {SimpleDom.predicate(this.state.journalEntries.length,
                    () => <ul class="collection action-info-journal-list">
                        {this.state.journalEntries.map(entry =>
                            <JournalEntry
                                userAction={this.props.userAction}
                                entry={entry}
                            />
                        )}
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
                            <ModifiableTextArea
                                id={technicalId++}
                                content={''}
                                editMode={true}
                                onValidate={markdownContent => {
                                    this.editMode = false;
                                    const journal = {
                                        content: markdownContent,
                                        action_id: this.props.userAction.action_id,
                                        is_journal: true
                                    };
                                    return withVeilAndMessages(
                                        saveCommentary(this.props.userAction.action_id, journal),
                                        true
                                    ).then(commentary => {
                                        this.state.journalEntries.push(commentary);
                                        this.store.updateState({}, 'JOURNAL_ENTRIES_TO_REFRESH');
                                    })
                                }}/>
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
        store.updateState({journalEntries: this.props.journalEntries});
        this.descriptionContentAsText = this.action.description || '';
        this.mdeDescriptionEditor = undefined;
        this.tagsAsText = getFullTag(this.userAction, this.props.tags);
        console.log(this.action);
        store.updateState({tags: this.props.tags});
    }

    componentDidMount() {
        this.props.userAction.tags
            .concat(this.props.userAction.tagsToCreate || [])
            .forEach((tag, i) =>
                tippy(`#card-image-tag-${i}`, {
                    html: document.querySelector(`#card-edit-tag-slider-${i}`),
                    theme: 'light',
                    arrow: true,
                    distance: 15,
                    placement: 'top',
                    trigger: 'click',
                    interactive: true,
                    size: 'large',
                    onShown: () => $(`#card-edit-tag-slider-${i} input`).focus()
                })
            );
        tippy('.add-tag', {
            html: document.querySelector('#card-edit-tag-add'),
            theme: 'light',
            arrow: true,
            distance: 15,
            placement: 'top',
            trigger: 'click',
            interactive: true,
            size: 'large',
            onShown: () => $(`#card-edit-tag-add`).find(`input`).focus()
        })
    }

    render() {
        return (
            <div class="action-info" style="padding-bottom: 50px;">
                <div class="row" style="margin: 0;">
                    <span class="lnr lnr-cross fa-3x slider-cross"
                          onclick={() => {
                              this.props.sliderClose();
                              this.props.onClose({tags: this.state.tags, user_action: this.props.userAction});
                          }}
                    />
                </div>
                <h4 class="action-info-title">
                    <img class="action-info-image" src={this.userAction.action.image_url}/>
                    <span>{this.action.title} <span class="lnr lnr-thumbs-up"></span>{this.action.nblike}</span>
                </h4>
                <div class="action-info-author">Créé par <span>Mathieu</span></div>
                <div class="row">
                    <div class="action-info-menu">
                        <ul>
                            <li><a href="#description">Description</a></li>
                            <li><a href="#journal">Journal</a></li>
                            <li><a href="#tags">Tags</a></li>
                        </ul>
                    </div>
                    <div style="padding-left:15%">
                        <div class="action-info-description-container">
                            <h6 class="action-info-subtitle" id="description">Description</h6>
                            <ModifiableTextArea
                                id={technicalId++}
                                content={this.descriptionContentAsText}
                                onValidate={markdownContent => {
                                    return withVeilAndMessages(
                                        updateUserAction({
                                            actionDescription: markdownContent,
                                            actionId: this.action.id
                                        }),
                                        true
                                    );
                                    /*.then(() => {
                                    this.userAction.action.description = markdownContent;
                                    this.store.updateState({}, 'ACTION_INFO_TO_REFRESH')
                                })*/
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div style="padding-left:15%">
                    <div class="row">
                        <h6 class="action-info-subtitle" id="journal">Journal</h6>
                        <JournalEntries userAction={this.userAction}/>
                    </div>
                    <h6 class="action-info-subtitle" id="tags">Tags</h6>
                    <div class="tag-container">
                        {this.tagsAsText
                            .concat(this.userAction.tagsToCreate || [])
                            .map((tag, i) => {
                                return (
                                    <div class="one-tag">
                                        <div id={`card-edit-tag-slider-${i}`}>
                                            <div class="tag-change-content">
                                                <h4>Changer de tag</h4>
                                                <div class="tag-change-validate">
                                                    <TagSelector tags={tag} id={i}/>
                                                    <a href="#" class="hbtn"
                                                       onclick={() => {
                                                           //const newTags = state.tagsToCreate.split('/');
                                                           //let existingTags = state.tags;
                                                           const result = updateSidebarTags(this.state);
                                                           withVeilAndMessages(
                                                               changeTags(this.userAction.id, {
                                                                   tagsToCreate: result.tagsToCreate,
                                                                   tagsSlug: result.tagsSlug
                                                               }, this.userAction.tags[i].id),
                                                               true
                                                           ).then(({tags, user_action}) => {
                                                               this.props.userAction = user_action;
                                                               this.tagsAsText[i] = this.state.tagsToCreate;
                                                               tippy().destroyAll();
                                                               document.getElementById(`card-image-tag-${i}`)._tippy.hide();
                                                               this.store.updateState({tags}, 'ACTION_INFO_TO_REFRESH');
                                                           })
                                                       }}
                                                    >
                                                        Valider
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id={`card-image-tag-${i}`}
                                             onclick={e => {
                                                 e.preventDefault();
                                                 e.stopPropagation();
                                             }}>
                                            {tag}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div id={`card-edit-tag-add`}>
                        <div class="tag-change-content">
                            <h4>Ajouter un tag</h4>
                            <div class="tag-change-validate">
                                <TagSelector tags={''} id={999}/>
                                <a href="#" class="hbtn"
                                   onclick={() => {
                                       const result = updateSidebarTags(this.state);
                                       withVeilAndMessages(
                                           changeTags(this.userAction.id, {
                                               tagsToCreate: result.tagsToCreate,
                                               tagsSlug: result.tagsSlug
                                           }),
                                           true
                                       ).then(({tags, user_action}) => {
                                           this.props.userAction = user_action;
                                           if (!this.userAction.tagsToCreate) {
                                               this.userAction.tagsToCreate = [];
                                           }
                                           this.userAction.tagsToCreate.push(this.state.tagsToCreate);
                                           tippy().destroyAll();
                                           $('.add-tag')[0]._tippy.hide();
                                           this.store.updateState({tags}, 'ACTION_INFO_TO_REFRESH');
                                       })
                                   }}
                                >
                                    Valider
                                </a>
                            </div>
                        </div>
                    </div>
                    <a href="#" class="add-tag hbtn hbtn-action">+</a>
                </div>
            </div>
        );
    }
}