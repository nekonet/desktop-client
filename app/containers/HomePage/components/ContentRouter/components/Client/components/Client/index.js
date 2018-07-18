import React from 'react';
import {Input, Button} from 'antd';
import {Wrapper} from './styled';

class ClientRequest extends React.Component {
  state = {url: ''};

  handleRequest = () => {
    this.props.request(this.state.url);
  };

  render() {
    const {disabled, loading} = this.props;
    return (
      <Wrapper>
        <Input
          disabled={disabled || loading}
          onChange={e => this.setState({url: e.target.value})}
          placeholder="URL"
        />
        <Button
          type="primary"
          onClick={this.handleRequest}
          disabled={disabled}
          loading={loading}>
          GET
        </Button>
      </Wrapper>
    );
  }
}

export default ClientRequest;
