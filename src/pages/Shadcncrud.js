import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";

// Define the validation schema using Zod
const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  age: z.number().min(18, { message: "Must be at least 18 years old." }),
});

const ShadcnCrud = () => {
  const initialUsers = [
    { id: 1, name: "张三", age: 28 },
    { id: 2, name: "李四", age: 24 },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchText, setSearchText] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      age: "",
    },
  });

  const handleAdd = () => {
    setEditingUser({ id: users.length + 1, name: "", age: "" });
    reset({ name: "", age: "" });
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    reset(user);
    setIsModalVisible(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleOk = handleSubmit((data) => {
    const updatedUsers =
      editingUser.id > users.length
        ? [...users, { ...editingUser, ...data }]
        : users.map((user) =>
            user.id === editingUser.id ? { ...user, ...data } : user
          );
    setUsers(updatedUsers);
    setIsModalVisible(false);
  });

  const handleCancel = () => {
    setIsModalVisible(false);
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
      <Dialog
        title={editingUser?.id > users.length ? "添加用户" : "编辑用户"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <FormField
            name="name"
            render={() => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </FormControl>
                <FormDescription>Description for name</FormDescription>
                <FormMessage>{errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="age"
            render={() => (
              <FormItem>
                <FormLabel>年龄</FormLabel>
                <FormControl>
                  <Controller
                    name="age"
                    control={control}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </FormControl>
                <FormDescription>Description for age</FormDescription>
                <FormMessage>{errors.age?.message}</FormMessage>
              </FormItem>
            )}
          />
        </Form>
      </Dialog>
    </>
  );
};

export default ShadcnCrud;
