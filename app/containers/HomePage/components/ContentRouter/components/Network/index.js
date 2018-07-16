import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getBlockchainStatusRequest,
  getNetworkStatusRequest,
} from './../../../../../../actions/data';

import NetworkTable from './components/Table';
import BlockchainCards from './components/Cards';

class NetworkOverview extends React.Component {
  componentDidMount() {
    this.props.requestBlockchainData();
    this.props.requestNetworkData();
  }
  render() {
    const {network, blockchain, networkLoading, blockchainLoading} = this.props;
    const nodes = network && Object.values(network.nodes);
    return (
      <div>
        <BlockchainCards data={blockchain} loading={blockchainLoading} />
        <NetworkTable nodes={nodes} loading={networkLoading} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      requestBlockchainData: getBlockchainStatusRequest,
      requestNetworkData: getNetworkStatusRequest,
    },
    dispatch,
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    blockchain: state.blockchain.data,
    network: state.network.data,
    networkLoading: state.network.loading,
    blockchainLoading: state.blockchain.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkOverview);
