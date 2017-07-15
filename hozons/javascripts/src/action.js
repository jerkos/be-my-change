require('./home')
const moment = require('moment')
import * as SimpleDom from 'simpledom-component';


class SlideActionInfo extends SimpleDom.Component {
	render() {
        return <div style="padding: 0 10%">
            <div class="row">
                <p style="text-transform: uppercase; font-weight: bold; color: #d24141">
                    <div style="border-radius: 100%; height: 43px; width: 43px; background-color: #d24141; color: white; display: inline-block; margin-right: 10px">
                        <span class="fa fa-handshake-o fa-2x" style="position: relative; top: 8px; left: 5px"/>
                    </div>
                Donner/Recevoir
                </p>
                <span style="position: absolute; right: 5px; top: 5px"
                	onclick={this.props.close}
                >CROSS</span>
            </div>
            <div class="row">
                <p style="text-align: center; font-weight: bold; font-size: 20px">{this.props.action.title}</p>
            </div>
            <div class="row">
                <div class="col s12">
                    <ul class="tabs">
                        <li class="tab col s3">
                            <a class="active" href="#description-tab">description</a>
                        </li>
                        <li class=" tab col s3">
                            <a href="#participants-tab">participants</a>
                        </li>
                        <li class=" tab col s3">
                            <a href="#commentaires-tab">commentaires</a>
                        </li>
                        <li class=" tab col s3">
                            <a href="#ressources-tab">ressources</a>
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
                <div id="participants-tab" class="col s12">Toto part en vacances</div>
                <div id="commentaires-tab" class="col s12">Hello world</div>
                <div id="ressources-tab" class="col s12">A lot of ressources goes here</div>
            </div>
        </div>
	}
}


class ActionCard extends SimpleDom.Component {
	render() {
		let self = this;
		return <div class="card hoverable">
	                <div class="card-content white-text">
	                    <div class="row">
	                        <div class="col s1">
	                            <span class="fa fa-user fa-3x"/>
	                        </div>
	                        <div class="col s1 offset-s4">
	                            <span class="fa fa-user-circle fa-3x" 
	                            style="color: #d24141; position: relative; left: -15px;"/>
	                        </div>
	                        <div class="col s1 offset-s4">
	                            <span class=" fa fa-user fa-3x"/>
	                        </div>
	                    </div>
	                    <div class="row">
	                        <p style="text-align: center; font-weight: bold; color: #d24141">
	                        	Donner/Recevoir
	                        </p>
	                    </div>
	                    <p class="card-title button-collapse" onclick={function(e){
	                            if (!document.getElementById('slide-out-actions')) {
	                            	let slideContainer = document.createElement('div');
	                            	slideContainer.id = "slide-out-actions";
	                            	slideContainer.classList.add('side-nav');
	                                document.body.appendChild(slideContainer);
	                            }
	                            
	                            SimpleDom.renderToDom(
	                            	'slide-out-actions', 
	                            	<SlideActionInfo
	                            		action={self.props.action}
	                            		close={() => $(e.target).sideNav('destroy')}
	                            	/>
	                            );
	                            $(e.target).attr('data-activates', 'slide-out-actions');
	                            $(e.target).sideNav({
	                           // $('#test-sidenav').sideNav({
	                              menuWidth: 700, // Default is 300
	                              edge: 'right', // Choose the horizontal origin
	                              closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
	                              draggable: true // Choose whether you can drag to open on touch screens
	                            });
	                            $(e.target).sideNav('show');
	                            $('ul.tabs').tabs();

	                    }} style="color: black; text-align: center; cursor: pointer"> 
	                    	{this.props.action.title}
	                    </p>
	                    <p style="color: black; padding-top: 20px; text-align: center">
	                        <strong>220 </strong> personnes participent
	                    </p>  
	                </div>

	                <div class="card-action">
	                    <p style="text-align: center">
	                        <a class="bouton-rond" href="#" style="color: black, margin-right: 0">
	                         buttonText
	                        </a>
	                    </p>
	                </div>
	            </div>;
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
			{this.partitionList(this.state.selectedActions || [], 4).map(subactions => 
				<div class="row" style="margin-top: 50px !important">
					{subactions.map(action => 
						<div class="col s4">
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


class App extends SimpleDom.Component {
	render() {
		console.log(this.state);
		return (
			<div>
				<h2 class="en-tete" style="background-color: #d24141">
					<img src="static/img/ampoule-idee.png"/>J'agis
				</h2> 
				<div class="boxed-layout">
			        <div class="row">
			            <div class="col s12">
			                <ul class="tabs">
			                    <li class="tab col s4"><a class="active" href="#actions">Passer à l'action</a></li>
			                    <li class="tab col s4"><a href="#test2">Recherche une action</a></li>
			                    <li class="tab col s4"><a href="#create">Créer une action</a></li>
			                </ul>
			                </div>
			                <div id="actions" class="col s12">
			                    <div class="row">
					                <div id="main-picker-container" class="col s3">
					                    <input id="main-picker" class="datepicker"/>    
					                </div>
					                <div class="col s9">
					                    <ActionsList/>
					                </div>
					            </div>
			                </div>
			                <div id="test2" class="col s12">Test 2</div>
			                <div id="create" class="col s12" style="padding: 0 25%">
			          			<CreateAction/>  
			                </div>
			        </div>
		        </div>
	        </div>
	    )}
}


const store = new SimpleDom.Store();
fetch('/users/actions/get', {credentials: 'include'})
	.then(response => response.json())
	.then(actions => {
		store.updateState(
				{
					actions, 
					selectedActions: actions.filter(action => (action.dates || []).includes(moment().format('YYYY-MM-DD')))
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



