import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import { Button, Card, Input } from "../components/index";

ReactDOM.render(
  <div className="winyh">
    <h1>Hello, Boy!</h1>
    <Button type="primary" onClick={() => alert("winyh")}>
      winyh33
    </Button>
    <p>
      <Input onChange={() => console.log(1)} />
    </p>

    <p>
      <Card>Car你的sdfd</Card>
    </p>
  </div>,
  document.getElementById("root")
);
