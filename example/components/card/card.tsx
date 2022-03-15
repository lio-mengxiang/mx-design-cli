import React, { Component } from "react";
import classNames from "classnames";
import { PREFIX } from "../_util";

console.log("card");

class Card extends Component {
  props: { onChange: any; children: any };
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
    const cls = classNames(`${PREFIX}-card`);

    return <div className={cls}>{this.props.children}</div>;
  }
}

export default Card;
