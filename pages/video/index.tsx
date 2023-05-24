import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  UrlField,
  TagField,
  BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

const VideoList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex={["url"]}
          title="Url"
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column dataIndex="position" title="Position" />
        <Table.Column dataIndex={["artist", "name"]} title="Artist" />
        <Table.Column
          dataIndex={["latest"]}
          title="Latest"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record._id} />
              <ShowButton hideText size="small" recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export default VideoList;
