import React from 'react';
import {Card} from 'antd';

import {Wrapper} from './styled';

const BlockchainCards = ({
  loading,
  data = {},
}) => (
  <Wrapper>
    <Card loading={loading} title="Block count">
      {data.blockCount}
    </Card>
    <Card loading={loading} title="Last Block Hash">
      {data.lastBlockHash}
    </Card>
    <Card loading={loading} title="Peer Count">
      {data.peerCount}
    </Card>
  </Wrapper>
);

export default BlockchainCards;
