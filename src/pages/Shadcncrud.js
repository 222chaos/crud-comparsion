import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ShardsCrud = () => {
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
  const [editingUser, setEditingUser] = useState({
    id: null,
    name: "",
    age: "",
  });
  const [searchText, setSearchText] = useState("");

  const handleEdit = (user) => {
    setEditingUser({ ...user });
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
  };

  const handleInputChange = (e, key) => {
    setEditingUser({ ...editingUser, [key]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={() =>
            setEditingUser({ id: users.length + 1, name: "", age: "" })
          }
        >
          添加用户
        </Button>
        <>&emsp;</>
        <Input
          placeholder="搜索用户"
          value={searchText}
          onChange={handleSearchChange}
          style={{ width: 200 }}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">姓名</TableHead>
            <TableHead>年龄</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleEdit(user)}>编辑</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>编辑用户</DialogTitle>
                    </DialogHeader>
                    <div>
                      <label>姓名:</label>
                      <Input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) => handleInputChange(e, "name")}
                      />
                      <label>年龄:</label>
                      <Input
                        type="number"
                        value={editingUser.age}
                        onChange={(e) => handleInputChange(e, "age")}
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button onClick={handleOk}>确认</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button>取消</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button onClick={() => handleDelete(user.id)}>删除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ShardsCrud;
