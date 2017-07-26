import moment from 'moment';
require('moment/locale/fr');
moment.locale('fr');

import * as SimpleDom from 'simpledom-component';

const veilId = 'veil-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

export function addVeil(message = undefined) {
    if (!document.getElementById(veilId)) {
        const veilContainer = document.createElement('div');
        veilContainer.id = veilId;
        document.body.appendChild(veilContainer);
    }
    SimpleDom.renderTo(
        veilId,
        <div class="veil">
            {SimpleDom.predicate(message, <h1>{message}</h1>)}
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>
            </div>
        </div>
    );
}


export function removeVeil(value) {
    if (document.getElementById(veilId)) {
        document.body.removeChild(document.getElementById(veilId));
    }
    return value;
}

export function withVeilAndMessages(promise, withVeil, successMessage = '', autoCloseTimeout = 0,
                                    errorMessage = 'Une erreur est survenue, veuillez contacter votre service client.',
                                    veilMessage = ''
                                ) {
    if (withVeil) {
        addVeil(veilMessage);
    }
    return promise
        .then(value => {
            if (successMessage) {
                //addMessage(successMessage, 'success', autoCloseTimeout);
            }
            return removeVeil(value);
        }, error => {
            removeVeil();
            // addMessage(
            //     <span>
            //         <strong>Attention!</strong> {errorMessage}
            //         <br/>
            //         Message d'erreur : {moment().format('lll:ss')} - <i>{error}</i>
            //     </span>,
            //     'danger');
            return Promise.reject(error);
        });
}
