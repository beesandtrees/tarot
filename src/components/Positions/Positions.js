import React, { Component } from 'react';

export default class Positions extends Component {
  state: any;

  constructor(props) {
    super(props);

    let thisCard = 'card-' + this.props.index;
    let color = this.props.index <= 4 ? 'dark' : 'light'

    this.state = {
      classNames : thisCard + ' position ' + color
    };
  }
  render() {
    return (
      <div className={this.state.classNames}>
        <p>{this.props.position}</p>
      </div>
    )
  }
}
