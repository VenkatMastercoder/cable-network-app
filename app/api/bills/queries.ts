import axiosInstance from "../../lib/axiosInstance";

export const getBillsDataApi = async (userId: string) => {
  const response = await axiosInstance.get(`/bills/users/${userId}`);
  return response.data;
};

export const getBillDetailsDataApi = async (billNo: string) => {
  const response = await axiosInstance.get(`/bills/${billNo}`);
  return response.data;
};