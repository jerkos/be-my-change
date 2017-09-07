import * as SimpleDom from 'simpledom-component';
import { ComposedComponent, ParentComponent } from '../composedComponent'
import { withVeilAndMessages } from '../veil';


class Commentary extends SimpleDom.Component {
    render() {
        return (
            <div class="row">
                <div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">{this.props.commentary.title}</span>
                            <p>{this.props.commentary.content}</p>
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
    
    componentDidMount() {
        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
          
            ['clean']                                         // remove formatting button
          ];
        this.quill = new Quill('#editor', {
            modules: {
              // Equivalent to { toolbar: { container: '#toolbar' }}
              toolbar: toolbarOptions
            },
            theme: 'snow'
          });
    }

    render() {
        return (
            <div>
                <div class="row">
                    <CommentariesList
                        commentaries={this.props.commentaries}
                    />
                </div>
                <div class="row">
                    <div id="toolbar"></div>
                    <div id="editor"></div>
                </div>
            </div>
        );
    }
}