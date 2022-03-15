import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { PREFIX } from "../_util";

console.log("input");

class Input extends Component {
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
    const { type, disabled, onClick } = this.props;
    const cls = classNames(`${PREFIX}-input`, `${PREFIX}-input-${type}`);

    return (
      <input className={cls} onChange={this.handleChange} disabled={disabled} />
    );
  }
}

// 指定 props 的默认值：
Input.defaultProps = {
  type: "default",
};

Input.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Input;
