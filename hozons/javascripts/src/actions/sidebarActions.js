require('../home');
import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from '../components/veil/veil';

import './sidebarActions.less';
import '../css/avatar.less';
import '../css/tooltips.less';
const gravatar = require('gravatar');


let technicalId = 1;

class Tag extends SimpleDom.Component {

    constructor(props, store) {
        super(props, store);
        this.tag = this.props.tag;
        this.editMode = this.tag === null ? true : false;
        this.isActive = false;
    }

    eventsToSubscribe() {
        return [`REFRESH_TAG_${this.props.id}`];
    }

    render() {
        return (
            <li class={`sub-tag ${this.isActive ? 'active' : ''}`} 
                onclick={event => {
                    event.stopPropagation();
                    $('.sub-tag').removeClass('active');
                    if (this.editMode) {
                        return;
                    }                
                    this.isActive = !this.isActive;
                    this.store.updateState({}, `REFRESH_TAG_${this.props.id}`);
                }}
            >
            {SimpleDom.predicate(!this.editMode,
                () => {
                    const hasIcon = this.tag.sons && this.tag.sons.length;
                    let icon = !this.isActive ? 
                        <span class="lnr lnr-chevron-right sub-tag-list-icon"></span>
                        : <span class="lnr lnr-chevron-down sub-tag-list-icon"></span>;
                    return [
                        hasIcon ? icon : undefined,
                        <span class="sub-tag-name">{this.tag.name}</span>,
                        currentUser.id === this.tag.user_id ?
                        <span
                            onclick={event => {
                                event.stopPropagation();
                                this.editMode = true;
                                this.store.updateState({}, [`REFRESH_TAG_${this.props.id}`]);
                            }} 
                            class="hbtn-action lnr lnr-pencil sub-tag-edit">
                        </span> : undefined,
                        <span 
                            onclick={event => {
                                event.stopPropagation();
                                this.tag.sons.push(null);
                                this.isActive = true;
                                this.store.updateState({}, [`REFRESH_TAG_${this.props.id}`]);                                
                            }}  
                            class="hbtn-action lnr lnr-plus-circle sub-tag-edit">
                        </span> 
                ]},
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
                                    }
                                    withVeilAndMessages(
                                        fetchJsonData('/users/tags/create', {
                                            method: 'POST',
                                            body: JSON.stringify(sonTag)
                                        }), 
                                        true
                                    ).then((tag) => {
                                        this.tag = tag;
                                        this.editMode = false;
                                        this.store.updateState({}, [`REFRESH_TAG_${this.props.id}`]);
                                    })
                                    return;
                                }
                                console.log('updating...');
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
                                return <Tag tag={son} id={technicalId++} parentTag={this.tag}/>
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
                {this.props.tags.map(tag => {
                    return <Tag tag={tag} id={technicalId++} />
                })}
            </ul>
        );
    }
}

export class SidebarAction extends SimpleDom.Component {
    constructor(props, store) {
        super(props, store);
        this.isLoading = true;
        this.hasImage = true;
        this.tags = this.props.tags;
    }

    eventsToSubscribe() {
        return ['SIDEBAR_TO_UPDATE'];
    }

    componentDidMount() {
        if (this.isLoading) {
            this.profilImgUrl = gravatar.url(currentUser.email, { s: '50', d: '404' });
            fetch(this.profilImgUrl, {
                method: 'HEAD',
                mode: 'cors'
            })
            .then(response => {
                if (response.status === 404) {
                    this.hasImage = false;
                }
                this.isLoading = false;
                this.store.updateState({}, 'SIDEBAR_TO_UPDATE');
            })
        }
    }

    render() {
        if (this.isLoading) {
            return undefined;
        }
        return (
            <div class="sidebar-action">
                <div class="sidebar-action-header">
                    <div class="toggler-arrow" onclick={e => {
                        const elem = document.getElementsByClassName('sidebar-action')[0];
                        elem.classList.toggle('sidebar-minified');
                        const main = document.getElementsByClassName('boxed-layout')[0];
                        main.classList.toggle('boxed-layout-maximized');
                    }}>
                        <i class="lnr lnr-arrow-left-circle"></i>
                    </div>
                    <div class="sidebar-action-header-img">
                        {SimpleDom.predicate(this.hasImage,
                            () => <img class="circle" src={this.profilImgUrl}/>,
                            () => <div class="avatar-spec avatar-spec-lg"
                            style="color: white; background-color: #5764c6;"
                            data-initial={currentUser.username.slice(0, 2) || ''}

                          ><span class="sidebar-action-header-img-conf">
                              <i class="lnr lnr-cog"></i>
                            </span>
                            </div>
                        )}
                    </div>
                    <h2>{currentUser.email}</h2>
                </div>
                <div class="sidebar-action-content">
                    <TagList tags={this.props.tags} />
                </div>
                <div class="sidebar-action-spacer"></div>
                <div class="sidebar-action-footer">
                    <p class="sidebar-action-copyright">&copy; bemychange-2017</p>
                </div>
            </div>
        );

    }
}