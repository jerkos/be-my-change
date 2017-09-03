require('./home')
const moment = require('moment')
require('moment/locale/fr');
const flatpickr = require("flatpickr");

import * as SimpleDom from 'simpledom-component';
import { withVeilAndMessages } from './veil';
require('./css/avatar.less');
import { CreateAction } from './actions/create_action/step1';
import { ParticipantTab } from './actions/participants';
import {LookForAction as LookForActionGrid} from './actions/lookForActions';

class SlideActionInfo extends SimpleDom.Component {
	eventsToSubscribe() {
		return ['SLIDE_TO_UPDATE'];
	}

	componentDidMount() {
		if (!this.state.users) {
			console.log('fetching data');
			withVeilAndMessages(
				fetchJsonData(`/users/actions/${this.props.action.id}/participants`),
				true
			).then(users => {
				//$('ul.tabs.action-infos').tabs();
				console.log(users)
				this.store.updateState({ users, tabActive: 'participants-tab' }, 'SLIDE_TO_UPDATE');
			});
		} else {
			$('ul.tabs.action-infos')
				.tabs()
				.tabs('select_tab', this.state.tabActive || 'participants-tab');
		}
	}

	render() {
		console.log('inside rendering', this.state.users);
		return <div style="padding: 0 10%">
			<div class="row">
				<p style="text-transform: uppercase; font-weight: bold; color: #d24141">
					<div style="border-radius: 100%; height: 43px; width: 43px; background-color: #d24141; color: white; display: inline-block; margin-right: 10px">
						<span class="fa fa-handshake-o fa-2x" style="position: relative; top: 8px; left: 5px" />
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
						<li class=" tab col s4">
							<a href="#participants-tab">participants</a>
						</li>
						<li class=" tab col s4">
							<a href="#commentaires-tab">commentaires</a>
						</li>
						<li class=" tab col s4">
							<a href="#ressources-tab">ressources</a>
						</li>
					</ul>
				</div>
				<div id="participants-tab" class="col s12">
					<ParticipantTab users={this.state.users || []} />
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
					<img class="activator" src="http://lorempixel.com/400/200/nature" />
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
							onclick={function (e) {
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
			{this.partitionList(this.state.selectedActions || [], 3).map(subactions =>
				<div class="row" style="margin-top: 50px !important">
					{subactions.map(action =>
						<div class="col s4">
							<ActionCard action={action} />
						</div>
					)}
				</div>
			)}
		</div>
	}
}


class LookForAction extends SimpleDom.Component {

	eventsToSubscribe() {
		return ['LOOK_FOR_UPDATE'];
	}

	componentDidMount() {
		if (this.inputRef)
			this.inputRef.focus();
		this.inputRef.value = this.value ||  '';
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
								this.timerId = setTimeout(() => {
									fetchJsonData(`/users/actions/matching-with-text?text=${this.value}`)
										.then(data => this.store.updateState({ lastActions: data }, 'LOOK_FOR_UPDATE'))
								}, 500);
							}} />
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
								<div class="avatar-spec" data-initial={(action.creator || {}).username.slice(0, 2)}></div>
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
								<div class="col s4">
									<div style="position: fixed; margin-top: -50px;">
										<input style="visibility: hidden;" class="flatpicker" type="date"/>
									</div>
								</div>
								<div class="col s8">
									{SimpleDom.predicate(!this.state.selectedActions.length,
										() => {
											return (
												<section style="margin-top: 50px;" class="empty">
													<div class="empty-icon">
														<i class="lnr lnr-user fa-3x"></i>
													</div>
													<h4 class="empty-title">Vous n'avez pas encore d'action en cours !</h4>
													<p class="empty-subtitle">Rechercher une action qui vous correspond !</p>
												</section>
											);
										}, 
										() => <ActionsList />

									)}
								</div>
							</div>
						</div>
						<div id="lookfor" class="col s12">
							<LookForActionGrid />
						</div>
						<div id="create" class="col s12" style="padding: 0 25%">
							<CreateAction />
						</div>
					</div>
				</div>
			</div>	
		)
	}
}


const store = new SimpleDom.Store();
withVeilAndMessages(
	Promise.all([fetchJsonData(`/users/actions/get`), fetchJsonData('/users/actions/last-actions')]),
	true)
	.then(([actions, lastActions]) => {
		console.log(actions);
		store.updateState(
			{
				actions,
				lastActions,
				selectedActions: actions //actions.filter(action => (action.dates || []).includes(moment().format('YYYY-MM-DD')))
			}
		);
		SimpleDom.renderToDom('container', <App />, store);
		// jquery functions

		$('.tabs').tabs();
		flatpickr('.flatpicker', 
			{
				inline: true, 
				onChange: (_, date, inst) => {
					console.log(date);
					withVeilAndMessages(
						fetchJsonData(`/users/actions/get?date=${moment(date).format('YYYY-MM-DD')}`),
						true
					).then(actions => store.updateState({actions}, 'ACTIONS_LIST_TO_UPDATE'))
				}
			}
		);
	});



