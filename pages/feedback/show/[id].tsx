import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import { Show, TextField, EmailField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const FeedbackShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: feedbackData, isLoading: feedbackIsLoading } = useOne({
    resource: "feedback",
    id: record?.feedback || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <TextField value={record?._id} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Email</Title>
      <EmailField value={record?.email} />
      <Title level={5}>Feedback</Title>
      <TextField value={record?.feedback} />
    </Show>
  );
};

export default FeedbackShow;
