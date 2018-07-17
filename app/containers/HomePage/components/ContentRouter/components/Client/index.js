import React from 'react';
import socket from 'socket.io-client';
import aesjs from 'aes-js';
import CryptoJS from 'crypto-js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Select} from 'antd';
import {clientRequest} from './../../../../../../actions/data';
import {getRandomFromArray} from './../../../../../../utils';
import Client from './components/Client';
import ConnectButton from './components/Connect';
import {Wrapper} from './styled';

const Option = Select.Option;
const nodesPort = 5000;

class ClientPage extends React.Component {
  state = {
    selectedToken: {},
  };

  componentDidMount() {
    const p = 7;
    const g = Math.floor(Math.random() * (100 - 1) + 1);
    const salt = '111111111111111';
    const secret_1 = Math.floor(Math.random() * (100 - 1) + 1);
    const secret_2 = Math.floor(Math.random() * (100 - 1) + 1);
    const secret_3 = Math.floor(Math.random() * (100 - 1) + 1);
    const shared_1 = Math.pow(g, secret_1) % p;
    const shared_2 = Math.pow(g, secret_2) % p;
    const shared_3 = Math.pow(g, secret_3) % p;
    const selectedNodes = getRandomFromArray(this.props.nodes, 3);
    const socket = socket_io(`${selectedNodes[0].url}:${nodesPort}`);

    this.setState(
      {
        p,
        g,
        salt,
        secret_1,
        secret_2,
        secret_3,
        shared_1,
        shared_2,
        shared_3,
        selectedNodes,
        socket,
        socketConnected: false,
      },
      this.listenToSocket,
    );
  }

  listenToSocket = () => {
    const {socket} = this.state;
    socket.on('connect', () => {
      this.setState({
        socketConnected: true,
      });
    });

    socket.on('response1', response => {
      const {secret_1, p} = this.state;
      const shared_secret_1 = Math.pow(response.shared_node, secret_1) % p;
      const key_1 = shared_secret_1 + salt;
      this.setState({
        uuid_1: response.uuid,
        key_1,
      });
      console.log('Generated key 1 with response: ', response, key_1);
    });
    socket.on('response2', response => {
      const {secret_2, p, salt} = this.state;
      const shared_secret_2 = Math.pow(response.shared_node, secret_2) % p;
      const key_2 = shared_secret_2 + salt;
      console.log('Generated key 2 with response: ', response, key_2);
      this.setState({
        uuid_2: response.uuid,
        key_2,
      });
    });

    socket.on('response3', response => {
      const {secret_3, p} = this.state;
      const shared_secret_3 = Math.pow(response.shared_node, secret_3) % p;
      const key_3 = shared_secret_3 + salt;
      console.log('Generated key 3 with response: ', response, key_3);
      this.setState({
        uuid_3: response.uuid,
        key_3,
      });
    });
  };

  handleConnectToNetwork = () => {
    const {
      socket,
      selectedNodes,
      selectedToken,
      p,
      g,
      shared_1,
      shared_2,
      shared_3,
    } = this.state;
    socket.emit('create_connection', {
      p,
      g,
      s1: shared_1,
      s2: shared_2,
      s3: shared_3,
      jump: 1,
      second_host: selectedNodes[1].url,
      third_host: selectedNodes[2].url,
      second_port: nodesPort,
      third_port: nodesPort,
      authorization: selectedTokens.token,
    });
  };

  handleTokenSelect = value => {
    const selectedToken = this.props.tokens.tokens[value];
    this.setState({selectedToken});
  };

  handleSendRequest = url => {
    const {
      selectedNodes,
      uuid_1,
      uuid_2,
      uuid_3,
      key_1,
      key_2,
      key_3,
      selectedToken,
    } = this.state;
    const ciphertext_1 = CryptoJS.AES.encrypt(key_1, url);
    const ciphertext_2 = CryptoJS.AES.encrypt(key_2, ciphertext.toString());
    const ciphertext_3 = CryptoJS.AES.encrypt(key_3, ciphertext_2.toString());
    console.log(
      'Ciphertext is: ',
      ciphertext_1.toString(),
      ciphertext_2.toString(),
      ciphertext_3.toString(),
    );

    socket.emit('decrypt_and_send', {
      jump: 1,
      second_host: selectedNodes[1].url,
      second_port: nodesPort,
      third_host: selectedNodes[2].url,
      third_port: nodesPort,
      uuid1: uuid_1,
      uuid2: uuid_2,
      uuid3: uuid_3,
      message: ciphertext_3.toString(),
      authorization: selectedToken,
    });
    socket.on('decrypt_and_send', (content) => {
      console.log('Decrypt_and_send response: ', content);
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
