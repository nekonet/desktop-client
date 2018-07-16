import React from 'react';
import {Card} from 'antd';

const BlockchainCards = ({
  loading,
  data: {blockCount, lastBlockHash, peerCount},
}) => (
  <div>
    <Card loading={loading} title="Block count">
      {blockCount}
    </Card>
    <Card loading={loading} title="Last Block Hash">
      {lastBlockHash}
    </Card>
    <Card loading={loading} title="Peer Count">
      {peerCount}
    </Card>
  </div>
);

export default BlockchainCards;
