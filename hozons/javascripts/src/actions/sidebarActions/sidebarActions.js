import '../../home';
import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from '../../components/veil/veil';

import './sidebarActions.less';
import '../../css/avatar.less';
import '../../css/tooltips.less';


let technicalId = 1;

class Tag extends SimpleDom.Component {

    constructor(props, store) {
        super(props, store);
        this.tag = this.props.tag;
        this.editMode = this.tag === null;
        this.isActive = this.state.activeTags.has((this.tag || {}).tag_slug) || false;
        this.isHighlighted = false;
    }

    eventsToSubscribe() {
        return [`REFRESH_TAG_${this.props.id}`];
    }

    handleTagActivity(event) {
        $('.sub-tag').removeClass('active');
        event.stopPropagation();
        this.isActive = !this.isActive;
        let newActiveTags = this.state.activeTags;

        if (this.isActive) {
            newActiveTags.add(this.tag.tag_slug)
        } else {
            newActiveTags.delete(this.tag.tag_slug);
        }
        this.store.updateState({activeTags: newActiveTags}, `REFRESH_TAG_${this.props.id}`);
    }

    render() {
        return (
            <li class={`sub-tag ${this.state.activeTags.has((this.tag || {}).tag_slug) ? 'active' : ''} ${this.isHighlighted ? 'highlighted': ''}`}
                onclick={event => {
                    event.stopPropagation();
                    $('.sub-tag').removeClass('highlighted');
                    if (this.editMode) {
                        return;
                    }
                    if (! this.isHighlighted) {
                        this.isHighlighted = true;
                    }
                    //this.isHighlighted = !this.isHighlighted;
                    if (this.props.onFilterClick) {
                        this.props.onFilterClick(this.tag);
                    }
                    this.store.updateState({
                        selectedTagSlug: this.tag.tag_slug
                    }, 'ACTION_VIEW_TO_UPDATE', `REFRESH_TAG_${this.props.id}`);
                }}
            >
            {SimpleDom.predicate(!this.editMode,
                () => {
                    const hasIcon = this.tag.sons && this.tag.sons.length;
                    let icon = !this.isActive ? 
                        <span class="lnr lnr-plus-circle sub-tag-list-icon"
                            onclick={event => this.handleTagActivity(event)}
                        />
                        : <span class="lnr lnr-circle-minus sub-tag-list-icon"
                                onclick={event => this.handleTagActivity(event)}
                        />;
                    return (
                        <div class="sub-tag-name">
                            <div class="sub-tag-name-item"> 
                                {SimpleDom.predicate(hasIcon, () => icon)}
                                {`${this.tag.name} (${this.state.countByTagSlug[this.tag.tag_slug] || 0})`}
                            </div>
                            <div class="sub-tag-hover-icons">
                                <span
                                    onclick={event => {
                                        event.stopPropagation();
                                        this.editMode = true;
                                        this.store.updateState({}, [`REFRESH_TAG_${this.props.id}`]);
                                    }} 
                                    class="hbtn-action lnr lnr-pencil sub-tag-edit">
                                </span>
                                {SimpleDom.predicate(!this.state.countByTagSlug[this.tag.tag_slug],
                                    () => < span
                                        onclick={event => {
                                            event.stopPropagation();
                                            withVeilAndMessages(
                                                fetchJsonData(`/users/tags/delete/${this.tag.id}`,
                                                    {method: 'DELETE'}),
                                                true
                                            ).then(()=> {
                                                if (this.props.parentTag) {
                                                    const sons = this.props.parentTag.sons.filter(son => son.id !== this.tag.id);
                                                    this.props.parentTag.sons = sons;
                                                    this.isActive = true;
                                                    this.store.updateState({}, [`REFRESH_TAG_${this.props.parentId}`]);
                                                } else {
                                                    const tags = this.state.tags.filter(tag => tag.id !== this.tag.id);
                                                    this.store.updateState({tags}, ["SIDEBAR_TO_UPDATE"]);
                                                }
                                            });
                                    }}
                                    class="hbtn-action lnr lnr-trash sub-tag-edit">
                                    </span>
                                )}
                            </div>
                        </div>
                    )
                },
                () => <input type="text" 
                            class="sub-tag-input" 
                            onblur={event => {
                                event.stopPropagation();
                                const value = event.target.value;                                
                                if (!this.tag) {
                                    const sonTag = {
                                        name: value, 
                                        parent_id: this.props.parentTag.id,
                                        rank: this.props.parentTag.rank + 1,
                                        user_id: currentUser.id
                                    };
                                    withVeilAndMessages(
                                        fetchJsonData('/users/tags/create', {
                                            method: 'POST',
                                            body: JSON.stringify(sonTag)
                                        }), 
                                        true
                                    ).then((tag) => {
                                        this.tag = tag;
                                        this.props.parentTag.sons.pop();
                                        this.props.parentTag.sons.push(tag);
                                        this.editMode = false;
                                        this.store.updateState({}, [`REFRESH_TAG_${this.props.id}`]);
                                    });
                                    return;
                                }
                                withVeilAndMessages(
                                    fetchJsonData('/users/tags/update', {
                                        method: 'PUT',
                                        body: JSON.stringify({id: this.tag.id, name: value})
                                    }), 
                                    true
                                ).then((tag) => {
                                    this.tag.name = tag.name;
                                    this.editMode = false;
                                    this.store.updateState({}, [`REFRESH_TAG_${this.props.id}`]);                                    
                                })
                            }}
                            value={(this.tag || {}).name} 
                        />
            )}
            {SimpleDom.predicate(this.tag && this.tag.sons && this.tag.sons.length,
                () => {
                    return (
                        <ul class={`sub-tag-list sub-${this.tag.id} ${this.isActive ? 'active' : ''}`}>
                            {this.tag.sons.map((son,i) => {       
                                return <Tag tag={son} id={technicalId++} parentTag={this.tag} parentId={this.props.id}/>
                            })}
                        </ul>
                    );
                }
            )}
            </li>
        );
    }
}

