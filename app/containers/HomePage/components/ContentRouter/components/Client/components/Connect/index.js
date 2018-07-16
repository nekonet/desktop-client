import React from 'react';
import {Button} from 'antd';

class ConnectButton extends React.Component {
  render() {
    const {disabled} = this.props;
    return (
      <Button type="primary" disabled={disabled}>
        Connect to network
      </Button>
    );
  }
}

export default ConnectButton;
