import React from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import { Link } from "react-router-dom";
import { UserCredsType } from "../../pages/LoginPage/model";
import styles from "./styles.module.css";

export type LoginFormProps = {
  onSubmit: (data: UserCredsType) => void;
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredsType>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className={styles.form}>
      <h2 className={styles.label}>Login</h2>
      <label className={styles.inputBlock}>
        Email
        <input {...register("email")} className={styles.input} />
        {errors.email && (
          <span className={styles.error}>
            {errors.email.message?.toString()}
          </span>
        )}
      </label>

      <label className={styles.inputBlock}>
        Password
        <input
          type="password"
          {...register("password")}
          className={styles.input}
        />
        {errors.password && (
          <span className={styles.error}>
            {errors.password.message?.toString()}
          </span>
        )}
      </label>

      <button>Log In</button>
      <Link to="/register" style={{ width: "100%" }}>
        <button className={styles.redirectButton}>
          I do not have an account
        </button>
      </Link>
    </form>
  );
};

export default observer(LoginForm);
