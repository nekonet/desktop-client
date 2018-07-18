/*
 * DISCLAIMER: No judgerino pls. This is not how I normally code, the component below was done under an extremely high dose of caffeine and in a severe state of sleep deprivation while trying to fit a tight deadline.
 */

import React from 'react';
import socket_io from 'socket.io-client';
import {connect} from 'react-redux';
import CryptoJS from 'cryptojs';

import {bindActionCreators} from 'redux';
import {Select, Button} from 'antd';
import {clientRequest} from './../../../../../../actions/data';
import {getRandomFromArray} from './../../../../../../utils';
import Client from './components/Client';
import ConnectButton from './components/Connect';
import {Wrapper, Response} from './styled';

const Option = Select.Option;
const nodesPort = 5000;

class ClientPage extends React.Component {
  state = {
    selectedToken: {},
    requestingForContent: false,
  };

  componentDidMount() {
    const p = 1;
    const g = 1;
    const IV = 'This is an IV456';

    const MODE = new Crypto.mode.CFB(Crypto.pad.ZeroPadding);
    const salt = '111111111111111';
    const options = {
      iv: Crypto.charenc.UTF8.stringToBytes(IV),
      asBytes: true,
      mode: MODE,
    };

    const secret_1 = Math.floor(Math.random() * (100 - 1) + 1);
    const secret_2 = Math.floor(Math.random() * (100 - 1) + 1);
    const secret_3 = Math.floor(Math.random() * (100 - 1) + 1);
    const shared_1 = Math.pow(g, secret_1) % p;
    const shared_2 = Math.pow(g, secret_2) % p;
    const shared_3 = Math.pow(g, secret_3) % p;
    const selectedNodes = ['46.101.182.73', '46.101.238.96', '46.101.246.46'];
    const socket = socket_io(`http://${selectedNodes[0]}:${nodesPort}`);

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
        options,
        socket,
        socketConnected: false,
      },
      this.listenToSocket,
    );
  }

  listenToSocket = () => {
    const {socket} = this.state;
    socket.on('connect', ev => {
      socket.on('response1', response => {
        const {secret_1, p, salt} = this.state;
        const shared_secret_1 = Math.pow(response.shared_node, secret_1) % p;
        const key_1 = salt + shared_secret_1;
        console.log('Generated key 1 with response: ', response, key_1);
        this.setState({
          uuid_1: response.uuid,
          key_1,
        });
      });
      socket.on('response2', response => {
        const {secret_2, p, salt} = this.state;
        const shared_secret_2 = Math.pow(response.shared_node, secret_2) % p;
        const key_2 = salt + shared_secret_2;
        console.log('Generated key 2 with response: ', response, key_2);
        this.setState({
          uuid_2: response.uuid,
          key_2,
        });
      });
      socket.on('response3', response => {
        const {secret_3, p, salt} = this.state;
        const shared_secret_3 = Math.pow(response.shared_node, secret_3) % p;
        const key_3 = salt + shared_secret_3;
        console.log('Generated key 3 with response: ', response, key_3);
        this.setState({
          uuid_3: response.uuid,
          key_3,
        });
      });

      socket.on('content', response => {
        console.log('Content received: ', response);
        this.setState({
          response,
          requestingForContent: false,
        });
      });

      this.setState({
        socketConnected: true,
        socket,
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
    const payload = {
      p,
      g,
      s1: shared_1,
      s2: shared_2,
      s3: shared_3,
      jump: 1,
      second_host: selectedNodes[1],
      third_host: selectedNodes[2],
      second_port: nodesPort,
      third_port: nodesPort,
      authorization: selectedToken.token,
    };

    socket.emit('create_conection', payload);
    this.setState({
      hasStartedConnectingToNetwork: true,
    });
  };

  handleTokenSelect = value => {
    const selectedToken = this.props.tokens.tokens[value];
    this.setState({selectedToken});
  };

  handleSendRequest = message => {
    const {
      selectedNodes,
      uuid_1,
      uuid_2,
      uuid_3,
      key_1,
      key_2,
      key_3,
      selectedToken,
      options,
      socket,
    } = this.state;
    console.log('Message is: ', message);
    const input_bytes = Crypto.charenc.UTF8.stringToBytes(message);

    console.log('Key 1: ', key_1);
    console.log('Key 2: ', key_2);
    console.log('Key 3: ', key_3);

    const key_1_b = Crypto.charenc.UTF8.stringToBytes(key_1);
    const key_2_b = Crypto.charenc.UTF8.stringToBytes(key_2);
    const key_3_b = Crypto.charenc.UTF8.stringToBytes(key_3);

    const encrypted_1 = Crypto.AES.encrypt(input_bytes, key_1_b, options);
    const encrypted_hex_1 = Crypto.util.bytesToHex(encrypted_1);
    const encrypted_2 = Crypto.AES.encrypt(encrypted_hex_1, key_2_b, options);
    const encrypted_hex_2 = Crypto.util.bytesToHex(encrypted_2);
    const encrypted_3 = Crypto.AES.encrypt(encrypted_hex_2, key_3_b, options);
    const encrypted_hex_3 = Crypto.util.bytesToHex(encrypted_3);

    const payload = {
      jump: 1,
      second_host: selectedNodes[1],
      second_port: nodesPort,
      third_host: selectedNodes[2],
      third_port: nodesPort,
      uuid1: uuid_1,
      uuid2: uuid_2,
      uuid3: uuid_3,
      message: encrypted_hex_3,
      authorization: selectedToken.token,
    };

    console.log(
      'Sending decrypt and send with payload: ',
      JSON.stringify(payload),
    );

    socket.emit('decrypt_and_send', payload);
    socket.on('decrypt_and_send', content => {
      console.log('Decrypt_and_send response: ', content);
    });

    this.setState({
      requestingForContent: true,
    });
  };

  render() {
    const {tokens, nodes, request} = this.props.tokens;
    const {
      selectedToken,
      selectedNodes,
      key_1,
      key_2,
      key_3,
      hasStartedConnectingToNetwork,
      response,
      requestingForContent,
    } = this.state;
    const isTokenSelected = Object.keys(selectedToken).length;
    const isNodesSelected = selectedNodes && !!selectedNodes.length;
    const isReadyToRequest = key_1 && key_2 && key_3;
    const isConnectingToNetwork =
      !isReadyToRequest && hasStartedConnectingToNetwork;
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

        <Button
          disabled={!isTokenSelected}
          onClick={this.handleConnectToNetwork}
          loading={isConnectingToNetwork}
          type="primary">
          Connect to Network
        </Button>

        <Client
          request={this.handleSendRequest}
          token={selectedToken}
          nodes={nodes}
          disabled={!isReadyToRequest}
          loading={requestingForContent}
        />

        <Response dangerouslySetInnerHTML={{__html: response}}></Response>
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
