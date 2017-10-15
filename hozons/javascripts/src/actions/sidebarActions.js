require('../home');
import * as SimpleDom from 'simpledom-component';
import './sidebarActions.less';
import '../css/avatar.less';
import '../css/tooltips.less';
const gravatar = require('gravatar');

export class SidebarAction extends SimpleDom.Component {
    constructor(props, store) {
        super(props, store);
        this.isLoading = true;
        this.hasImage = true;

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
                    <p class="sidebar-action-content-entry">
                        <span class="lnr lnr-rocket fa-2x tooltip tooltip-right" data-tooltip="Mes actions en cours"></span>
                        <a href="/users/actions/current">Mes actions en cours</a>
                    </p>
                    <p class="sidebar-action-content-entry">
                        <span class="lnr lnr-magnifier fa-2x"></span>                      
                        <a href="/users/actions/look-for-actions">Rechercher une action</a>
                    </p>
                    <p class="sidebar-action-content-entry">
                        <span class="lnr lnr-paw fa-2x"></span>                
                        <a href="/users/actions/create">Créer une action</a>
                    </p>
                </div>
                <div class="sidebar-action-spacer"></div>
                <div class="sidebar-action-footer">
                    <p class="sidebar-action-copyright">copyright bemychange-2017</p>
                </div>
            </div>
        );

    }
}