import React, { Component } from 'react';
import './App.css';
import {sampleText} from './sampleText';
import marked from 'marked';
import Button from './components/Button';

class App extends Component {
  
  state = {
    text: sampleText,
    positionText: 0
  }

  componentDidMount() {
    const text = localStorage.getItem('text');
    if (text)
      this.setState({ text })
  }

  componentDidUpdate() {
    const {text} = this.state
    localStorage.setItem('text', text);

  }

  handleChange = e => {
    const newText = e.target.value;
    this.setState({text: newText});
  }

  handleKeyUp = e => {
    const newPosition = e.target.selectionStart;
    this.setState({positionText: newPosition});
    
  }

  handleClickBold = event => {
    let left = this.state.text.slice(0, this.state.positionText)
    let right = this.state.text.slice(this.state.positionText)

    this.setState(
        {text: left.concat('***', right)},
        () => {
          setTimeout(()=> {
            let index = this.state.text.substring(this.state.positionText).indexOf(' ' || '\n') + this.state.text.slice(0, this.state.positionText).length;
  
            let left = this.state.text.slice(0, index)
            let right = this.state.text.slice(index)
            this.setState({text: left.concat('***', right)});
          }, 20)
        });
  }

  handleClickItalic = event => {
    let left = this.state.text.slice(0, this.state.positionText)
    let right = this.state.text.slice(this.state.positionText)

    this.setState(
        {text: left.concat('*', right)},
        () => {
          setTimeout(()=> {
            let index = this.state.text.substring(this.state.positionText, '\n').indexOf(' ')
            
            if (index === -1) {

              index = this.state.text.substring(this.state.positionText, '\0').indexOf('\n');
              if (index === -1) {
            console.log('on est la')

                index = this.state.text.length;
              } else {
                index += this.state.text.slice(0, this.state.positionText).length;
              }
            } else {
              index += this.state.text.slice(0, this.state.positionText).length;
            }
  
            let left = this.state.text.slice(0, index)
            let right = this.state.text.slice(index)
            this.setState({text: left.concat('*', right)});
          }, 20)
        });
  }
  
  handleClickMonospace = event => {
    let left = this.state.text.slice(0, this.state.positionText)
    let right = this.state.text.slice(this.state.positionText)

    this.setState(
        {text: left.concat('`', right)},
        () => {
          setTimeout(()=> {
            let index = this.state.text.substring(this.state.positionText).indexOf(' ' || '\n' || '\0') + this.state.text.slice(0, this.state.positionText).length;
  
            let left = this.state.text.slice(0, index)
            let right = this.state.text.slice(index)
            this.setState({text: left.concat('`', right)});
          }, 20)
        });
  }

  handleClickTitle1 = event => {
    const left = this.state.text.slice(0, this.state.positionText)
    const right = this.state.text.slice(this.state.positionText)
    this.setState({text: left.concat('# ', right)});
  }

  handleClickTitle2 = event => {
    const left = this.state.text.slice(0, this.state.positionText)
    const right = this.state.text.slice(this.state.positionText)
    this.setState({text: left.concat('## ', right)});
  }

  handleClickTitle3 = event => {
    const left = this.state.text.slice(0, this.state.positionText)
    const right = this.state.text.slice(this.state.positionText)
    this.setState({text: left.concat('### ', right)});
  }
  
  renderText = text => {
    const __html = marked(text, {sanitize: true})
    return { __html }
  }

  render() {
    const text = this.state.text;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <Button text="Gras" fonction={this.handleClickBold}/>
            <Button text="Italique" fonction={this.handleClickItalic}/>
            <Button text="Titre 1" fonction={this.handleClickTitle1}/>
            <Button text="Titre 2" fonction={this.handleClickTitle2}/>
            <Button text="Titre 3" fonction={this.handleClickTitle3}/>


            <textarea className="form-control" 
                      rows="35"
                      value={text}
                      onChange={this.handleChange}
                      onKeyUp={this.handleKeyUp}
                      onClick={this.handleKeyUp}
                      onSelect={this.test}>
            </textarea>
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(text)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
