import axios from "axios";
import { push } from "connected-react-router";
import { routes } from "../containers/Router";
import { renewAuthentication } from "./user";

const baseURL = "https://2gl2zhosnh.execute-api.us-east-1.amazonaws.com/v1";

export const getAllVideos = (page) => async (dispatch) => {
  const token = localStorage.getItem("token");
  
  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.get(`${baseURL}/video/all/${page}`, axiosConfig);

    dispatch(setAllVideos(response.data.allVideos));
  } catch (error) {
    dispatch(renewAuthentication(error.message))
    alert("Ocorreu um erro ao carregar os videos.");
  }
};

export const setAllVideos = (allVideos) => ({
  type: "SET_ALL_VIDEOS",
  payload: {
    allVideos,
  },
});

export const getUserVideos = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.get(`${baseURL}/user/videos`, axiosConfig);

    dispatch(setUserVideos(response.data.userVideos));
  } catch (error) {
    dispatch(renewAuthentication(error.message))
    alert("Ocorreu um erro ao carregar os seus videos");
  }
};

export const setUserVideos = (userVideos) => ({
  type: "SET_USER_VIDEOS",
  payload: {
    userVideos,
  },
});

export const deleteUserVideo = (videoId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  const body = {
    videoId: videoId,
  };

  try {
    await axios.post(`${baseURL}/video/delete`, body, axiosConfig);

    dispatch(getUserVideos());
  } catch (error) {
    dispatch(renewAuthentication(error.message))
    alert("Ocorreu um erro ao deletar este video");
  }
};

export const uploadVideo = (form) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  try {
    await axios.post(`${baseURL}/video/upload`, form, axiosConfig);

    alert("Video enviado com sucesso");
  } catch (error) {
    dispatch(renewAuthentication(error.message))
    alert("Ocorreu um erro ao subir este video");
  }
};

export const getVideoDetails = (videoId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.get(`${baseURL}/video/details/${videoId}`, axiosConfig);

    dispatch(setVideoDetais(response.data.videoDetails));
    dispatch(push(routes.videoDetails));
  } catch (error) {
    dispatch(renewAuthentication(error.message))
    alert("Ocorreu um erro ao carregar os pegar os dados deste video");
  }
};

export const setVideoDetais = (videoDetails) => ({
  type: "SET_VIDEO_DETAILS",
  payload: {
    videoDetails,
  },
});

export const updateVideoInfo = (videoId, form) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  const body = {
    videoId,
    title: form.title,
    description: form.description,
  };

  try {
    await axios.post(`${baseURL}/video/update`, body, axiosConfig);

    dispatch(getUserVideos());

    alert("Titulo e descrição atualizados com sucesso.");
  } catch (error) {
    dispatch(renewAuthentication(error.message))
    alert("Ocorreu um erro ao atualizar os dados deste video");
  }
};

export const getVideoReactions = (videoId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.get(`${baseURL}/video/reaction/user/${videoId}`, axiosConfig);

    dispatch(setVideoReactions(response.data.userReaction.type));
  } catch (error) {
    dispatch(renewAuthentication(error.message))
    alert("Ocorreu um erro ao carregar as reações deste video");
  }
};

export const setVideoReactions = (videoReaction) => ({
  type: "SET_VIDEO_REACTION",
  payload: {
    videoReaction,
  },
});

export const getVideoComments = (videoId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.get(`${baseURL}/video/comment/${videoId}`, axiosConfig);

    dispatch(setVideoComments(response.data.commentsVideo));
  } catch (error) {
    dispatch(renewAuthentication(error.message))
    alert("Ocorreu um erro ao carregar comentários deste video");
  }
};

export const setVideoComments = (videoComments) => ({
  type: "SET_VIDEO_COMMENTS",
  payload: {
    videoComments,
  },
});

export const createComment = (videoId, comment) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  const body = {
    message: comment,
    videoId
  }

  try {
    await axios.post(`${baseURL}/video/comment`, body, axiosConfig);

    dispatch(getVideoComments(videoId));
  } catch(error) {
    dispatch(renewAuthentication(error.message))
    alert("Ocorreu um erro ao comentar este video");
  }
};

export const reactVideo = (videoId, reaction) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  const body = {
    videoId,
    reaction
  }

  try {
    await axios.post(`${baseURL}/video/reaction`, body, axiosConfig);

    dispatch(getVideoReactions(videoId));
  } catch(error) {
    dispatch(renewAuthentication(error.message))
    alert("Ocorreu um erro ao comentar este video");
  }
};