import { IResourceComponentsProps, useApiUrl } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, message, Upload } from "antd";
import { useEffect, useRef } from "react";
import axiosInstance from "utils/axios";
import { API_URL } from "pages/_app";
import { handleFileRemove } from "utils/handleFileRemove";

const CreateMember: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

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
          label="Phone"
          name={["phone"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Designation"
          name={["designation"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Profile Image">
          <Form.Item
            name="image"
            valuePropName="file"
            getValueFromEvent={customGetValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="profile"
              action={`${apiUrl}/member/upload`}
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

export default CreateMember;
