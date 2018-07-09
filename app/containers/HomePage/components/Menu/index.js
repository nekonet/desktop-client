import React from 'react';
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class PageMenu extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{width: '100%'}}
        defaultSelectedKeys={['Network.Overview']}
        defaultOpenKeys={['Network', 'Tokens', 'Daemon']}
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
        <SubMenu
          key="Daemon"
          title={
            <span>
              <Icon type="api" />
              <span>Daemon</span>
            </span>
          }>
          <Menu.Item key="Daemon.Status">Status</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default PageMenu;
