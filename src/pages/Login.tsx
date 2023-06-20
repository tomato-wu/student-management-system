import { Button, Space, Col, Row, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import backGround from "../assets/background.png";
import backGroundDown from "../assets/backGroundDown.png";
import LoginPage from "../components/LoginPage";

const backGroundCss = {
  backgroundImage: `url(${backGround})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "100%",
  width: "100%",
};

// 标题变大
const TitleText = {
  fontSize: "2.2rem",
  fontWeight: "bolder",
};

const buttonStyle = {
  marginTop: "10px",
};

const backGroundDownCss = {
  backgroundImage: `url(${backGroundDown})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "50vh",
  width: "90vw",
};

const Login: React.FC = () => {
    
  let token = localStorage.getItem("token");

  const navigate = useNavigate();
  const LinkToHome = () => {
    navigate("/home");
  };

  const LinkToIntroduction = () => {
    window.open(
      "https://q5javk5hpq.feishu.cn/docx/UUXVdV4FpobEVKx2DyZck9r7nCd"
    );
  };

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {/* 上方 */}
      <div style={backGroundCss}>
        {!token ? (
          <Button
            type="primary"
            shape="round"
            size="middle"
            style={{ position: "absolute", top: "12px", right: "22px" }}
            onClick={() => setOpen(true)}
          >
            登录
          </Button>
        ) : null}

        <Modal
          title="管理员登录"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          footer={null}
          width={500}
        >
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <LoginPage></LoginPage>
          </div>
        </Modal>

        <Row>
          <Col span={18} offset={5}>
            <div style={{
                 padding: "40px",
                 textAlign: "left",
                 marginTop: "40px",
            }}>
              <h1 style={TitleText}>小型学生管理系统 1.0 </h1>
              <h1 style={TitleText}>伴学启航营训练小demo</h1>

              <div
                style={{
                  textAlign: "left",
                  marginTop: "30px",
                  fontSize: "12px",
                  fontWeight: "lighter",
                }}
              >
                <p>
                该项目是一个简单的小 demo,
                一个小型的学生信息管理系统，包含功能，登录，新增用户，列表查询，详情查询。
                </p>
                <p>
                  用于伴学启航营入职前对部门技术栈的了解学习用
                </p>
              </div>

              {!token ? (
                <Button
                  type="primary"
                  size="middle"
                  style={{ marginRight: "10px" }}
                  onClick={() => setOpen(true)}
                >
                  开始体验
                </Button>
              ) : (
                <Space style={buttonStyle}>
                  <Button
                    type="primary"
                    ghost
                    size="middle"
                    style={{ marginRight: "10px" }}
                    onClick={LinkToHome}
                  >
                    开始使用
                  </Button>
                  <Button
                    size="middle"
                    type="primary"
                    danger
                    ghost
                    onClick={LinkToIntroduction}
                  >
                    了解详情
                  </Button>
                </Space>
              )}
            </div>
          </Col>
        </Row>
      </div>

      {/* 下方 */}
      <div style={backGroundDownCss}>
        <Row>
          <Col span={8} offset={5}>
            <div style={{
                  padding: "40px",
                  textAlign: "left",
                  marginTop: "40px",
            }}>
              <h1 style={TitleText}>该系统开发的目标为 </h1>
              <p style={{ fontSize: "12px", fontWeight: "lighter" }}>
              1. 可以正常显示页面，登录，登出，并且完成用户的增删改查

              </p>
              <p style={{ fontSize: "12px", fontWeight: "lighter" }}>
              2. midway层的接口，可以通过jest进行接口自动化测试 
              </p>
            </div>
          </Col>
          <Col span={8}>
            <Space
              direction="vertical"
              size="small"
              style={{
                display: "flex",
                marginTop: "60px",
              }}
            >
              <hr style={{ color: "gray" }} />
              <p>编程语言typescript </p> <hr />
              <p>
              前端框架react， antd，状态管理，rematch
              </p>
              <hr style={{ color: "gray" }} />
            
              <p>数据库mysql，可以不使用数据库，直接持久化到内存，支持跨域调用</p>{" "}
              <hr style={{ color: "gray" }} />
              <p>后端使用midwayjs</p>{" "}
              <hr style={{ color: "gray" }} />
                <p>自动化测试使用jest</p>{" "}
                <hr style={{ color: "gray" }} />
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
