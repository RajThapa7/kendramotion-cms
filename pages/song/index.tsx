import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  DeleteButton,
  ShowButton,
  BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import Link from "next/link";
import { AntdInferencer } from "@refinedev/inferencer/antd";

export const SongList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  // return <AntdInferencer />;

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex="_id" title="Id" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex={["latest"]}
          title="Latest"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column
          dataIndex="url"
          title="Url"
          render={(item) => (
            <Link href={item} target="_blank">
              {item}
            </Link>
          )}
        />
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
