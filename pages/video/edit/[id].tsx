import { IResourceComponentsProps, useMany } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox, Select, Space } from "antd";

export const EditVideo: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

  const { data } = useMany({
    resource: "artist-profile",
    ids: [],
  });

  const artists = data?.data;

  const newArtists = formProps?.initialValues?.artists?.map(
    (artist: any) => artist._id
  );

  const newFormProps = {
    ...formProps,
    initialValues: { ...formProps.initialValues, artists: newArtists },
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...newFormProps} layout="vertical">
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
        <Form.Item
          label="Latest"
          valuePropName="checked"
          name={["latest"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>Latest</Checkbox>
        </Form.Item>
        <Form.Item label="Artists" name={["artists"]}>
          <Select
            mode="multiple"
            style={{ width: "100%", marginBottom: "1.5rem" }}
            placeholder="Select artists that you want to add"
          >
            {artists?.map((item) => (
              <Select.Option value={item._id} label={item.name}>
                <Space>{item.name}</Space>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Edit>
  );
};

export default EditVideo;