class TagList extends SimpleDom.Component {

    render() {
        return (
            <ul class="main-tag-list">
                <li class="sub-tag highlighted">
                    <div class="sub-tag-name">
                        <div class="sub-tag-name-item" style="flex-basis:100% !important;text-transform:uppercase;text-align:center;padding-right:20px;"
                            onclick={() => {
                                $('.sub-tag').removeClass('highlighted');
                                document.querySelector('.main-tag-list > .sub-tag').classList.add('highlighted');
                                this.state.selectedActions = this.state.actions;
                                this.store.updateState({}, 'ACTIONS_LIST_TO_UPDATE', 'MAIN_TITLE_TO_UPDATE');
                            }}
                        >
                            <span class="lnr lnr-layers" style="font-size:1.7em;margin-right:10px"/>
                             Tout sélectionner
                        </div>
                    </div>
                </li>
                {this.state.tags.map(tag => {
                    return <Tag tag={tag} id={technicalId++} />
                })}
            </ul>
        );
    }
}

export class SidebarAction extends SimpleDom.Component {
    constructor(props, store) {
        super(props, store);
        this.isLoading = false;
        this.hasImage = true;
    }

    eventsToSubscribe() {
        return ['SIDEBAR_TO_UPDATE'];
    }

    render() {
        if (this.isLoading) {
            return undefined;
        }
        return (
            <div class="sidebar-action">
                <div class="sidebar-action-header">
                    <div class="toggler-arrow" onclick={() => {
                        const elem = document.getElementsByClassName('sidebar-action')[0];
                        elem.classList.toggle('sidebar-minified');
                        const main = document.getElementsByClassName('boxed-layout')[0];
                        main.classList.toggle('boxed-layout-maximized');
                        this.store.updateState({minisidebar: !this.state.minisidebar}, 'ACTIONS_LIST_TO_UPDATE');
                    }}>
                        <i class="lnr lnr-arrow-left"/>
                    </div>
                    <div class="sidebar-action-header-img">
                        <div class="avatar-spec avatar-spec-lg"
                            style="color: white; background-color: #5764c6; display:inline-flex; flex-direction: column; justify-content: center; text-align:center;">
                            <span class="lnr lnr-list">
                            </span>
                         </div>
                    </div>
                </div>
                <div class="sidebar-action-content">
                    <TagList/>
                </div>
                <div class="sidebar-action-spacer"/>
                <div class="sidebar-action-footer">
                    <p class="sidebar-action-copyright">&copy; bemychange-2017</p>
                </div>
            </div>
        );
    }
}