import React from 'react';
import {Input, Button} from 'antd';
import {Wrapper} from './styled';

class ClientRequest extends React.Component {
  state = {url: ''};
  
  handleRequest = () => {
    this.props.request({
      method: 'get',
      url: this.state.url,
      payload: null,
    });
  }

  render() {
    const {disabled} = this.props;
    return (
      <Wrapper>
        <Input
          disabled={disabled}
          onChange={e => this.setState({url: e.target.value})}
          placeholder="URL"
        />
        <Button type="primary" onClick={this.handleRequest} disabled={disabled}>
          GET
        </Button>
      </Wrapper>
    );
  }
}

export default ClientRequest;
