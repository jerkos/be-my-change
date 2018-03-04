import '../../home';
import * as SimpleDom from 'simpledom-component';
import './ressources.less';
import {withVeilAndMessages} from "../../components/veil/veil";


class Ressource extends SimpleDom.Component {

    render() {
        return (
            <a href={`${this.props.ressource.urlRequested}`} target='_blank' class="collection-item">
                <div class="ressource-item">


                    <div class="image-container">
                        <img src={this.props.ressource.mainImage}/>
                    </div>
                    <div class="ressource-info">
                        <h3>{this.props.ressource.title}</h3>
                        <p>{this.props.ressource.text}</p>
                    </div>
                </div>
                <div class="ressource-footer">
                    <div class="creator">
                        {currentUser.username}
                    </div>
                    <div>
                        <span class="lnr lnr-thumbs-up"></span>
                        0
                    </div>
                </div>
            </a>
        )
    }
}


class RessourcesList extends SimpleDom.Component {

    eventsToSubscribe() {
        return ['RESSOURCES_LIST_TO_UPDATE'];
    }

    render() {
        if ((this.state.ressources || []).length === 0) {
            return (
                <section class="empty">
                    <div class="empty-icon">
                        <span class="lnr lnr-book fa-3x"/>
                    </div>
                    <h4 class="empty-title">Aucune ressource pour l'instant</h4>
                    <p class="empty-subtitle">Soyez le premier à déposer une ressource !</p>
                </section>
            );
        }
        return (
          <ul class="ressources-list collection">
              {(this.state.ressources || []).map(ressource => <Ressource ressource={ressource}/>)}
          </ul>
        );
    }
}


export class RessourcesTab extends SimpleDom.Component {

    constructor(props, store) {
        super(props, store);
        this.currentUrl = '';
    }

    render() {
        return (
            <div class="action-info">
                <span class="lnr lnr-cross fa-3x slider-cross"
                      onclick={() => {
                          this.props.sliderClose();
                      }}
                />
                <h4 class="action-info-title">
                    <img class="action-info-image" src={this.props.action.image_url} />
                    <span>{this.props.action.title}</span>
                </h4>
                <div class="action-info-author">Créé par <span>{this.props.action.creator.username}</span></div>
                <div class="row" style="padding: 5% 15%;">
                    <RessourcesList/>
                </div>
                <div class="row" style="padding: 0 15%;">
                    <input type="text" onChange={event => {
                        this.currentUrl = event.target.value;
                    }}/>
                    <a class="hbtn hbtn-action" onclick={() => {
                        withVeilAndMessages(
                            fetchJsonData(`/gather-informations?url=${this.currentUrl}`),
                            true
                        ).then(result => {
                            console.log(result);
                            this.store.updateState(
                                {ressources: (this.state.ressources || []).concat(result)},
                                'RESSOURCES_LIST_TO_UPDATE'
                            );
                        })
                    }}>+</a>
                </div>
            </div>
        );
    }
}