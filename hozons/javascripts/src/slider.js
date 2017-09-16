require('./home')
import * as SimpleDom from 'simpledom-component';

export function createSlider(title, node, e) {
    if (!document.getElementById('slide-out-actions')) {
        let slideContainer = document.createElement('div');
        slideContainer.id = "slide-out-actions";
        slideContainer.classList.add('side-nav');
        document.body.appendChild(slideContainer);
    }
    const slideStore = new SimpleDom.Store();
    $(e.target).attr('data-activates', 'slide-out-actions');
    $(e.target).sideNav({
        menuWidth: 700, // Default is 300
        edge: 'right', // Choose the horizontal origin
        closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens
        onOpen: el => {
            console.log(el);
            SimpleDom.renderToDom(
                'slide-out-actions',
                <SlideActionInfo
                    title={title}
                    close={() => $(e.target).sideNav('destroy')}
                    node={node}
                />,
                slideStore
            );
        }
    });
    $(e.target).sideNav('show');
}

class SlideActionInfo extends SimpleDom.Component {
	eventsToSubscribe() {
		return ['SLIDE_TO_UPDATE'];
	}

	render() {
		return <div style="padding: 0 10%">
			<div class="row">
				<span class="lnr lnr-cross fa-3x" style="position: absolute; right: 5px; top: 5px; cursor: pointer;"
					onclick={this.props.close}
				></span>
			</div>
			<div class="row">
				<p style="text-align: center; font-weight: bold; font-size: 20px">{this.props.title}</p>
			</div>
			<div class="row">
				<div class="col s12">
					{this.props.node}
				</div>
			</div>
		</div>
	}
}