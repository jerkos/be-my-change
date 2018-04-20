import '../../home';
import * as SimpleDom from 'simpledom-component';
import './slider.less';

export function createSlider(node, e) {
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

	constructor(props, store) {
	    super(props, store);
	    this.props.node.props['sliderClose'] = this.props.close;
    }

	render() {
		return <div class="slider">
			<div class="row" style="margin: 0;">
				<div class="col s12">
					{this.props.node}
				</div>
			</div>
		</div>
	}
}