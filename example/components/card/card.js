import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { PREFIX } from "../_util";

console.log("card");

class Card extends Component {
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
    const { type, onClick, children } = this.props;
    const cls = classNames(`${PREFIX}-card`, `${PREFIX}-card-${type}`);

    return <div className={cls}>{children}</div>;
  }
}

// 指定 props 的默认值：
Card.defaultProps = {
  type: "default",
};

Card.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;
