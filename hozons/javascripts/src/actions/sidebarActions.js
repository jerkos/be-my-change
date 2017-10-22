require('../home');
import * as SimpleDom from 'simpledom-component';
import './sidebarActions.less';
import '../css/avatar.less';
import '../css/tooltips.less';
const gravatar = require('gravatar');


class Tag extends SimpleDom.Component {

    constructor(props, store) {
        super(props, store);
        this.tag = this.props.tag;
        this.editMode = false;
        this.isActive = false;
    }

    eventsToSubscribe() {
        return [`REFRESH_TAG_${this.props.tag.id}`];
    }

    componentDidMount() {
        $('.sub-tag').hover(
            function(event) {
                $(this).addClass('hovered'); 
                $(this).parents('li.sub-tag').removeClass('hovered');                 
            },
            function(event){
                $(this).removeClass('hovered');
                $(this).parents('.sub-tag').removeClass('hovered');                                     
            }
        );
    }

    render() {
        return (
            <li class="sub-tag" 
                onclick={event => {
                    event.stopPropagation();                    
                    this.isActive = !this.isActive;
                    this.store.updateState({}, `REFRESH_TAG_${this.props.tag.id}`);
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
                        <span>{this.tag.name}</span>, 
                        <span
                            onclick={event => {
                                event.stopPropagation();
                                this.editMode = true;
                                this.store.updateState({}, [`REFRESH_TAG_${this.tag.id}`]);
                            }} class="lnr lnr-pencil sub-tag-edit">
                        </span>
                ]},
                () => <input type="text" value={this.tag.name} />
            )}
            {SimpleDom.predicate(this.tag.sons && this.tag.sons.length,
                () => {
                    return (
                        <ul class={`sub-tag-list sub-${this.tag.id} ${this.isActive ? 'active' : ''}`}>
                            {this.tag.sons.map(son => {
                                return <Tag tag={son} />
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
                    return <Tag tag={tag} />
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
                    <p class="sidebar-action-copyright">copyright bemychange-2017</p>
                </div>
            </div>
        );

    }
}