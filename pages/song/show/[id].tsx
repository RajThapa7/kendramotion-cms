import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TextField, UrlField, NumberField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const SongShow: React.FC<IResourceComponentsProps> = () => {
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
    </Show>
  );
};

export default SongShow;
