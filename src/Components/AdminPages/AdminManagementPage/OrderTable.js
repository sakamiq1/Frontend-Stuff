import React from "react";
import { Breadcrumb, Button, Table, Tag, Popconfirm, Space } from "antd";

const OrderTable = () => {

  const columns = [
    { key: "id", dataIndex: "id", title: "Id", width: "10%" },
    { key: "name", dataIndex: "name", title: "Name" },
    { key: "code", dataIndex: "code", title: "Code", width: "15%" },
    { key: "price", dataIndex: "price", title: "Price", width: "15%" },
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
      width: "15%",
      render: (_, record) => {
        return record.status === 2 ? (
          <Tag key="active" color="green">
            Active
          </Tag>
        ) : record.status === 1 ? (
          <Tag key="disable" color="red">
            Disable
          </Tag>
        ) : (
          <Tag key="delete" color="gray">
            Delete
          </Tag>
        );
      },
    },
    {
      key: "actions",
      title: "Actions",
      width: "20%",
      render: (record) => (
        <Space size="middle">
          <a>Edit</a>
          <Popconfirm
            title="Are you sure to delete this tool?"
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>admin</Breadcrumb.Item>
        <Breadcrumb.Item>tool management</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          margin: "20px 40px 20px auto",
        }}
      >
        <Button>Create Tool</Button>
      </div>
      <Table dataSource={[]} columns={columns} />
    </>
  );
};

export default OrderTable;
