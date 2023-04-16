import { makeAutoObservable } from "mobx";
import { query } from "../../utils";
import authService from "../../services/authService";
import historyService from "../../services/historyService";

export type UserCredsType = {
  email: string;
  password: string;
};

class LoginPageModel {
  constructor() {
    makeAutoObservable(this);
  }

  login = async (data: UserCredsType) => {
    const res = await query("adminlogin", data, "POST");
    if (res.isAuth) {
      authService.setAuth();
      historyService.go("/dashboard");
    }
  };
}

export default new LoginPageModel();
