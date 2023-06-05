import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  ImageField,
  DeleteButton,
  BooleanField,
  EditButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

const BannerList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="name" title="File name" />
        <Table.Column
          dataIndex={["url"]}
          title="Image"
          render={(value: any) => (
            <ImageField style={{ maxWidth: "100px" }} value={value} />
          )}
        />
        <Table.Column dataIndex="type" title="Type" />
        <Table.Column dataIndex="size" title="Size" />
        <Table.Column
          dataIndex={["roadBlock"]}
          title="Roadblock"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record._id} />
              <DeleteButton hideText size="small" recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export default BannerList;
