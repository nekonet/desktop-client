import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Menu, Icon} from 'antd';
import {push} from 'react-router-redux';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class PageMenu extends React.Component {
  state = {
    current: 'Network',
  };

  componentDidMount() {
    this.props.redirectTo('/network');
  }

  handleClick = ({key}) => {
    const {redirectTo} = this.props;
    this.setState({
      current: key,
    });
    switch (key) {
      case 'Network':
        redirectTo('/network');
        break;
      case 'Wallet':
        redirectTo('/wallet');
        break;
      case 'Tokens':
        redirectTo('/tokens');
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['Network']}
        style={{lineHeight: '35px', background: 'inherit'}}
        selectedKeys={[this.state.current]}
        mode="horizontal">
        <Menu.Item key="Network">
          <span>
            <Icon type="global" />
            <span>Network</span>
          </span>
        </Menu.Item>
        <Menu.Item key="Wallet">
          <span>
            <Icon type="wallet" />
            <span>Wallets</span>
          </span>
        </Menu.Item>
        <Menu.Item key="Tokens">
          <span>
            <Icon type="key" />
            <span>Tokens</span>
          </span>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      redirectTo: push,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(PageMenu);
