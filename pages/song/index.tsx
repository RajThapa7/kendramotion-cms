import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const SongList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  console.log(tableProps, "table props");

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex="_id" title="Id" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="url" title="Url" />
        <Table.Column dataIndex="position" title="Position" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record._id} />
              <ShowButton hideText size="small" recordItemId={record._id} />
              <DeleteButton hideText size="small" recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export default SongList;
