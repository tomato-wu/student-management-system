import React, { useState, useEffect } from "react";
import { Layout, Menu, Space, message, FloatButton, Modal } from "antd";
import { useNavigate } from "react-router-dom";

import {
  FolderOutlined,
  CodeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  ApiOutlined,
  FolderOpenOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
// 自定义组件
import UserList from "../components/UserList";
import ManagerList from "../components/ManagerList";
import logo from "../assets/logo.png";
const { Header, Content, Footer } = Layout;

const items = [
  {
    label: "学生用户列表",
    key: "userList",
    icon: <CodeOutlined />,
  },
  {
    label: "系统管理员管理",
    key: "managerList",
    icon: <CodeOutlined />,
  },
];

function MenuItemPage({ currentPage }: { currentPage: string }) {
  switch (currentPage) {
    case "userList":
      return <UserList />;
    case "managerList":
      return <ManagerList />;
    default:
      return null;
  }
}

const HomePage: React.FC = () => {
  const [current, setCurrent] = useState<string>("userList");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onClick = (e: { key: React.SetStateAction<string> }) => {
    setCurrent(e.key);
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem('token')) {
  //     localStorage.removeItem('token')
  //     navigate('/')
  //   }
  // }, [navigate])

  const logOut = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const BackToIntroduction = () => {
    navigate("/");
  };

  return (
    <Layout className="layout">
      {/* Header 头部导航栏 */}
      <Header
        style={{
          background: "white",
        }}
      >
        <Space size="large">
          {/* 首页图标 */}
          <img
            src={logo}
            alt="logo无法显示"
            width={150}
            onClick={BackToIntroduction}
            style={{
              cursor: "pointer",
              display: "inline-block",
              verticalAlign: "middle",
              margin: "0 auto",
            }}
          />
          {/* 导航栏，一些路由跳转相关的 */}
          <Menu
            mode="horizontal"
            onClick={onClick}
            selectedKeys={[current]}
            style={{ minWidth: "800px", flex: "auto" }}
            items={items}
          />
        </Space>
        {/* 个人信息修改导航栏///////////////////////////////////////////////////////////////////////////////// */}
        <div style={{ float: "right" }}>
          <Space size="large">
            {/* 个人设置 */}
            <Menu mode="horizontal">
              <Menu.SubMenu
                key="SubMenu"
                title="个人设置"
                icon={<SettingOutlined />}
              >
                <Menu.Item key="personal" icon={<UserOutlined />}>
                  个人中心
                </Menu.Item>
                <Menu.Item
                  key="backToIntrodutionPage"
                  icon={<AppstoreOutlined />}
                >
                  返回首页
                </Menu.Item>
                <Menu.Item key="logOut" icon={<LogoutOutlined />}>
                  退出登录
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Space>
        </div>
      </Header>

      {/* 主体内容区域 */}
      <Content
        style={{
          padding: "20px 150px",
          backgroundColor: "rgb(237,241,249)",
          minHeight: "calc(100vh - 130px)",
        }}
      >
        <MenuItemPage currentPage={current} />
      </Content>

      {/* Footer注脚 */}
      <Footer
        style={{
          textAlign: "center",
          background: "rgb(237,241,249)",
        }}
      >
        腾讯云智伴学启航营训练项目 ©2022 Created by Nolankywu
      </Footer>
    </Layout>
  );
};
export default HomePage;
