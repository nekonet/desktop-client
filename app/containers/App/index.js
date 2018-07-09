// @flow
import * as React from 'react';
import {GlobalWrapper} from './styled';
type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return <GlobalWrapper>{this.props.children}</GlobalWrapper>;
  }
}
