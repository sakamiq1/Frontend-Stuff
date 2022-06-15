import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signUp } from "../../../features/user/userSlice";
import "./index.scss";

const SignUp = () => {
  const dispatch = useDispatch();

  const RegisterForm = () => (
    <div className="register-container">
      <h1>Sign Up</h1>
      <Form name="sign up" onFinish={handleSubmit} labelAlign="left">
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "",
              pattern: new RegExp(
                /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
              ),
            },
          ]}
        >
          <Input placeholder="Phone number" />
        </Form.Item>
        <Form.Item>
          <div className="submit-form-item">
            <Link to="/login" className="change-form">
              already have account
            </Link>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );

  const handleSubmit = (values) => {
    dispatch(signUp(values));
  };

  return (
    <div className="login-register-container">
      <RegisterForm />
    </div>
  );
};

export default SignUp;
