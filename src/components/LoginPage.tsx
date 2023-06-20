
import React, { useState } from "react";
import { Form, Input, Button, Space } from "antd";
import LoginForm from "./LoginForm";

const { Search } = Input;

const LoginPage = () => {

  let [loginStatus, setLoginStatus] = useState<boolean>(true);

  const handleLoginStatus = () => {
    setLoginStatus(!loginStatus);
  };
  return (
    <>
      <LoginForm></LoginForm>
      {loginStatus ? (
        <div
          style={{
            width: "300px",
            textAlign: "center",
            marginTop: "30px",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <p>
            没有账号？
            <span
              style={{ color: "rgb(64,150,255)", cursor: "pointer" }}
              onClick={handleLoginStatus}
            >
              立即注册
            </span>
          </p>
        </div>
      ) : (
        <div
          style={{
            width: "300px",
            textAlign: "center",
            marginTop: "30px",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <p>
            已有账号？
            <span
              style={{ color: "rgb(64,150,255)", cursor: "pointer" }}
              onClick={handleLoginStatus}
            >
              登录
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default LoginPage;
