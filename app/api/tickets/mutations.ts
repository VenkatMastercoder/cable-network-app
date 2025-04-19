//write a mutation to create a ticket

import axiosInstance from "../../lib/axiosInstance";
import { Ticket } from "../../screens/Tickets/_components/types";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Burnt from "burnt";
import { getTicketsDataApi } from "./queries";

export const createTicket = async (ticket: {
  issueDescription: string;
  issueType: string;
}, user_id: string) => {
  const response = await axiosInstance.post(`tickets/raise-ticket/${user_id}`, {
    issue_description: ticket.issueDescription,
    ticket_type: ticket.issueType,
  });

  return response.data;
};

type CreateTicketParams = {
  ticket: {
    issueDescription: string;
    issueType: string;
  };
  user_id: string;
}

export function useCreateTicketMutation() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, CreateTicketParams>({
    mutationFn: ({ ticket, user_id }: CreateTicketParams) => createTicket(ticket, user_id),
    onSuccess: (_, variables) => {
      Burnt.toast({
        title: "Success",
        message: "Ticket created successfully",
        preset: "done",
        haptic: "warning",
      });
      // Invalidate tickets query to refetch the list with proper query key
      queryClient.invalidateQueries({ queryKey: ['tickets', variables.user_id] });
    },
    onError: (error: Error) => {
      Burnt.toast({
        title: "Error",
        message: error.message || "Failed to create ticket",
        preset: "done",
        haptic: "warning",
      });
    },
  });
}



