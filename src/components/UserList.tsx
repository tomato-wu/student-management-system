import React, { useState } from "react";
import { Col, Row, Space, Table, Tag, Input, Button, Modal } from "antd";
import { AudioOutlined } from "@ant-design/icons";

import StudentInformation from "./StudentInformation";

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
  key: string;
  name: string;
  studentId: number;
  address: string;
  tags: string[];
}

const onSearch = (value: string) => console.log(value);

const columns: ColumnsType<DataType> = [
  {
    title: "学号",
    dataIndex: "studentId",
    key: "studentId",
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "班级",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "电话",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "邮箱",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "家庭住址",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" ghost>
          详情
        </Button>
        <Button type="primary" ghost danger>
          删除
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    studentId: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    studentId: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    studentId: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const UserList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

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
