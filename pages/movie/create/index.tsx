import React, { useMemo, useState } from "react";
import { IResourceComponentsProps, useMany } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Checkbox, Form, Image, Input, Select, Skeleton, Space } from "antd";

type Artist = {
  _id: string;
  name: string;
  designation: string;
  phone: string;
};

export const MovieCreate: React.FC<IResourceComponentsProps> = () => {
  const [url, setUrl] = useState<string>();

  const imageUrl = useMemo(() => {
    const id = url?.split("v=")[1];

    if (typeof id !== "undefined") {
      const imgUrl = `https://img.youtube.com/vi/${id}/0.jpg`;
      return imgUrl;
    }
    return "";
  }, [url]);

  const { formProps, saveButtonProps } = useForm();

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
          label="Image URL"
          name={["url"]}
          rules={[{ required: true }]}
        >
          <Input onChange={(e) => setUrl(e.target.value)} />
        </Form.Item>

        {/* <Form.Item label="Image Preview" /> */}
        <p style={{ fontSize: "15.5px" }}>Image Preview</p>
        {imageUrl && (
          <Image
            width={200}
            src={`${imageUrl}`}
            alt={"Preview"}
            style={{ borderRadius: "6px", marginBottom: "1rem" }}
            loading={"lazy"}
          />
        )}
        {!imageUrl && (
          <Skeleton.Image
            style={{
              width: "200px",
              borderRadius: "6px",
              marginBottom: "1rem",
            }}
          />
        )}

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
        <Form.Item label="Latest" valuePropName="checked" name={["latest"]}>
          <Checkbox>Latest</Checkbox>
        </Form.Item>
      </Form>
    </Create>
  );
};

export default MovieCreate;
