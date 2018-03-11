import React from 'react';
import './UserPlant.css';
import arrow from '../images/curved_arrow.png';
import './FirstPlant.css';

class FirstPlant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="FirstPlant">
        <h2 className="firstPlantText"> Add your first plant! </h2>
        <div className="arrow">
          <img src={arrow} />
        </div>
      </div>
    );
  }
}

export default FirstPlant;
