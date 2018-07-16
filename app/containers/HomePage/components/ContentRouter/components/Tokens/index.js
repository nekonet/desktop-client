import React from 'react';
import {Input, Button} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTokenRequest} from './../../../../../../actions/data';
import TokensTable from './components/Table';

class TokensOverview extends React.Component {
  state = {
    txID: '',
  };
  getTokenData = tx_id => {
    if (!this.props.tokens.tokens[tx_id]) {
      this.props.requestToken(tx_id);
    }
  };
  render() {
    const {tokens, loading} = this.props.tokens;
    const {txID} = this.state;

    const tokenData = tokens && Object.values(tokens);
    return (
      <div>
        <div>
          <Input
            placeholder="Transaction ID"
            onChange={e => {
              this.setState({txID: e.target.value});
            }}
          />
          <Button
            icon="search"
            type="primary"
            loading={loading}
            onClick={() => this.getTokenData(txID)}>
            Search Token
          </Button>
        </div>
        <TokensTable data={tokenData} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      requestToken: getTokenRequest,
    },
    dispatch,
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log('State is: ', state);
  return {
    tokens: state.tokens,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TokensOverview);
