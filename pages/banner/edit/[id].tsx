import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox } from "antd";

export const EditBanner: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
          label="Road Block"
          valuePropName="checked"
          name={["roadBlock"]}
        >
          <Checkbox>Road block</Checkbox>
        </Form.Item>
      </Form>
    </Edit>
  );
};

export default EditBanner;
