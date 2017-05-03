import React from 'react';
import Card from './components/Card/Card';
import Position from './components/Positions/Positions';
import Controls from './components/Controls/Controls';

var pdfConverter = require('jspdf');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pdf: [],
            sections: this.dealCards(10, 0, true)
        };
        this.shuffleCards = this.shuffleCards.bind(this);
    }
    dealCards(display, type, load) {
        // type should be an integer between 0 and 0.5
        // this will determine the frequency of reversed cards
        // new array of cards
        let sections = [];
        let pdf = [];

        // create new array of all cards to manipulate
        let cards = this.props.cards.slice(0);

        // this is the number of cards to return
        let allCards = display;

        // which layout
        let layout = 0;

        switch (display) {
            case 3:
                layout = 1;
                break;
            case 1:
                layout = 2;
                break;
            default:
                layout = 0;
        }

        for (var i = 0; i < allCards; i++) {

            // get a random number from the new array
            var random = Math.floor(Math.random() * cards.length);
            // choose whether or not the card is reversed
            var reversed = Math.random() < type ? true : false;
            // remove the random card from the new array
            var card = cards.splice(random, 1)[0],
                name = card.name,
                position = this.props.layout[layout][i];

            var classes = layout === 2 ? "card todays" : "card";

            // push the card and the detail of the card to the new array
            if (load !== true) {
                pdf.push(<div>{name}</div>);
                sections.push(<div className={classes} key={i}><Card index={i} key={name} value={card} reversed={reversed} position={position} /></div>);
            } else {
                sections.push(<div className={classes} key={i}><Position index={i} key={name} value={card} reversed={reversed} position={position} /></div>);
            }

        }
        return [sections, pdf]
    }
    shuffleCards(display, type, load) {
      let cardsArray = this.dealCards(display, type, load);
        // replace with new array of cards
        this.setState({ sections:  cardsArray[0]});
        this.setState({ pdf: cardsArray[1] });
        // scroll page to cards
    }
    renderAsText() {
      // render this.state.pdf as Text
    }
    makePDF() {

        var pdf = new pdfConverter('p', 'pt', 'letter');
        var source = this.state.pdf;

        var margins = {
            top: 50,
            left: 60,
            width: 545
        };

        pdf.fromHTML(
                source, // HTML string or DOM elem ref.
                margins.left, // x coord
                margins.top, // y coord
                {
                    'width': margins.width
                },
                function(dispose) {
                    // dispose: object with X, Y of the last line add to the PDF
                    // this allow the insertion of new lines after html
                    pdf.save('todays-reading.pdf');
                }
            )
            // doc.setFontSize(22);
            // doc.text(20, 50, 'Park Entry Ticket');
            // doc.setFontSize(16);
            // doc.text(20, 80, 'Address1: ');
            // doc.text(20, 100, 'Address2: ');
            // doc.text(20, 120, 'Entry Date & time: ');
            // doc.text(20, 140, 'Expiry date & time: ');
            // doc.save("test.pdf");        
    }
    render() {
        return (
            <div className="board">
          <div className="header">
            <h1>Tarot</h1>
            <div className="explanation">
              <p>Tarot cards have been used in divination for hundereds of years. Each card has a meaning and read together some believe that they reveal your fortune. Use the controls below to create a unique reading. You can then save the details of your reading for later contemplation.</p>
            </div>
          </div>
          <Controls shuffleCards={(display, type, load) => this.shuffleCards(display, type, load)} />
          <div className="cards" id="cards">
            {this.state.sections}
            <button className="pdf" onClick={() => this.makePDF()}>Download PDF</button>
            <button className="pdf" onClick={() => this.renderAsText()}>View As Text</button>
          </div>
        </div>
        );
    }
}
