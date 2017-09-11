import * as SimpleDom from 'simpledom-component';
import { ComposedComponent, ParentComponent } from '../composedComponent'
import { withVeilAndMessages } from '../veil';
const SimpleMDE = require('simplemde');
require('../../node_modules/simplemde/dist/simplemde.min.css')


let node_id = 0;


class Commentary extends SimpleDom.Component {
    componentDidMount() {
        document.getElementById(`node-${node_id}`).innerHTML = this.props.commentary.content
    }

    render() {
        ++node_id;
        const div = document.createElement('div');
        div.innerHTML = this.props.commentary.content       
        return (
            <div class="row">
                <div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">{this.props.commentary.title}</span>
                            <p>
                                {div}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CommentariesList extends SimpleDom.Component {
    render() {
        return (
            <ul>
                {this.props.commentaries.map(comm => {
                    return <Commentary commentary={comm} />
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
        this.editor = new SimpleMDE({element: document.getElementById('editor')});
    }

    render() {
        return (
            <div style="padding: 0 15%">
                <div class="row">
                    <CommentariesList
                        commentaries={this.commentaries}
                    />
                </div>
                <div class="row">
                    <textarea id="editor"></textarea>
                </div>
                <div class="row">
                    <button onclick={e => {
                            console.log(SimpleMDE.prototype.markdown( this.editor.value()));
                            const comm = {
                                title: 'toto',
                                content: SimpleMDE.prototype.markdown(this.editor.value())
                            }
                            this.commentaries.push(comm)
                            this.store.updateState(
                                {}, 
                                'COMMENTS_TO_UPDATE'
                            )

                        }}
                        class="btn right">publier</button>
                </div>
            </div>
        );
    }
}