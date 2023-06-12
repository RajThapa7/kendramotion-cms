import { useEffect, useRef, useState } from "react";
import { IResourceComponentsProps, useApiUrl } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload } from "antd";
import { toast } from "react-toastify";

export const ArtistProfileEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

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

  const [uploaded, setUploaded] = useState<boolean>(false);

  const renderFileList = () => {
    return <div>File uploaded successfully</div>;
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
        <Form.Item label="Profile Image">
          <Form.Item
            name="image"
            valuePropName="file"
            getValueFromEvent={customGetValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="profile"
              action={`${apiUrl}/artist-profile/upload`}
              headers={getHeaders()}
              listType="picture"
              showUploadList={false}
              multiple={false}
              onChange={(info) => {
                const { status } = info.file;
                if (status === "done") {
                  toast.success("File uploaded successfully");
                  setUploaded(true);
                } else if (status === "error") {
                  toast.error("File upload failed");
                  setUploaded(false);
                }
              }}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
            {uploaded && renderFileList()}
          </Form.Item>
        </Form.Item>
      </Form>
    </Edit>
  );
};

export default ArtistProfileEdit;
