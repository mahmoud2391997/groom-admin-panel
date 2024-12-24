import React, { useEffect, useState } from "react";
import { Table, Checkbox, Button, Modal, Input, Form } from "antd";
import { get, ref } from "firebase/database";
import { database } from "@/firebase.mjs";
import Link from "next/link";

const UserPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const fetchUsers = async () => {
    const dataRef = ref(database, "users");
    try {
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        setUsers(Object.values(snapshot.val()));
      } else {
        setError("No data available");
        return null;
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching data:", error);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Contact",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Pincode",
      dataIndex: "pincode",
      key: "pincode",
    },
    {
      title: "Requests",
      dataIndex: "requestsThisMonth",
      key: "requestsThisMonth",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Link href={`/Users/${record.uid}`}>
            <Button type="link">View</Button>
          </Link>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteUsers([record.uid])}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleAddOrEditUser = (values) => {
    if (editingUser) {
      // Update existing user logic
      console.log("Edit user:", { ...editingUser, ...values });
    } else {
      // Add new user logic
      handleAddUser(values);
    }
    setIsModalVisible(false);
    setEditingUser(null);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button
          type="primary"
          onClick={() => {
            setEditingUser(null);
            setIsModalVisible(true);
          }}
        >
          Add User
        </Button>
        <Button
          type="danger"
          onClick={() => handleDeleteUsers(selectedRowKeys)}
          disabled={selectedRowKeys.length === 0}
        >
          Delete Selected
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users.map((user) => ({
          ...user,
          key: user.uid,
        }))}
      />
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingUser || {}}
          onFinish={handleAddOrEditUser}
          layout="vertical"
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter the full name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contactNumber"
            label="Contact Number"
            rules={[
              { required: true, message: "Please enter the contact number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="state" label="State">
            <Input />
          </Form.Item>
          <Form.Item name="pincode" label="Pincode">
            <Input />
          </Form.Item>
          <Form.Item name="requestsThisMonth" label="Requests This Month">
            <Input type="number" />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingUser ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UserPage;
