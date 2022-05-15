import { Form, Input, Button } from "antd";
import userServices from "../../../Services/UserServices/userServices";
import { useDispatch } from "react-redux";
import { logInRequest } from "../../../Redux/Actions/userActions";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    userServices.logIn(values).then((res) => {
      dispatch(logInRequest(res));
      if (res.isSuccess) {
        localStorage.setItem("Token", res.resultItem.value.token);
        localStorage.setItem("User", res.resultItem.value.username);
        localStorage.setItem("Role", res.resultItem.value.isAdmin ? "admin" : "guest");
      }
      navigate("/home");
    });
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 5,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
