import React, { Component } from 'react';

export default class Controls extends Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {
      something : false
    };
  }
  render() {
    return (
      <div className="controls">
          <h2>Create Your Reading</h2>
          <hr />
          <h3>10 Card Layouts</h3>
          <button onClick={() => this.props.shuffleCards(10, 0.05)}>Careful Shuffle</button>
          <button onClick={() => this.props.shuffleCards(10, 0.4)}>Fully Random</button>
          <hr />
          <h3>Other Layouts</h3>
          <button className="ppf" onClick={() => this.props.shuffleCards(3, 0)}>Past, Present, Future</button>
          <button className="today" onClick={() => this.props.shuffleCards(1, 0)}>Single Card</button>
      </div>
    )
  }
}
