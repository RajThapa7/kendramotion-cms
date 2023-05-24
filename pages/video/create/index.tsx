import React from "react";
import { IResourceComponentsProps, useMany } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Checkbox, Form, Input, Select, Space } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

export const CreateVideo: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { data, isLoading } = useMany({
    resource: "artist-profile",
    ids: [],
  });

  const artists = data?.data;

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Url"
          name={["url"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Position"
          name={["position"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Latest" valuePropName="checked" name={["latest"]}>
          <Checkbox>Latest</Checkbox>
        </Form.Item>
        <Form.Item
          label="Artists"
          name={["artists"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select artists"
          >
            {artists?.map((item) => (
              <Select.Option value={item._id} label={item.name}>
                <Space>{item.name}</Space>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Create>
  );
};

export default CreateVideo;
