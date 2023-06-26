import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../utils/index";

const LoginForm: React.FC = () => {
  const [account, setAccount] = useState<string>(""); // 用户名
  const [password, setPassword] = useState<string>(""); // 密码
  const navigate = useNavigate();
  const LoginFunc = async () => {
    // 登录函数
    const employee = {
      account: account,
      password: password,
    };
    const res = await ApiRequest.post("/employee/login", employee);
    if (res.status === 200) {
      message.success("登录成功");
      // localStorage.setItem("token", res.data.token);
      navigate("/homepage");
    } else {
      message.error("登录失败");
    }
    console.log("登录", res);
  };

  return (
    <>
      <Form
        initialValues={{
          remember: true,
        }}
      >
        {/* 用户名 */}
        <Form.Item
          name="account"
          rules={[
            {
              required: true,
              message: "请输入你的用户名",
            },
          ]}
        >
          <Input
            placeholder="用户名"
            size="large"
            allowClear
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            style={{ width: "300px" }}
          />
        </Form.Item>
        {/* 密码 */}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input.Password
            placeholder="密码"
            size="large"
            allowClear
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "300px" }}
          />
        </Form.Item>
        {/* 登录按钮 */}
        <Form.Item>
          <Button
            type="primary"
            size="large"
            style={{ width: "300px" }}
            onClick={LoginFunc}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
