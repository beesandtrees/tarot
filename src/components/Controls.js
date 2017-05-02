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
          <h1>New Reading</h1>
          <hr />
          <h2>10 Cards</h2>
          <button onClick={() => this.props.shuffleCards(10, 0.05)}>Careful Shuffle</button>
          <button onClick={() => this.props.shuffleCards(10, 0.4)}>Fully Random</button>
          <hr />
          <button className="ppf" onClick={() => this.props.shuffleCards(3, 0)}>Past, Present, Future</button>
          <button className="today" onClick={() => this.props.shuffleCards(1, 0)}>Draw A  Card</button>
      </div>
    )
  }
}
