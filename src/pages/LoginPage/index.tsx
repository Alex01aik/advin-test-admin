import React from "react";
import { observer } from "mobx-react-lite";
import LoginForm from "../../components/LoginForm";
import styles from "../styles.module.css";
import model from "./model";

export type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <div className={styles.page}>
      <LoginForm onSubmit={model.login} />
    </div>
  );
};

export default observer(LoginPage);
