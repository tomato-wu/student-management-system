import React, { useEffect, useState } from "react";
import { Col, Row, Space, Table, Tag, Input, Button, Modal } from "antd";
import { AudioOutlined } from "@ant-design/icons";

import StudentInformation from "./StudentInformation";
import ApiRequest from "../utils/index";

import type { ColumnsType } from "antd/es/table";
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

interface DataType {
  uid: string;
  userName: string;
  className: string;
  phoneNum: string;
  email: string;
  address: string;
}

// const data: DataType[] = [
//   {
//     uid: "1",
//     userName: "John Brown",
//     className: "32",
//     phoneNum: "123456789",
//     email: "dadada",
//     address: "New York No. 1 Lake Park",
//   },
// ];

const UserList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: "学号",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "姓名",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "班级",
      dataIndex: "className",
      key: "className",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "电话",
      dataIndex: "phoneNum",
      key: "phoneNum",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "家庭住址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" ghost>
            详情
          </Button>
          <Button
            type="primary"
            ghost
            danger
            onClick={() => deleteStudent(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const fn = async () => {
    const res = await ApiRequest.get("/findAllUser");
    setData(res.data);
  };
  useEffect(() => {
    fn();
  }, []);

  const onSearch = async (value: string) => {
    const res = await ApiRequest.get("/findByUid?uid=" + value);
    setData(res.data);
  };
  const deleteStudent = async (record: DataType) => {
    const res = await ApiRequest.post("/delete?uid=" + record.uid);
    fn();
    console.log(res);
  };

  return (
    <>
      <Row>
        <Col span={20} offset={1}>
          <Search
            placeholder="请输入学号/名字 进行搜索"
            onSearch={onSearch}
            style={{ width: 400, marginBottom: 20 }}
          />
          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={() => setOpen(true)}
          >
            新增学生用户
          </Button>

          <Modal
            title="学生用户信息"
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          >
            <div>
              <StudentInformation />
            </div>
          </Modal>

          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
};

export default UserList;
