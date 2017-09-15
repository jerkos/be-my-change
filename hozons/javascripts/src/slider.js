require('./home')
import * as SimpleDom from 'simpledom-component';

export function createSlider(node) {
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
                    action={self.userAction.action}
                    close={() => $(e.target).sideNav('destroy')}
                />,
                slideStore
            );
        }
    });
    $(e.target).sideNav('show');
}