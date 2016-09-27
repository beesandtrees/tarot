import React, { Component } from 'react';
import CardDetails from './CardDetails';

export default class Card extends Component {
  state: any;

  constructor(props) {
    super(props);

    let reversed = this.props.reversed === true ? 'reversed ' : '';
    let thisCard = 'card-' + this.props.index;
    let color = this.props.index <= 4 ? 'dark' : 'light'

    this.state = {
      isOpen : false,
      image : this.props.value.arcana === 'Minor' ? './images/' + this.props.value.arcana + 'Arcana/' + this.props.value.suit + '/' + this.props.value.suit + this.props.value.id + '.jpg' :
      './images/' + this.props.value.arcana + 'Arcana/' + this.props.value.image + '.jpg',
      classNames : thisCard + ' ' + reversed + 'single ' + color
    };
    this.openModal = this.openModal.bind(this);
  }
  openModal () {
      this.setState({ isOpen: true });
  }
  closeModal () {
      this.setState({ isOpen: false });
  }
  render() {
    return (
      <div className={this.state.classNames}>
        <img src={this.state.image} alt={this.props.value.name} onClick={this.openModal} />
        <p>{this.props.position} - {this.props.value.name}</p>
        <CardDetails isOpen={this.state.isOpen} closeModal={() => this.closeModal()} transitionName="modal" value={this.props.value} reversed={this.props.reversed} position={this.props.position} />
      </div>
    )
  }
}
