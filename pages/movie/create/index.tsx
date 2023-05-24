import React, { useMemo, useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Image, Input, Skeleton } from "antd";

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

  const { formProps, saveButtonProps, queryResult } = useForm();

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
        <Form.Item label="URL" name={["url"]} rules={[{ required: true }]}>
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
          label="Artist"
          name={["artist"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};

export default MovieCreate;
