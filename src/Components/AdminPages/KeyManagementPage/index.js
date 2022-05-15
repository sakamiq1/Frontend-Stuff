import "./index.css";
import {
  Layout,
  Breadcrumb,
  Table,
  Modal,
  Button,
  Form,
  Input,
  Space,
  Popconfirm,
  InputNumber,
  Radio,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  getListTool,
  editToolDetails,
  createTool,
} from "../../../Redux/Actions/productActions";
import listToolServices from "../../../Services/ToolServices/listToolServices";

const { Content } = Layout;

function KeyManagementPage() {
  const [formModal] = Form.useForm();
  const [editForm, setEditForm] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const listTools = useSelector((state) => state.allTools.tools);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (text, record) => (
        <Space size="middle">
          <button onClick={() => showModal(record.id)}>Edit</button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteTool(record.id)}
          >
            <button>Delete</button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteTool = (id) => {
    listToolServices.deleteTool(id).then((res) => {
      loadListTool();
    });
  };

  const loadListTool = () => {
    listToolServices.list().then((res) => {
      dispatch(getListTool(res.results));
    });
  };

  useEffect(() => {
    loadListTool();
  }, []);

  const showModal = (id) => {
    setEditForm(true);
    listToolServices.getToolById(id).then((res) => {
      formModal.setFieldsValue({
        id: res.data.id,
        name: res.data.name,
        code: res.data.code,
        description: res.data.description,
        price: res.data.price,
        status: res.data.status,
      });
    });
    setIsModalVisible(true);
  };

  const openCreateForm = () => {
    setEditForm(false);
    formModal.resetFields();
    setIsModalVisible(true);
  };

  const handleCreate = async (values) => {
    await listToolServices.addTool(values).then((res) => {
      dispatch(createTool(res.data));
    });
    loadListTool();
    handleCancel();
  };

  const handleEdit = async (values) => {
    await listToolServices.editTool(values.id, values).then((res) => {
      dispatch(editToolDetails(res.data));
    });
    loadListTool();
    handleCancel();
  };

  const handleCancel = () => {
    formModal.resetFields();
    setIsModalVisible(false);
  };

  return (
    <>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Keys Management</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: "#fff", paddingBottom: "100px" }}>
          <div id="button-div-container">
            <Button onClick={openCreateForm}>Add</Button>
          </div>
          <div id="table-container">
            <Table
              columns={columns}
              dataSource={listTools}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </Content>
      </Layout>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        footer={
          <Button type="primary" htmlType="submit" form="formModal">
            {editForm ? "Save" : "Create"}
          </Button>
        }
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          form={formModal}
          name="formModal"
          onFinish={editForm ? handleEdit : handleCreate}
        >
          <Form.Item name="id" label="Id" rules={[{ required: true }]}>
            {editForm ? <InputNumber disabled /> : <InputNumber />}
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="code" label="Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Radio.Group name="radiogroup">
              <Radio value="Active">Active</Radio>
              <Radio value="Disabled">Disabled</Radio>
              <Radio value="Deleted">Deleted</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default KeyManagementPage;
