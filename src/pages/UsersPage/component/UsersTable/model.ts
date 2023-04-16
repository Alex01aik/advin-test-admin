import { makeAutoObservable } from "mobx";
import { query, generateExcelFile } from "../../../../utils";

export type UserType = {
  _id: string;
  email: string;
  role: string;
  company?: {
    name: string;
    doc: string;
  };
};

class UsersTableModel {
  public users: UserType[] = [];
  public page = 1;

  constructor() {
    makeAutoObservable(this);
  }

  init = async () => {
    this.users = await query("user/findMany");
  };

  nextPage = async () => {
    this.page++;
    console.log("this.page", this.page);
    this.users = await query(`user/findMany?page=${this.page}`);
  };

  prevPage = async () => {
    if (this.page > 1) {
      this.page--;
    }
    console.log("this.page", this.page);
    this.users = await query(`user/findMany?page=${this.page}`);
  };

  exportToExcel = () => {
    generateExcelFile(this.users, "users")
      .then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "advin-users.xlsx";
        a.click();
      })
      .catch((error) => console.error(error));
  };

  saveFile = async (key: string) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}s3/download?key=${key}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = key;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => console.error(error));
  };
}

export default new UsersTableModel();
