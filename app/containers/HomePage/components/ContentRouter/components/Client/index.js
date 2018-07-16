import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Select} from 'antd';
import {clientRequest} from './../../../../../../actions/data';
import Client from './components/Client';
import ConnectButton from './components/Connect';
import {Wrapper} from './styled';

const Option = Select.Option;

class ClientPage extends React.Component {
  state = {
    selectedToken: {},
    selectedNodes: [],
  };

  handleTokenSelect = value => {
    const selectedToken = this.props.tokens.tokens[value];
    this.setState({selectedToken});
  };

  handleSelectedNodes = selectedNodes => {
    this.setState({selectedNodes});
  };

  render() {
    const {tokens, nodes, request} = this.props.tokens;
    const {selectedToken, selectedNodes} = this.state;
    const isTokenSelected = Object.keys(selectedToken).length;
    const isNodesSelected = !!selectedNodes.length;
    return (
      <Wrapper>
        <Select
          style={{width: 300}}
          placeholder="Select a token"
          onChange={this.handleTokenSelect}>
          {Object.values(tokens).map(token => (
            <Option key={token.tx_id} value={token.tx_id}>
              Price: {token.price} | Expiration: {token.expires_at}
            </Option>
          ))}
        </Select>

        <ConnectButton
          disabled={!isTokenSelected}
          nodes={nodes}
          onSelectedNodes={this.handleSelectedNodes}
        />

        <Client
          request={request}
          token={selectedToken}
          nodes={nodes}
          disabled={!isNodesSelected}
        />
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      request: clientRequest,
    },
    dispatch,
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    tokens: state.tokens,
    nodes: state.nodes,
    restClient: state.restClient,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientPage);
