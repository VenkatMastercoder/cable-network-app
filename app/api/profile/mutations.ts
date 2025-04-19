//write a mutation to create a ticket

import axiosInstance from "../../lib/axiosInstance";
import { Ticket } from "../../screens/Tickets/_components/types";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import * as Burnt from "burnt";
import { updateProfileApi, fetchProfileData } from './queries';

export const updateProfileData = async (user_id: string, data: any) => {
  const response = await axiosInstance.post(`users/update-profile/${user_id}`, {
    ...data,
  });

  return response.data;
};


// Type for profile update data
export type ProfileUpdateData = {
  full_name: string;
  email_id: string;
  mobile_no: string;
  communication_address: string;
  service_address: string;
};

// Type for update profile params
type UpdateProfileParams = {
  user_id: string;
  profileData: ProfileUpdateData;
};

// Mutation hook for updating profile
export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdateProfileParams>({
    mutationFn: ({ user_id, profileData }: UpdateProfileParams) =>
      updateProfileApi(user_id, profileData),
    onSuccess: () => {
      Burnt.toast({
        title: "Success",
        message: "Profile updated successfully",
        preset: "done",
        haptic: "success",
      });
      // Invalidate profile query to refetch the data
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: Error) => {
      Burnt.toast({
        title: "Error",
        message: error.message || "Failed to update profile",
        preset: "error",
        haptic: "error",
      });
    },
  });
}

// Fetch profile query hook
export function useProfileQuery(user_id: string) {
  return useQuery({
    queryKey: ['profile', user_id],
    queryFn: () => fetchProfileData(user_id),
    enabled: !!user_id,
  });
}



