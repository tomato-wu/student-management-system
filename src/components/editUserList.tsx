import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Space,
  Table,
  Typography,
  message,
} from "antd";

import ApiRequest from "../utils/index";
import StudentInformation from "./StudentInformation";
const { Search } = Input;
interface Item {
  key: string;
  userName: string;
  className: string;
  phoneNum: string;
  email: string;
  HomeAddress: string;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditUserList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<any>([]);
  const [editingKey, setEditingKey] = useState("");

  //获取所有学生信息
  const fn = async () => {
    const res = await ApiRequest.get("/user/findAllUser");
    console.log(res.data);

    setData(res.data);
  };
  useEffect(() => {
    fn();
  }, []);

  // 删除学生信息
  const deleteStudent = async (record: Item) => {
    const res = await ApiRequest.post("/user/delete?key=" + record.key);
    if (res.status === 200) {
      fn();
      message.success("删除成功");
    } else {
      message.error("删除失败");
    }
  };
  // 查找学生信息
  const onSearch = async (value: string) => {
    const res = await ApiRequest.get("/user/findBykey?key=" + value);
    setData(res.data);
  };

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      userName: "",
      className: "",
      phoneNum: "",
      email: "",
      HomeAddress: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    console.log(key);

    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "学号",
      dataIndex: "key",
      key: "key",
      width: "10%",
      editable: true,
    },
    {
      title: "姓名",
      dataIndex: "userName",
      width: "8%",
      editable: true,
    },
    {
      title: "班级",
      dataIndex: "className",
      width: "10%",
      editable: true,
    },
    {
      title: "电话",
      dataIndex: "phoneNum",
      width: "15%",
      editable: true,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      width: "15%",
      editable: true,
    },
    {
      title: "家庭住址",
      dataIndex: "HomeAddress",
      width: "20%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              保存
            </Typography.Link>
            <Typography.Link onClick={cancel}>取消</Typography.Link>
          </span>
        ) : (
          <Space size="middle">
            <Button
              type="primary"
              ghost
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              编辑
            </Button>
            <Button
              type="primary"
              ghost
              danger
              disabled={editingKey !== ""}
              onClick={() => deleteStudent(record)}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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
            footer={[
              <Button key="back" onClick={() => setOpen(false)}>
                关闭
              </Button>,
            ]}
          >
            <div>
              <StudentInformation />
            </div>
          </Modal>

          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EditUserList;
