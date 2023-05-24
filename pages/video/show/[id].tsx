import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  Show,
  TextField,
  UrlField,
  NumberField,
  BooleanField,
} from "@refinedev/antd";
import { Typography } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

const { Title } = Typography;

export const ShowVideo: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Url</Title>
      <UrlField value={record?.url} />
      <Title level={5}>Position</Title>
      <NumberField value={record?.position ?? ""} />
      <Title level={5}>Artist</Title>
      <TextField value={record?.artist?.name} />
      <Title level={5}>Latest</Title>
      <BooleanField value={record?.latest} />
    </Show>
  );
};

export default ShowVideo;
