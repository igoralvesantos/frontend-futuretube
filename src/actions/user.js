import axios from "axios";
import { push } from "connected-react-router";
import { routes } from "../containers/Router";
import { osName, osVersion } from 'react-device-detect';

const baseURL = "https://2gl2zhosnh.execute-api.us-east-1.amazonaws.com/v1";

export const setMenuVisible = () => ({
  type: "SET_MENU_VISIBLE",
  payload: {},
});

export const userSignup = (form) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseURL}/signup`, form);

    const userToken = response.data.accessToken;

    const refresh = response.data.refreshToken;

    localStorage.setItem("token", userToken);

    localStorage.setItem("refresh", refresh);

    dispatch(push(routes.home));

    window.alert(
      "Cadastro realizado com sucesso! Seja bem vindo ao FutureTube"
    );
  } catch (err) {
    switch (err.message) {
      case "Request failed with status code 400":
        alert("Verifique os campos do formulário");
        break;
      case "Request failed with status code 409":
        alert("Usuário já cadastrado");
        break;
      default:
        alert("Verifique se os campos do formulário estão preenchidos");
        break;
    }
  }
};

export const autenticateLogin = (form) => async (dispatch) => {
  try {
    const body = {
      "email": form.email,
      "password": form.password,
      "device": `${osName} ${osVersion}`
    }
    const response = await axios.post(`${baseURL}/login`, body);

    const userToken = response.data.accessToken;

    const refresh = response.data.refreshToken;

    localStorage.setItem("token", userToken);

    localStorage.setItem("refresh", refresh);

    dispatch(push(routes.home));
  } catch (error) {
    console.log(error)
    alert("Email ou senha incorreta.");
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch(setMenuVisible())
  dispatch(push(routes.login));
};

export const changePassword = (form) => async () => {
  try {
    const token = localStorage.getItem("token");

    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    await axios.post(`${baseURL}/changepassword`, form, axiosConfig);

    alert("Senha alterada com sucesso");
  } catch (error) {
    alert("Senha antiga incorreta");
  }
};

export const renewAuthentication = (error, attempts = 0) => async () => {
  if(error === 'Request failed with status code 401') {
    const refresh = localStorage.getItem("refresh");

    const axiosConfig = {
      headers: {
        refresh,
      },
    };

    const response = await axios.get(`${baseURL}/auth/refresh`, axiosConfig);

    const userToken = response.data.accessToken;

    localStorage.setItem("token", userToken);

    window.location.reload()

    attempts++
  }
}