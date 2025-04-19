//fetch profile data
import axiosInstance from "../../lib/axiosInstance";

export const fetchProfileData = async (user_id: string) => {
  const response = await axiosInstance.get(`/users/profile/${user_id}`);
  return response.data;
};

// Update profile data
export const updateProfileApi = async (user_id: string, profileData: {
  full_name: string;
  email_id: string;
  mobile_no: string;
  communication_address: string;
  service_address: string;
}) => {
  const response = await axiosInstance.put(`/users/profile/${user_id}`, profileData);
  return response.data;
};

