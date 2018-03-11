import React from 'react';
import './UserPlant.css';
import plant from '../images/plant.png';
import dropBlue from '../images/drop.png';
import dropGray from '../images/drop_gray.png';
import moment from 'moment';

class UserPlant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropMap: {
        low: 1,
        medium: 2,
        high: 3
      }
    };

    this.getDrops.bind(this);
  }

  getDrops() {
    let drops = [];
    const numDrops = this.state.dropMap[this.props.plant.water];
    const now = moment();

    // If this plant has never been watered, all the drops should be gray.
    if (this.props.last_watered === null) {
      // dropMap # of gray drops
      console.log(`never watered, needs ${numDrops} drops`);
      for (let i = 0; i < numDrops; i++) {
        drops.push(<img key={i} className="dropImg" src={dropGray} />);
      }
    } else {
      console.log(this.props.last_watered);
      const daysSinceLastWater = now.diff(this.props.last_watered, 'days');
      // # gray drops = days since last water / water frequency
      // ex: water every 3 days. havent watered in 1 day.
      // show 1/3 of the total drops as gray
      const grayDropsRatio = daysSinceLastWater / this.props.water_frequency;
      const grayDrops = grayDropsRatio * numDrops;
      const blueDrops = numDrops - grayDrops;
      for (let i = 0; i < blueDrops; i++) {
        drops.push(<img key={i} className="dropImg" src={dropBlue} />);
      }
      for (let i = 0; i < grayDrops; i++) {
        drops.push(<img key={i} className="dropImg" src={dropGray} />);
      }
    }

    console.log(drops);
    return drops;
  }

  render() {
    let drops = this.getDrops();

    // if this component is passed handleClick, we know we are rendering
    // the index page and we need the image to be clickable. Otherwise,
    // we are rendering the show page and the image shouldn't be clickable.
    // Index page
    if ('handleClick' in this.props) {
      return (
        <div className="userPlant">
          <img
            src={plant}
            onClick={this.props.handleClick}
            className="userPlantImg index"
          />
          <div className="userPlantName userPlantProp">
            {this.props.nickname}
          </div>
          <div className="userPlantType userPlantProp">
            {this.props.plant.name}
          </div>
          <div className="userPlantWater userPlantProp">{drops}</div>
        </div>
      );
    } else {
      // Show page
      return (
        <div className="userPlant">
          <img src={plant} className="userPlantImg" />
          <div className="userPlantName userPlantProp">
            {this.props.nickname}
          </div>
          <div className="userPlantType userPlantProp">
            {this.props.plant.name}
          </div>
          <div className="userPlantWater userPlantProp">{drops}</div>
          <button className="water" onClick={this.props.waterClick}>
            WATER
          </button>
        </div>
      );
    }
  }
}

export default UserPlant;
