import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";

export const getTicketsDataApi = async (userId: string) => {
  const response = await axiosInstance.get(`/tickets/${userId}`);
  return response.data;
};

export const useGetTicketsDataQuery = (userId: string) => {
  return useQuery({
    queryKey: ['tickets', userId],
    queryFn: () => getTicketsDataApi(userId),
    enabled: !!userId,
  });
};
