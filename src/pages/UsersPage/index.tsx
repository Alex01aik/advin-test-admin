import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.css";
import UsersTable from "./component/UsersTable";

export type UsersPageProps = {};

const UsersPage: React.FC<UsersPageProps> = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.label}>Users</h2>
      <UsersTable />
    </div>
  );
};

export default observer(UsersPage);
