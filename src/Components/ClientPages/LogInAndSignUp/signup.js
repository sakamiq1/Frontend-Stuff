import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signUp } from "../../../features/user/userSlice";
import "./index.scss";

const SignUp = () => {
  const { t } = useTranslation();
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
          <Input placeholder={t('username-label')} />
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
          <Input.Password placeholder={t('password-label')} />
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
          <Input placeholder={t('phonenumber-label')} />
        </Form.Item>
        <Form.Item>
          <div className="submit-form-item">
            <Link to="/login" className="change-form">
              {t('login-account')}
            </Link>
            <Button type="primary" htmlType="submit">
              {t('register-submit')}
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
