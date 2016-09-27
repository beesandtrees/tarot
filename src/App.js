import React from 'react';
import Card from './components/Card';
import Position from './components/Positions';
import Controls from './components/Controls';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections : this.dealCards(10, 0, true)
    };
    this.shuffleCards = this.shuffleCards.bind(this);
  }
  dealCards(display, type, load) {
    // type should be an integer between 0 and 0.5
    // this will determine the frequency of reversed cards
    // new array of cards
    let sections = [];

    // create new array of all cards to manipulate
    let cards = this.props.cards.slice(0);

    // this is the number of cards to return
    let allCards = display;

    // which layout
    let layout = display > 3 ? 0 : 1;

    for (var i = 0; i < allCards; i++) {

      // get a random number from the new array
      var random = Math.floor(Math.random() * cards.length);
      // choose whether or not the card is reversed
      var reversed = Math.random() < type ? true : false;
      // remove the random card from the new array
      var card = cards.splice(random, 1)[0],
          name = card.name,
          position = this.props.layout[layout][i];

      // push the card and the detail of the card to the new array
      if(load !== true) {
        sections.push(<div className="card" key={i}><Card index={i} key={name} value={card} reversed={reversed} position={position} /></div>);
      } else {
        sections.push(<div className="card" key={i}><Position index={i} key={name} value={card} reversed={reversed} position={position} /></div>);
      }

    }
    return sections
  }
  shuffleCards(display, type, load) {
    // replace with new array of cards
    this.setState({sections: this.dealCards(display, type, load)});
  }
	render(){
  		return(
        <div className="board">
            <Controls shuffleCards={(display, type, load) => this.shuffleCards(display, type, load)} />
  			    <div className="cards">{this.state.sections}</div>
        </div>
  		);
	}
}
