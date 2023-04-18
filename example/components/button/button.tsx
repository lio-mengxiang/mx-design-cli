import React, { Component } from 'react';

class Button extends Component<any, any> {
  props: any;

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  };

  render() {
    return <button onClick={this.handleClick}>{this.props.children}</button>;
  }
}

export default Button;
