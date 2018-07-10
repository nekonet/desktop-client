import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Menu, Icon} from 'antd';
import {push} from 'react-router-redux';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class PageMenu extends React.Component {
  
  componentDidMount() {
    this.props.redirectTo('/network/overview');
  }

  handleClick = ({key}) => {
    const {redirectTo} = this.props;
    switch (key) {
      case 'Network.Overview':
        redirectTo('/network/overview');
        break;
      case 'Network.REST_Client':
        redirectTo('/network/rest_client');
        break;
      case 'Account.Overview':
        redirectTo('/account/overview');
        break;
      case 'Account.Create':
        redirectTo('/account/create');
        break;
      case 'Tokens.Overview':
        redirectTo('/tokens/overview');
        break;
      case 'Tokens.Buy':
        redirectTo('/tokens/buy');
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{width: '100%'}}
        defaultSelectedKeys={['Network.Overview']}
        defaultOpenKeys={['Network', 'Wallet', 'Tokens']}
        mode="inline">
        <SubMenu
          key="Network"
          title={
            <span>
              <Icon type="global" />
              <span>Network</span>
            </span>
          }>
          <Menu.Item key="Network.Overview">Overview</Menu.Item>
          <Menu.Item key="Network.REST_Client">REST Client</Menu.Item>
        </SubMenu>
        <SubMenu
          key="Wallet"
          title={
            <span>
              <Icon type="wallet" />
              <span>Wallets</span>
            </span>
          }>
          <Menu.Item key="Wallet.Overview">Overview</Menu.Item>
          <Menu.Item key="Wallet.Create">Create</Menu.Item>
        </SubMenu>
        <SubMenu
          key="Tokens"
          title={
            <span>
              <Icon type="key" />
              <span>Access Tokens</span>
            </span>
          }>
          <Menu.Item key="Tokens.Overview">Overview</Menu.Item>
          <Menu.Item key="Tokens.Buy">Buy Tokens</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    redirectTo: push
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(PageMenu);
