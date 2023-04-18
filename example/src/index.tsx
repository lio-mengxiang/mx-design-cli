import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { Button, Card, Input } from '../components/index';

ReactDOM.render(
  <div className="test">
    <h1>Hello, Boy!</h1>
    <Button type="primary" onClick={() => alert('test')}>
      `test
    </Button>
    <p>
      <Input onChange={() => console.log(1)} />
    </p>

    <p>
      <Card>test</Card>
    </p>
  </div>,
  document.getElementById('root')
);
