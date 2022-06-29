import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToolAsync,
  deleteToolAsync,
  editToolAsync,
  fetchToolsAsync,
  getTools,
  removeCurentTools,
} from "../../../features/tools/toolSlice";
import TextArea from "antd/lib/input/TextArea";
import { removeSelectedTools } from "../../../features/details/detailSlice";
import {
  Modal,
  Space,
  Table,
  Tag,
  Form,
  Input,
  InputNumber,
  Radio,
  Popconfirm,
  Spin,
  Breadcrumb,
  Button,
} from "antd";
import { useTranslation } from "react-i18next";

const ToolTable = () => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [editTool, setEditTool] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalForm] = Form.useForm();
  const dispatch = useDispatch();
  const listTool = useSelector(getTools);

  const columns = [
    { key: "id", dataIndex: "id", title: "Id", width: "10%" },
    { key: "name", dataIndex: "name", title: t('name-col') },
    { key: "code", dataIndex: "code", title: t('code-col'), width: "15%" },
    { key: "price", dataIndex: "price", title: t('price-col'), width: "15%" },
    {
      key: "status",
      dataIndex: "status",
      title: t('status-col'),
      width: "15%",
      render: (_, record) => {
        return record.status === 2 ? (
          <Tag key="active" color="green">
            {t('actived')}
          </Tag>
        ) : record.status === 1 ? (
          <Tag key="disable" color="red">
            {t('disabled')}
          </Tag>
        ) : (
          <Tag key="delete" color="gray">
            {t('deleted')}
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
          <a onClick={() => openEditForm(record.id)}>Edit</a>

          <Popconfirm
            title="Are you sure to delete this tool?"
            onConfirm={() => dispatch(deleteToolAsync(record.id))}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const openCreateForm = () => {
    setEditTool(false);
    modalForm.resetFields();
    setVisible(true);
  };

  const openEditForm = (id) => {
    setEditTool(true);
    const details = listTool.results.filter((tool) => tool.id === id);
    modalForm.setFieldsValue({
      id: details[0].id,
      name: details[0].name,
      code: details[0].code,
      description: details[0].description,
      price: details[0].price,
      status: details[0].status,
    });
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    editTool === true && dispatch(removeSelectedTools());
  };

  const handleSubmit = (values) => {
    editTool ? dispatch(editToolAsync(values)) : dispatch(addToolAsync(values));
    hideModal();
  };

  useEffect(() => {
    dispatch(fetchToolsAsync());
    return () => {
      dispatch(removeCurentTools());
    };
  }, [dispatch]);

  useEffect(() => {
    listTool && setLoading(false);
  }, [listTool]);

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
        <Button onClick={openCreateForm}>{t('addtool')}</Button>
      </div>
      <Table
        columns={columns}
        dataSource={listTool && listTool.results}
        style={{ margin: "20px 40px auto" }}
        loading={{
          indicator: (
            <div>
              <Spin />
            </div>
          ),
          spinning: loading,
        }}
      />
      <Modal
        title="Add tool"
        visible={visible}
        onOk={modalForm.submit}
        onCancel={hideModal}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form form={modalForm} onFinish={handleSubmit}>
          {editTool && (
            <Form.Item
              label="Id"
              name="id"
              rules={[{ required: true, message: "somethings missing!" }]}
            >
              <Input disabled />
            </Form.Item>
          )}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "somethings missing!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: "somethings missing!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "somethings missing!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={2}>Active</Radio>
              <Radio value={1}>Disable</Radio>
              <Radio value={0}>Delete</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" key="submit" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ToolTable;
