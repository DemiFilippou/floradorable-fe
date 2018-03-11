import React from 'react';
import indoors from '../images/indoors.png';
import outdoors from '../images/outdoors.png';
import ReactDOM from 'react-dom';
import './IndoorsField.css'

class IndoorsField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indoors: null
    }
  }

  update(indoors) {
    this.setState({
      indoors: indoors
    });
  }

  saveAndSubmit(e) {
    e.preventDefault();
    if (this.state.indoors !== null) {
      this.props.saveValue("indoors", this.state.indoors);
      this.props.submit();
    }
    //TODO: ELSE => SHOW ERROR
  }

  render() {
    return (
      <div className="FieldContainer">
        <h3>Is your plant indoors or outdoors?</h3>
        <div className="indoor_outdoor">
          <img
            src={indoors}
            className={'indoors' + (this.state.indoors === true ? ' choseIndoors' : '')}
            onClick={this.update.bind(this, true)}
          />
          <img
            src={outdoors}
            className={'outdoors' + (this.state.indoors === false ? ' choseOutdoors' : '')}
            onClick={this.update.bind(this, false)}
          />
        </div>
        <button onClick={ this.saveAndSubmit.bind(this) }>DONE</button>
      </div>
    )
  }
}

export default IndoorsField;
