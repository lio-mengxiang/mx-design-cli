import React, { Component } from "react";

class Input extends Component {
  props: { onChange: any };
  constructor(props) {
    super(props);
  }

  handleChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange();
    }
  };

  render() {
    return <input onChange={this.handleChange} />;
  }
}

export default Input;
