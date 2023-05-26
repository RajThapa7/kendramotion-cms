import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TextField, EmailField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const SubmissionShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Phone Number</Title>
      <TextField value={record?.phoneNumber ?? ""} />
      <Title level={5}>Email</Title>
      <EmailField value={record?.email} />
      <Title level={5}>Video Url</Title>
      <TextField value={record?.videoUrl} />
    </Show>
  );
};

export default SubmissionShow;
