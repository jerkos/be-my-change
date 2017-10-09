import * as SimpleDom from 'simpledom-component';
import { ComposedComponent, ParentComponent } from '../composedComponent'
import { withVeilAndMessages } from '../components/veil/veil';
const SimpleMDE = require('simplemde');
require('../../node_modules/simplemde/dist/simplemde.min.css')
const gravatar = require('gravatar');


let node_id = 0;

class Commentary extends SimpleDom.Component {
    componentDidMount() {
        document.getElementById(`node-${this.props.index}`).innerHTML = this.props.commentary.content
    }

    mustRefresh() {
        if (this.props.index === this.props.newIndex) {
            return true;
        }
        return false;
    }

    render() {
        ++node_id;
        return (
            <li class="collection-item avatar">
                <img class="circle"
                    src={gravatar.url(this.props.commentary.user.email, { s: '30' })} />
                <span class="title">{this.props.commentary.user.username}</span>
                <p>
                    <div id={`node-${this.props.index}`}>
                    </div>
                </p>
            </li>
        );
    }
}

class CommentariesList extends SimpleDom.Component {
    render() {
        return (
            <ul class="collection">
                {this.props.commentaries.map((comm, i) => {
                    return <Commentary commentary={comm} index={i} />
                })}
            </ul>
        );
    }
}


export class CommentariesTab extends SimpleDom.Component {
    eventsToSubscribe() {
        return ['COMMENTS_TO_UPDATE'];
    }

    constructor(props, store) {
        super(props, store);
        this.commentaries = this.props.commentaries.slice();
        this.editor = undefined;
    }

    componentDidMount() {
        setTimeout(() => {
            this.editor = new SimpleMDE({ element: document.getElementById('editor') });
        }, 500);
    }

    render() {
        return (
            <div style="padding: 0 15%">
                <div class="row">
                    {SimpleDom.predicate(this.commentaries.length,
                        () => <CommentariesList commentaries={this.commentaries} />,
                        () => {
                            return (
                                <section class="empty">
                                    <div class="empty-icon">
                                        <i class="lnr lnr-user fa-3x"></i>
                                    </div>
                                    <h4 class="empty-title">Aucun commentaire pour l'instant</h4>
                                    <p class="empty-subtitle">Soyez le premier à commenter votre action !</p>
                                </section>
                            )
                        }
                    )}
                </div>
                <div class="row">
                    <textarea id="editor"></textarea>
                </div>
                <div class="row">
                    <button onclick={e => {
                        const content = SimpleMDE.prototype.markdown(this.editor.value());
                        const comm = {
                            content,
                            action_id: this.props.action.id
                        };
                        withVeilAndMessages(
                            fetchJsonData(
                                `/users/actions/${this.props.action.id}/commentaries`,
                                { method: 'POST', body: JSON.stringify(comm) }
                            ), true)
                            .then(comm => {
                                this.commentaries.push(comm)
                                this.store.updateState(
                                    { newIndex: this.commentaries.length - 1 },
                                    'COMMENTS_TO_UPDATE'
                                )
                            });
                    }}
                        class="btn right">publier</button>
                </div>
            </div>
        );
    }
}