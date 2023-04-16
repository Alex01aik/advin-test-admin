import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.css";
import model from "./model";

export type UsersTableProps = {};

const UsersTable: React.FC<UsersTableProps> = () => {
  useEffect(() => {
    const init = async () => await model.init();
    init();
  }, []);

  return (
    <div className={styles.root}>
      <button className={styles.exportButton} onClick={model.exportToExcel}>
        Export table
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.cell}>ID</th>
            <th className={styles.cell}>Email</th>
            <th className={styles.cell}>Role</th>
            <th className={styles.cell}>Company</th>
            <th className={styles.cell}>Doc</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {model.users?.map((item) => (
            <tr key={item._id}>
              <td className={styles.cell}>{item._id}</td>
              <td className={styles.cell}>{item.email}</td>
              <td className={styles.cell}>{item.role}</td>
              <td className={styles.cell}>{item.company?.name}</td>
              <td className={styles.cell}>{item.company?.doc}</td>
              <td className={styles.cell}>
                {item.company?.doc && (
                  <button onClick={() => model.saveFile(item.company!.doc)}>
                    Export doc
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} className={styles.cell}>
              <div className={styles.pagination}>
                <button disabled={model.page === 1} onClick={model.prevPage}>
                  &lt;
                </button>
                <button onClick={model.nextPage}>&gt;</button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default observer(UsersTable);
