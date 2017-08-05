require('./home')
const moment = require('moment')
require('moment/locale/fr');
import * as SimpleDom from 'simpledom-component';
import {withVeilAndMessages} from './veil';
require('./css/avatar.less')

class SlideActionInfo extends SimpleDom.Component {
	eventsToSubscribe() {
		return ['SLIDE_TO_UPDATE', 'UPDATE_USER_PANEL'];
	}

	componentDidMount() {
		$('ul.tabs.action-infos')
		.tabs()
		.tabs('select_tab', this.state.tabActive || 'description-tab');

		$('ul.tabs.action-infos').on('click', 'a', event => {
			if (event.target.href.split('#')[1] === 'participants-tab') {
				if (! this.state.users) {
					withVeilAndMessages(
						fetchJsonData(`/users/actions/${this.props.action.id}/participants`),
						true
					).then(users => {
						this.store.updateState({users, tabActive: 'participants-tab'}, 'SLIDE_TO_UPDATE');
						setTimeout(this.searchInput.focus(), 1000);
						
					});
				}
				setTimeout(this.searchInput.focus(), 1000);
			}
		})
	}

	render() {
        return <div style="padding: 0 10%">
            <div class="row">
                <p style="text-transform: uppercase; font-weight: bold; color: #d24141">
                    <div style="border-radius: 100%; height: 43px; width: 43px; background-color: #d24141; color: white; display: inline-block; margin-right: 10px">
                        <span class="fa fa-handshake-o fa-2x" style="position: relative; top: 8px; left: 5px"/>
                    </div>
                Donner/Recevoir
                </p>
                <span class="lnr lnr-cross fa-3x" style="position: absolute; right: 5px; top: 5px; cursor: pointer;"
                	onclick={this.props.close}
                ></span>
            </div>
            <div class="row">
                <p style="text-align: center; font-weight: bold; font-size: 20px">{this.props.action.title}</p>
            </div>
            <div class="row">
                <div class="col s12">
                    <ul class="tabs action-infos">
                        <li class="tab col s3">
							<a //class={this.state.tabActive === 'description' || !!this.state.tabActive ? 'active': undefined}
							href="#description-tab">description</a>
                        </li>
                        <li class=" tab col s3">
                            <a //class={this.state.tabActive === 'participants' ? 'active': undefined}
							href="#participants-tab">participants</a>
                        </li>
                        <li class=" tab col s3">
                            <a //class={this.state.tabActive === 'comments' ? 'active': undefined}
							href="#commentaires-tab">commentaires</a>
                        </li>
                        <li class=" tab col s3">
                            <a //class={this.state.tabActive === 'ressources' ? 'active': undefined} 
							href="#ressources-tab">ressources</a>
                        </li>
                    </ul>
                </div>
                <div id="description-tab" class="col s12" style="padding: 50px 20%">
                    
                    <div class="row bullet-title">
                        <div><div/>Sa description</div>
                    </div>
                    <div class="row">{this.props.action.description}</div>
                    
                    <div class="row bullet-title">
                        <div><div/>Sa durée (maximum 31 jours)</div>
                    </div>
                    <div class="row">
                        <form action="#">
                        
                          <p class="range-field">
                            <input class="red-input"
                                type="range"
                                min="0"
                                max="31"
                                value="27"
                                style="background-color: #d24141"
                            />
                          </p>
                        </form>
                    </div>
                    <div class="row" style="margin-top: -27px">
                        <div class="col s3" style="position: relative; right: 47px">Action coup de point</div>
                        <div class="col s3" style="position: relative; right: 20px">Je prends la température</div>
                        <div class="col s3" style="position: relative; left: 20px">J'ancre une habitude</div>
                        <div class="col s3" style="position: relative; left: 47px">Je m'engage à long terme</div>
                    </div>
                </div>
                <div id="participants-tab" class="col s12">
					<div class="row">
						<div class='col s8 offset-s2'>
						<nav class="search-nav">
							<div class="nav-wrapper">
							<form>
								<div class="input-field">
								<input id="search" type="search" ref={ref => this.searchInput = ref}/>
								<label class="label-icon" for="search"><i class="material-icons">search</i></label>
								<i class="material-icons">close</i>
								</div>
							</form>
							</div>
						</nav>
						</div>
					</div>
					<div class="row">
						<div class="col s6">
						<ul class="collection">
							{(this.state.users || []).map(user => 
								<a onclick={ () => {
									this.store.updateState({selectedUser: user}, 'UPDATE_USER_PANEL');
									
								}}
								style="pointer: cursor;" class="collection-item">
									<div class="avatar-spec avatar-spec-sm" style="color: white;background-color: #5764c6;" data-initial={user.username.slice(0, 2) || ''}/>
									<strong style="padding-left: 20px;">{user.username}</strong>
								</a>)
							}
						</ul>
						</div>
						<div class="col s6">
							{SimpleDom.predicate(this.state.selectedUser, () => {
								console.log(this.state.selectedUser);
								const userAction = this.state.selectedUser.user_actions.find(uaction => uaction.id === uaction.id);
								return (
									<div>
										<h1>{this.state.selectedUser.username}</h1>
										<div style="padding: 5px 0;">
											<div style="display: inline-block; min-width: 150px;">Action entreprise le: </div>
											<div style="display: inline-block; padding: 5px 10px; background-color: lightgrey; border-radius: 5px">
												{userAction.created_date} 
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
										<div style="text-align: left">
											<a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>PROFIL</a>
										</div>
									</div>
								);
							}, () => {
								return (
									<div style="background-color: lightgrey; border-radius: 5px; min-height: 300px">
										<div style="padding: 25% 25%">
											<h4 style="text-align: center;"><i class="lnr lnr-user"></i></h4>
											<h6 style="text-align :center;">Sélectionner un utilisateur !</h6>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
                <div id="commentaires-tab" class="col s12">Hello world</div>
                <div id="ressources-tab" class="col s12">A lot of ressources goes here</div>
            </div>
        </div>
	}
}


class ActionCard extends SimpleDom.Component {
	render() {
		let self = this;
		return (
			<div class="card hoverable">
				<div class="card-image waves-effect waves-block waves-light">
      					<img class="activator" src="http://lorempixel.com/400/200/nature"/>
    			</div>
				<div class="card-content">
					<span class="card-title activator grey-text text-darken-4">
						{this.props.action.title} 
						<span class="badge small green white-text" 
						style="border-radius: 5px; position: absolute">env</span>
						<i class="material-icons right">more_vert</i>
					</span>
					<div>	
						<div>
							<div class="chip" style="font-size: 10px">
								<i class="material-icons tiny">alarm</i>
								{moment(this.props.action.dates[0]).fromNow(true)}
							</div>
							<div class="chip" style="font-size: 10px">
								<i class="tiny material-icons">alarm_off</i>
								{moment(this.props.action.dates[0]).from(moment(this.props.action.end_date), true)}
							</div>
							<div class="chip" style="font-size: 10px">
								<i class="tiny material-icons">check</i>
								{this.props.action.nb_success}
							</div>
						</div>
					</div>
				</div>
				<div class="card-reveal">
					<span class="card-title button-collapse"> 
							{this.props.action.title}
							<i class="material-icons right">close</i>
						</span>
						<p>{self.props.action.description}</p>
						<p class="right-align">
							<a class="btn-floating waves-effect waves-light purple lighten-2"
							 onclick={function(e){
								if (!document.getElementById('slide-out-actions')) {
									let slideContainer = document.createElement('div');
									slideContainer.id = "slide-out-actions";
									slideContainer.classList.add('side-nav');
									document.body.appendChild(slideContainer);
								}
								const slideStore = new SimpleDom.Store();

								$(e.target).attr('data-activates', 'slide-out-actions');
								$(e.target).sideNav({
								// $('#test-sidenav').sideNav({
									menuWidth: 700, // Default is 300
									edge: 'right', // Choose the horizontal origin
									closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
									draggable: true, // Choose whether you can drag to open on touch screens
									onOpen: el => {
										console.log(el);
										SimpleDom.renderToDom(
											'slide-out-actions', 
											<SlideActionInfo
												action={self.props.action}
												close={() => $(e.target).sideNav('destroy')}
											/>,
											slideStore
										);
									}
								});
								$(e.target).sideNav('show');
							}}>
								<i class="material-icons">add</i>
							</a>
						</p>
				</div>
				<div class="card-action">
					<p>
						<a class="purple-text lighten-2-text" href="#" style="color: black, margin-right: 0">
							J'ai effectué cette action !
						</a>
						<a class="right grey-text" style="font-size: 8px">Abandon</a>
					</p>
				</div>
	        </div>
		);
	}
}


class ActionsList extends SimpleDom.Component {
	eventsToSubscribe() {
		return ['ACTIONS_LIST_TO_UPDATE'];
	}

	constructor(props, store) {
		super(props, store);
	}

	partitionList(input, spacing) {
       let output = [];
        for (let i = 0; i < input.length; i += spacing) {
            output[output.length] = input.slice(i, i + spacing);
        }
        return output;
    }
            
	render() {
		return <div id="actions-card">
			{this.partitionList(this.state.selectedActions || [], 2).map(subactions => 
				<div class="row" style="margin-top: 50px !important">
					{subactions.map(action => 
						<div class="col s6">
							<ActionCard 
								action={action}
							/>
                        </div>
                    )}	
                </div>
            )}
		</div>     
	}
}


class CreateAction extends SimpleDom.Component {
	eventsToSubscribe()  {
		return ['CREATE_ACTION_TO_UPDATE'];
	}

	render() {
		return (
			<div>
				<h6 class="create-action-title">Je choisis ma thématique</h6>
	            <div class="row">
	                <div class="col s3">
	                    <button 
	                    class={
	                    	{
	                    		boutonRond:true, 
	                    		actionRedSelected: !this.state.selectedActionKind || this.state.selectedActionKind === 'PERS'
	                    	}} 
	                    onclick={e =>
	                    	this.store.updateState({selectedActionKind: 'PERS'}, 'CREATE_ACTION_TO_UPDATE')
	                    }>Personnel</button>
	                </div>
	                <div class="col s3">
	                    <button class={
	                    	{
	                    		boutonRond:true, 
	                    		actionRedSelected: this.state.selectedActionKind === 'REL'
	                    	}} 
	                    onclick={e =>
	                    	this.store.updateState({selectedActionKind: 'REL'}, 'CREATE_ACTION_TO_UPDATE')
	                    }>Relationnel</button>
	                </div>
	                <div class="col s3">
	                    <button class={
	                    	{
	                    		boutonRond:true, 
	                    		actionRedSelected: this.state.selectedActionKind === 'ENV'
	                    	}} 
	                    onclick={e =>
	                    	this.store.updateState({selectedActionKind: 'ENV'}, 'CREATE_ACTION_TO_UPDATE')
	                    }>Environnement</button>
	                </div>
	            </div>
	            <div class="row">
	                <p id='theme-action-result' style="text-align: center"></p>
	            </div>

	            <h6 class="create-action-title">Je définis mon action</h6>
	            <div class="row bullet-title">
	                <div>
	                    <div></div>
	                    Son intitulé
	                </div>
	            </div>
	            <div class="row mt--20">
	                <div class="input-field red-input col s12">
	                  <input 
	                    type="text" 
	                    placeholder="le titre de votre nouvelle action !"
	                    value={this.state.actionTitle}
	                  	onchange={e => this.store.updateState({actionTitle: e.target.value})}
	                  />
	                </div>
	            </div>
	            <div class="row bullet-title">
	                <div>
	                    <div></div>
	                    Sa description
	                </div>
	            </div>
	            <div class="row mt--20">
	                <div class="input-field red-input col s12">
	                  <textarea id="description" class="materialize-textarea" rows="10"
	                  	onchange={e => this.store.updateState({actionDescription: e.target.value})}
	                  >
	                  	{this.state.actionDescription || 'Choisissez une description accrocheuse afin que d\'autres life changers la remarquent !'}
	                  </textarea>
	                </div>
	            </div>

	            <div class="row bullet-title">
                    	<div><div/>Sa date de début</div>
                </div>
                <div class="row mt--20">
                	<input id="begin-action-picker" type="date" class="datepicker"/>
                </div>

                 <div class="row bullet-title">
                    	<div><div/>Son format</div>
                </div>
                <div class="row mt--20">
                	<div class="col m4">
                		<button class={{boutonRond: true, 
                			actionRedSelected:!this.state.format || this.state.format === 'PERS' 
                		}}>
                			Action personnel
                		</button>
                	</div>
                	<div class="col m4">
                		<button  class={{boutonRond: true, 
                			actionRedSelected: this.state.format === 'FIELD' 
                		}}>Action de terrain</button>
                	</div>
                </div>
                <div class="switch">
				    <label>
				      Privée
				      <input type="checkbox"/>
				      <span class="lever"></span>
				      Publique
				    </label>
				 </div>

				 <h6 class="create-action-title">J'ajoute des documents d'inspiration</h6>
				 <div class="row">
				 	<div class="input-field col s12">
				 		<div style="top: 8px; cursor: pointer;" class="fa fa-plus-circle fa-2x prefix"
				 			onclick={e => {
				 				let inputValue = $(e.target).siblings()[0].value;
				 				if (! inputValue.startsWith('http')) {
				 					inputValue = `http://www.${inputValue}`;
				 				}
				 				fetch(`/gather-informations?url=${inputValue}`)
				 				.then(response => response.json())
				 				.then(info => {
				 					const selectedRessources = this.state.selectedRessources || []
				 					selectedRessources.push(info);
				 					this.store.updateState({selectedRessources}, 'CREATE_ACTION_TO_UPDATE');
				 				})
				 			}}
				 		/>
				 		<input type="text" placeholder="Entrer une url"/>
				 	</div>
				 </div>
				 {SimpleDom.predicate(this.state.selectedRessources !== undefined
				  && this.state.selectedRessources.length > 0,
				 <ul class="collection">
				 {(this.state.selectedRessources || []).map(ressources => {
				 	 return <li class="collection-item avatar">
				      <img src={(ressources.images[0] || {}).src} alt="" />
				      <span class="title">
				      	<a target="_blank" href={ressources.url}>
				      	{ressources.title}
				      	</a>
				      </span>
				      <p><strong>{ressources.description}</strong></p>
				      <a onclick={ e => {
				      		e.preventDefault();
				 	 		this.store.updateState({selectedRessources: 
				 	 			this.state.selectedRessources.filter(r => r.title !== ressources.title)}, 'CREATE_ACTION_TO_UPDATE');
				 	 	}} href="#!" class="secondary-content">
				 	 		<i class="material-icons">delete</i>
				 	  </a>
				    </li>
				 })}
				 </ul>
				 )}
				 <div class="row" style="text-align: center">
				 	<button class="bouton-rond" onclick={e => {
				 		fetch('/users/actions/create', {
				 			method: 'POST',
				 			body: JSON.stringify({
				 					title: this.state.actionTitle,
				 					description: this.state.actionDescription,
				 					kind: this.state.selectedActionKind || 'PERS',
				 					ressources: this.state.selectedRessources || [],
				 					format: this.state.selectedFormat || 'PERS'
				 				}),
				 			headers: {
				 				'Content-Type': 'application/json'
				 			},
							credentials: 'include'
				 			}
				 		).then(() => console.log('sent !'))
				 	}}>Je crée ma nouvelle action !</button>
				 	
				 </div>
            </div>
		);
	}
}

class LookForAction extends SimpleDom.Component {
	
	eventsToSubscribe() {
		return ['LOOK_FOR_UPDATE'];
	}
	
	componentDidMount() {
		if (this.inputRef)
			this.inputRef.focus();
			this.inputRef.value = this.value || '';
		$(this.selectKind).material_select();
	}

	render() {
		return (
			<div class="boxed-layout">
				<div class="row">
				<div class="input-field col s8">
					<i class="material-icons prefix">search</i>
					<input type="text" value="" ref={ref => this.inputRef = ref}
					onkeyup={event => {
						this.lastTimerId = this.timerId;
						if (this.lastTimerId) {
							clearTimeout(this.lastTimerId);
						}
						this.value = event.target.value;
						if (this.value.length < 3) {
							return;
						}
						this.timerId = setTimeout(()=> {
							fetchJsonData(`/users/actions/matching-with-text?text=${this.value}`)
							.then(data => this.store.updateState({lastActions: data}, 'LOOK_FOR_UPDATE'))
						}, 500);
					}}/>
				</div>
				<div class="input-field col s4">
					<select ref={ref => this.selectKind = ref}>
						<option value="" disabled selected>Choisissez un type d'action</option>
						<option value="PERS">Personnel</option>
						<option value="REL">Relationnel</option>
						<option value="ENV">Environnement</option>
					</select>
					<label>Materialize Select</label>
				</div>
				</div>
				<div class="collection">
					{(this.state.lastActions || []).map(action => {
						return <a class="collection-item avatar">
									<span class="title"><strong>{action.title}</strong></span>
									<p>{action.description} 
										<div class="avatar-spec" data-initial={(action.creator || {}).username.slice(0,2)}></div>
										<div style="display: inline-block">#Nb défis relevés: {action.user_actions.length}</div>
									</p>
									<a href="#!" class="secondary-content">
										<a style="margin-right: 10px" class="btn-floating waves-effect waves-light red"><i class="material-icons">add</i></a>
 										<a class="btn-floating waves-effect waves-light red"><i class="material-icons">add</i></a>
									</a>
								</a>
					})}
				</div>
			</div>
		);
	}
}


class App extends SimpleDom.Component {
	render() {
		console.log(this.state);
		return (
			<div id="top" class="action">
				<h2 class="en-tete">J'agis</h2> 
				<div class="boxed-layout" style="margin-top: 50px;">
			        <div class="row">
			            <div class="col s12">
			                <ul class="tabs">
			                    <li class="tab col s4"><a class="active" href="#actions">Passer à l'action</a></li>
			                    <li class="tab col s4"><a href="#lookfor">Recherche une action</a></li>
			                    <li class="tab col s4"><a href="#create">Créer une action</a></li>
			                </ul>
			                </div>
			                <div id="actions" class="col s12">
			                    <div class="row">
					                <div id="main-picker-container" class="col s4">
					                    <input id="main-picker" class="datepicker"/>    
					                </div>
					                <div class="col s8">
					                    <ActionsList/>
					                </div>
					            </div>
			                </div>
			                <div id="lookfor" class="col s12">
			                	<LookForAction/>
			                </div>
			                <div id="create" class="col s12" style="padding: 0 25%">
			          			<CreateAction/>  
			                </div>
			        </div>
		        </div>
	        </div>
	    )}
}


const store = new SimpleDom.Store();
withVeilAndMessages(
	Promise.all([fetchJsonData('/users/actions/get'), fetchJsonData('/users/actions/last-actions')]),
	true)
	.then(([actions, lastActions]) => {
		store.updateState(
				{
					actions,
					lastActions, 
					selectedActions: actions //actions.filter(action => (action.dates || []).includes(moment().format('YYYY-MM-DD')))
				}
		);
		SimpleDom.renderToDom('container', <App/>, store);
		// jquery functions
		$('#begin-action-picker.datepicker').pickadate();

		$('#main-picker.datepicker').pickadate({
                klass: {
                    picker: "picker picker--opened",
                    opened: "__always-open__"
                },
                onSet: function() {
                    store.updateState(
                    	{
                    		selectedDate: this.get('select', 'yyyy-mm-dd'),
                    		selectedActions: store.state.actions.filter(action => (action.dates || []).includes(this.get('select', 'yyyy-mm-dd')))

                    	}, 'ACTIONS_LIST_TO_UPDATE');
                }
        });
		$('.tabs').tabs();
	});



