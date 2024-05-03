import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Input } from "antd";

const AntdCrud = () => {
  useEffect(() => {
    console.time("antd开始时间"); // 开始计时

    console.timeEnd("antd结束时间"); // 结束计时并输出结果
  }, []);

  const initialUsers = [
    { id: 1, name: "张三", age: 28 },
    { id: 2, name: "李四", age: 24 },
    { id: 3, name: "王五", age: 32 },
    { id: 4, name: "赵六", age: 29 },
    { id: 5, name: "钱七", age: 26 },
    { id: 6, name: "孙八", age: 35 },
    { id: 7, name: "周九", age: 31 },
    { id: 8, name: "吴十", age: 23 },
    { id: 9, name: "郑十一", age: 27 },
    { id: 10, name: "王十二", age: 30 },
    { id: 11, name: "朱十三", age: 33 },
    { id: 12, name: "韩十四", age: 25 },
    { id: 13, name: "李十五", age: 29 },
    { id: 14, name: "赵十六", age: 31 },
    { id: 15, name: "钱十七", age: 28 },
    { id: 16, name: "孙十八", age: 34 },
    { id: 17, name: "周十九", age: 26 },
    { id: 18, name: "吴二十", age: 32 },
    { id: 19, name: "郑二十一", age: 27 },
    { id: 20, name: "王二十二", age: 30 },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleAdd = () => {
    setEditingUser({ id: users.length + 1, name: "", age: "" });
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleOk = () => {
    const updatedUsers =
      editingUser.id > users.length
        ? [...users, editingUser]
        : users.map((user) =>
            user.id === editingUser.id ? editingUser : user
          );
    setUsers(updatedUsers);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e, key) => {
    setEditingUser({ ...editingUser, [key]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "年龄", dataIndex: "age", key: "age" },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} type="link">
            编辑
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="link">
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{ marginBottom: 16, marginLeft: 8 }}
      >
        添加用户
      </Button>
      <>&emsp;</>
      <Input
        placeholder="搜索用户"
        value={searchText}
        onChange={handleSearchChange}
        style={{ marginBottom: 16, width: 200 }}
      />
      <Table dataSource={filteredUsers} columns={columns} rowKey="id" />
      <Modal
        title={editingUser?.id > users.length ? "添加用户" : "编辑用户"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="姓名">
            <Input
              value={editingUser?.name}
              onChange={(e) => handleChange(e, "name")}
            />
          </Form.Item>
          <Form.Item label="年龄">
            <Input
              value={editingUser?.age}
              onChange={(e) => handleChange(e, "age")}
              type="number"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AntdCrud;
