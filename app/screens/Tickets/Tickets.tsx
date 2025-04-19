import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TicketCard } from './_components/TicketCard';
import { Ticket, IssueType, ISSUE_TYPES } from './_components/types';
import Header from '../../layout/Header';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import { useGetTicketsDataQuery } from '../../api/tickets/queries';
import { useCreateTicketMutation } from '../../api/tickets/mutations';
import useUserStore from '../../store/useStore';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define Zod schema for validation
const ticketSchema = z.object({
  issueType: z.string().min(1, "Issue type is required"),
  issueDescription: z.string().min(1, "Message is required"),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

// API Ticket interface to match the API response
interface ApiTicket {
  ticket_no: string;
  raised_on: string;
  closure_on: string | null;
  ticket_type: string;
  status: string;
  issue_description: string;
  user_id: string;
  user: {
    user_id: string;
    full_name: string;
    mobile_no: string;
    email_id: string;
  };
}

const Tickets = () => {
  const [showForm, setShowForm] = useState(false);
  const theme = useTheme();
  const { colors } = theme;
  const userData = useUserStore((state) => state.user);

  // Use the query hook to fetch tickets
  const { data, isLoading, isError } = useGetTicketsDataQuery(userData?.user_id || '');

  // Format tickets for the UI
  const tickets: Ticket[] = React.useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return [];

    return data.data.map((apiTicket: ApiTicket) => ({
      id: apiTicket.ticket_no,
      issueType: apiTicket.ticket_type as IssueType,
      message: apiTicket.issue_description,
      status: apiTicket.status.toLowerCase() === 'open' ? 'open' : 'closed',
      createdAt: apiTicket.raised_on,
    }));
  }, [data]);

  // Set up React Hook Form with Zod validation
  const { control, handleSubmit, formState: { errors }, reset } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      issueType: ISSUE_TYPES[0],
      issueDescription: '',
    }
  });

  // Use the create ticket mutation
  const createTicketMutation = useCreateTicketMutation();

  // Form submission handler
  const onSubmit = (data: TicketFormValues) => {
    if (!userData?.user_id) return;

    createTicketMutation.mutate({
      ticket: {
        issueType: data.issueType,
        issueDescription: data.issueDescription,
      },
      user_id: userData.user_id,
    }, {
      onSuccess: () => {
        reset();
        setShowForm(false);
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Support Tickets"
        titleLeft={true}
        leftIcon="back"
      />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={[styles.loaderText, { color: colors.text }]}>Loading tickets...</Text>
        </View>
      ) : isError ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Could not load tickets. Please try again later.</Text>
        </View>
      ) : tickets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.text }]}>No tickets found.</Text>
        </View>
      ) : (
        <FlatList
          data={tickets}
          renderItem={({ item }) => <TicketCard ticket={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {!showForm ? (
        <TouchableOpacity
          style={styles.newTicketButton}
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.buttonText}>Raise New Ticket</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Issue Type</Text>
            <View style={styles.pickerContainer}>
              <Controller
                control={control}
                name="issueType"
                render={({ field: { onChange, value } }) => (
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={styles.picker}
                  >
                    {ISSUE_TYPES.map((type) => (
                      <Picker.Item key={type} label={type} value={type} />
                    ))}
                  </Picker>
                )}
              />
            </View>
            {errors.issueType && (
              <Text style={styles.errorText}>{errors.issueType.message}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Message</Text>
            <Controller
              control={control}
              name="issueDescription"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.messageInput,
                    errors.issueDescription && styles.inputError
                  ]}
                  multiline
                  numberOfLines={4}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Describe your issue..."
                  textAlignVertical="top"
                />
              )}
            />
            {errors.issueDescription && (
              <Text style={styles.errorText}>{errors.issueDescription.message}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                reset();
                setShowForm(false);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit(onSubmit)}
              disabled={createTicketMutation.isPending}
            >
              {createTicketMutation.isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  newTicketButton: {
    backgroundColor: COLORS.primary,
    margin: 16,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    ...FONTS.fontMedium,
  },
  formContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    ...FONTS.fontMedium,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 100,
    ...FONTS.font,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButtonText: {
    color: '#333',
    ...FONTS.fontMedium,
  },
  submitButtonText: {
    color: COLORS.white,
    ...FONTS.fontMedium,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    ...FONTS.font,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 4,
    ...FONTS.font,
  },
  inputError: {
    borderColor: 'red',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...FONTS.font,
  },
});

export default Tickets;
