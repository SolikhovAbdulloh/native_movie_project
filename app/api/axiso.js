import axios from "axios";

export const ApiRequest = async (endpoint, params) => {
  let option = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const { data } = await axios.request(option);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
