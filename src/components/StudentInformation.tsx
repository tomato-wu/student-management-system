import { Button, Form, Input, message } from "antd";
import React from "react";
import ApiRequest from "../utils/index";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const StudentInformation: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log("Success:", values);

    const res = await ApiRequest.post("/user/create", values);
    console.log(res);

    if (res.status === 200) {
      message.success("添加成功");
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } else {
      message.error("添加失败");
    }
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
      <Form.Item name="key" label="学号" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="userName" label="姓名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="className" label="班级" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phoneNum" label="电话" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="HomeAddress"
        label="家庭住址"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "30px" }}
        >
          添加
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StudentInformation;
