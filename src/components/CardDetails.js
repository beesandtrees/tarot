import React, { Component } from 'react';
var classNames = require('classnames');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class CardDetails extends Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {
      image : this.props.value.arcana === 'Minor' ? './images/' + this.props.value.arcana + 'Arcana/' + this.props.value.suit + '/' + this.props.value.suit + this.props.value.id + '.jpg' :
      './images/' + this.props.value.arcana + 'Arcana/' + this.props.value.image + '.jpg',
      classes : classNames({
        "card-detail": true,
        "reversed": this.props.reversed === true
      }),
      description: this.props.reversed === true ? this.props.value.reversed : this.props.value.upright,
      secondaryDescription: this.props.reversed === false ? this.props.value.reversed : this.props.value.upright,
      upright: this.props.reversed === true ? 'Reversed' : 'Upright',
      secondaryDirection: this.props.reversed === false ? 'Reversed' : 'Upright',
    };
  }
  render() {
      if(this.props.isOpen){
         return (
            <ReactCSSTransitionGroup
              transitionName={this.props.transitionName}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
               <div className={this.state.classes}>
                 <button className="close" onClick={this.props.closeModal}>&times;</button>
                 <div className="image-holder">
                     <img src={this.state.image} alt={this.props.value.name} />
                </div>
                 <div className="description">
                    <div className="primary">
                      <h2>{this.props.position} - {this.props.value.name}</h2>
                      <p>{this.state.description}</p>
                    </div>
                    <p className="secondary"><span className="modifier">{this.state.secondaryDirection}</span> {this.state.secondaryDescription}</p>
                  </div>
               </div>
            </ReactCSSTransitionGroup>
         );
     } else {
         return <ReactCSSTransitionGroup
                    transitionName={this.props.transitionName}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300} />;
     }
  }
}
