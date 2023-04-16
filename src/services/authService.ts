import { makeAutoObservable } from "mobx";
import historyService from "./historyService";

class AuthService {
  constructor() {
    makeAutoObservable(this);
  }

  isAuth = (): boolean => {
    return Boolean(localStorage.getItem("isAuth"));
  };

  setAuth = () => {
    localStorage.setItem("isAuth", "true");
  };

  logout = () => {
    localStorage.removeItem("isAuth");
    historyService.go("/login");
  };
}

export default new AuthService();
