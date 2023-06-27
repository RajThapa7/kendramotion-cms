import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  ImageField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

const MemberList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="phone" title="Phone" />
        <Table.Column dataIndex="designation" title="Designation" />
        <Table.Column
          dataIndex={["profileImage"]}
          title="Profile"
          render={(value: any) => (
            <ImageField
              style={{
                maxWidth: "60px",
                height: "60px",
                borderRadius: "100%",
              }}
              value={value}
            />
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

export default MemberList;
