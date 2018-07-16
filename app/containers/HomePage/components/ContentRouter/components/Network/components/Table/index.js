import React from 'react';
import {Table} from 'antd';
const {Column, ColumnGroup} = Table;

const networkTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: 'Address',
    dataIndex: 'wallet_address',
    key: 'wallet_address',
  },
];

const NetworkTable = ({nodes, loading}) => {
  return (
    <Table
      pagination={{position: 'none'}}
      size="middle"
      columns={networkTableColumns}
      loading={loading}
      dataSource={nodes}
    />
  );
};

export default NetworkTable;
