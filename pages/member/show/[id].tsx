import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TextField, NumberField, ImageField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ShowMember: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Phone</Title>
      <NumberField value={record?.phone ?? ""} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Designation</Title>
      <TextField value={record?.designation} />
      <Title level={5}>Profile Picture</Title>
      <ImageField
        style={{
          maxWidth: "100px",
          height: "100px",
          borderRadius: "100%",
        }}
        value={record?.profileImage}
      />
    </Show>
  );
};

export default ShowMember;
