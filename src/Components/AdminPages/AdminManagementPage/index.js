import {
  Layout,
  Menu,
  Breadcrumb,
  Table,
  Modal,
  Button,
  Form,
  Input,
  Space,
  Popconfirm,
  InputNumber,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  getListTool,
  editToolDetails,
} from "../../../Redux/Actions/productActions";
import listToolServices from "../../../Services/listToolServices";

const { Sider, Content } = Layout;

const AdminManagePage = () => {
  const [formModal] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const listTools = useSelector((state) => state.allTools.tools);
  const dispatch = useDispatch();

  const menuItems = [
    {
      key: "list-tools",
      label: "List Tools",
    },
    {
      key: "list-keys",
      label: "List Keys",
    },
    {
      key: "list-users",
      label: "List Users",
    },
  ];

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <button onClick={() => editDetail(record.id)}>Edit</button>
          <Popconfirm title="Sure to delete?">
            <button>Delete</button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const loadListTool = async () => {
    await listToolServices.list().then((res) => {
      dispatch(getListTool(res.data));
    });
  };

  useEffect(() => {
    loadListTool();
  }, []);

  const editDetail = (id) => {
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

  const onFinish = (values) => {
    listToolServices.editTool(values.id, values).then((res) => {
      dispatch(editToolDetails(res.data));
      loadListTool();
    });
    handleCancel();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Layout>
        <Sider width={200}>
          <Menu items={menuItems} style={{ height: "100vh" }} />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>List Tool</Breadcrumb.Item>
          </Breadcrumb> 
          <Content style={{ background: "#fff" }}>
              <Button>Add</Button>
            <Table columns={columns} dataSource={listTools} />
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        footer={
          <Button type="primary" htmlType="submit" form="formModal">
            Save
          </Button>
        }
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          form={formModal}
          name="formModal"
          onFinish={onFinish}
        >
          <Form.Item name="id" label="Id" rules={[{ required: true }]}>
            <Input disabled />
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
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminManagePage;
