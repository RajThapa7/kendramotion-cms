import { useApiUrl } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Upload, Form, Input, Checkbox, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { handleFileRemove } from "utils/handleFileRemove";

const BannerCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  let accessToken = useRef<string>("");

  const apiUrl = useApiUrl();

  const getHeaders = () => {
    if (accessToken) {
      return { Authorization: "Bearer " + accessToken.current };
    }
  };

  useEffect(() => {
    const unParsedToken = localStorage.getItem("accessToken");
    if (unParsedToken) {
      const token = JSON.parse(unParsedToken);

      if (token) {
        accessToken.current = token;
      }
    }
  }, []);

  const customGetValueFromEvent = (value: any) => {
    const file = value.file;

    const upload = {
      uid: file.uid,
      url: file.response?.url,
      size: file.size,
      status: file.status,
      type: file.type,
      name: file.name,
    };
    return upload;
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Roadblock" valuePropName="checked" name={["latest"]}>
          <Checkbox />
        </Form.Item>
        <Form.Item label="Image">
          <Form.Item
            name="image"
            valuePropName="file"
            getValueFromEvent={customGetValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="banner"
              action={`${apiUrl}/banner/upload`}
              headers={getHeaders()}
              listType="picture"
              multiple={false}
              onRemove={handleFileRemove}
              onChange={(info) => {
                const { status } = info.file;
                if (status === "done") {
                  message.success("File uploaded successfully");
                } else if (status === "error") {
                  message.error("File upload failed");
                }
              }}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};

interface IPost {
  id: number;
  title: string;
  image: [
    {
      uid: string;
      name: string;
      url: string;
      status: "error" | "success" | "done" | "uploading" | "removed";
    }
  ];
}

export default BannerCreate;
