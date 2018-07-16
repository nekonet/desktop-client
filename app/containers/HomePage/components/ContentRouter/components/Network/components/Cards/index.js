import React from 'react';
import {Card} from 'antd';

const BlockchainCards = ({
  loading,
  data = {},
}) => (
  <div>
    <Card loading={loading} title="Block count">
      {data.blockCount}
    </Card>
    <Card loading={loading} title="Last Block Hash">
      {data.lastBlockHash}
    </Card>
    <Card loading={loading} title="Peer Count">
      {data.peerCount}
    </Card>
  </div>
);

export default BlockchainCards;
