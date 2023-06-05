import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  TagField,
  BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import Link from "next/link";

export const MovieList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

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
          dataIndex="artists"
          title="Artists"
          render={(value: any[]) => (
            <>
              {value?.map((item) => (
                <TagField value={item?.name} key={item?.name} />
              ))}
            </>
          )}
        />
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

export default MovieList;
