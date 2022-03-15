import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { PREFIX } from "../_util";

console.log("button");

class Button extends Component {
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
    const { children, type, disabled, onClick } = this.props;
    const cls = classNames(`${PREFIX}-btn`, `${PREFIX}-btn-${type}`);

    return (
      <button className={cls} onClick={this.handleClick} disabled={disabled}>
        {children}
      </button>
    );
  }
}

// 指定 props 的默认值：
Button.defaultProps = {
  type: "default",
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
