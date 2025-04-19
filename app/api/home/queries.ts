import axiosInstance from "../../lib/axiosInstance";

export const getHomeDataApi = async (userId: string) => {
  const response = await axiosInstance.get(`/home?user_id=${userId}`);
  return response.data;
};
