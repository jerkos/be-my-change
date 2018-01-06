import '../../home';
import * as SimpleDom from 'simpledom-component';
import './slider.less';

export function createSlider(title, node, e, onClose = () => {}) {
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
        draggable: false, // Choose whether you can drag to open on touch screens
        onOpen: el => {
            SimpleDom.renderToDom(
                'slide-out-actions',
                <SlideActionInfo
                    close={() => {
                        onClose();
                        $(e.target).sideNav('destroy')
                    }}
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
		return <div class="slider">
			<div class="row" style="margin: 0;">
				<span class="lnr lnr-cross fa-3x slider-cross"
                    onclick={this.props.close}
                />
			</div>
			<div class="row" style="margin: 0;">
				<div class="col s12">
					{this.props.node}
				</div>
			</div>
		</div>
	}
}