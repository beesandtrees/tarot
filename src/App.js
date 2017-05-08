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
                pdf.push([card, reversed, position]);
                sections.push(<div className={classes} key={i}><Card index={i} key={name} value={card} reversed={reversed} position={position} /></div>);
            } else {
                sections.push(<div className={classes} key={i}><Position index={i} key={name} value={card} reversed={reversed} position={position} /></div>);
            }

        }
        return [sections, pdf]
    }
    shuffleCards(display, type, load) {
        let cardsArray = this.dealCards(display, type, load);

        console.log(cardsArray);
        // replace with new array of cards
        this.setState({ sections: cardsArray[0] });
        this.setState({ pdf: cardsArray[1] });
        // scroll page to cards
    }
    renderAsText() {
        // render this.state.pdf as Text
    }
    todaysDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }
    makePDF() {
        var pdf = new pdfConverter('l', 'pt', 'letter');

        var pdfLength = this.state.pdf.length,
            date = this.todaysDate();

        pdf.setFontSize(8);
        pdf.text(20, 22, date);

        for (var i = 0; i < pdfLength; i++) {
            let top = i * 52,
                card = this.state.pdf[i][0],
                title = this.state.pdf[i][2] + " - " + card["name"],
                reversed = this.state.pdf[i][1],
                description = reversed ? card["reversed"] : card["upright"];

            var splitDesc = pdf.splitTextToSize(description, 720);

            pdf.setFontSize(12);
            pdf.text(20, 40 + top, title);
            pdf.setFontSize(10);
            pdf.text(20, 52 + top, splitDesc);

        }
        pdf.save("todays-reading.pdf");
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
              </div>
            </div>
        );
    }
}
