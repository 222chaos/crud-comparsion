import React, { useState } from "react";
import { Table, Modal, Button, Form, Input } from "antd";

const AntdCrud = () => {
  const initialUsers = [
    { id: 1, name: "张三", age: 28 },
    { id: 2, name: "李四", age: 24 },
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
