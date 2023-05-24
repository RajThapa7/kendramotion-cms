import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TextField, NumberField } from "@refinedev/antd";
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
    </Show>
  );
};

export default ShowMember;
