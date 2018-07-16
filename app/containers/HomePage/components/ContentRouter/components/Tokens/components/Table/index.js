import React from 'react';
import {Table} from 'antd';
const {Column, ColumnGroup} = Table;

const tokensTableColumns = [
  {
    title: 'Transaction ID',
    dataIndex: 'tx_id',
    key: 'tx_id',
  },
  {
    title: 'Amount',
    dataIndex: 'tx_amount',
    key: 'tx_amount',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Expires at',
    dataIndex: 'expires_at',
    key: 'expires_at',
  },
  {
    title: 'Transaction timestamp',
    dataIndex: 'tx_timestamp',
    key: 'tx_timestamp',
  },
  {
    title: 'Token',
    dataIndex: 'token',
    key: 'token',
  },
];

const TokensTable = ({data}) => {
  return (
    <Table
      pagination={{position: 'none'}}
      size="middle"
      columns={tokensTableColumns}
      dataSource={data}
    />
  );
};

export default TokensTable;
