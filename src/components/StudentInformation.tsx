import { Button, Form, Input } from "antd";
import React from "react";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const StudentInformation: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600, marginTop: "30px" }}
    >
      <Form.Item name="note" label="学号" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="note" label="姓名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>{" "}
      <Form.Item name="note" label="班级" rules={[{ required: true }]}>
        <Input />
      </Form.Item>{" "}
      <Form.Item name="note" label="电话" rules={[{ required: true }]}>
        <Input />
      </Form.Item>{" "}
      <Form.Item name="note" label="邮箱" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="note" label="家庭住址" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "30px" }}
        >
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StudentInformation;
