import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SectionList, StyleSheet, ActivityIndicator, TextInput, Modal } from 'react-native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch } from 'react-redux';
import { openDrawer } from '../../redux/actions/drawerAction';
import useUserStore from '../../store/useStore';
import { useProfileQuery, useUpdateProfileMutation } from '../../api/profile/mutations';
import { ProfileUpdateData } from '../../api/profile/mutations';

const btnData = [
  {
      title: "Your order",
      navigate: 'Myorder',
  },
  {
      title: "Wishlist",
      navigate: 'Wishlist',
  },
  {
      title: "Coupons",
      navigate: 'Coupons',
  },
  {
      title: "Track order",
      navigate: 'Trackorder',
  },
]

const ListwithiconData = [
  {
      title: 'Account Settings',
      data: [
          {
              icon: IMAGES.user3,
              title: "Edit profile",
              navigate: 'EditProfile'
          },
          {
              icon: IMAGES.card2,
              title: "Saved Cards & Wallet",
              navigate: 'Payment'
          },
          {
              icon: IMAGES.map,
              title: "Saved Addresses",
              navigate: 'AddDeliveryAddress'
          },
          {
              icon: IMAGES.translation,
              title: "Select Language",
              navigate: 'Language'
          },
          {
              icon: IMAGES.ball,
              title: "Notifications Settings",
              navigate: 'Notification'
          },
      ],
  },
  {
      title: 'My Activity',
      data: [
          {
              icon: IMAGES.star,
              title: "Reviews",
              navigate: 'Writereview'
          },
          {
              icon: IMAGES.chat,
              title: "Questions & Answers",
              navigate: 'Questions'
          },
      ],
  },

];

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({ navigation }: ProfileScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const user = useUserStore((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<ProfileUpdateData>({
    full_name: '',
    email_id: '',
    mobile_no: '',
    communication_address: '',
    service_address: ''
  });

  // Fetch profile data
  const { data, isLoading, isError } = useProfileQuery(user?.user_id || '');

  // Update profile mutation
  const updateProfileMutation = useUpdateProfileMutation();
  const setUser = useUserStore((state) => state.setUser);

  // Initialize form data when profile data is loaded
  React.useEffect(() => {
    if (data?.data) {
      setUpdatedProfile({
        full_name: data.data.full_name,
        email_id: data.data.email_id,
        mobile_no: data.data.mobile_no,
        communication_address: data.data.communication_address,
        service_address: data.data.service_address
      });
    }
  }, [data]);

  const handleSaveProfile = () => {
    if (!user?.user_id) return;

    updateProfileMutation.mutate({
      user_id: user.user_id,
      profileData: updatedProfile
    }, {
      onSuccess: () => {
        // Update Zustand store with the updated profile data
        if (user) {
          setUser({
            ...user,
            full_name: updatedProfile.full_name,
            email_id: updatedProfile.email_id,
            mobile_no: updatedProfile.mobile_no,
            communication_address: updatedProfile.communication_address,
            service_address: updatedProfile.service_address
          });
        }
        setIsEditing(false);
      }
    });
  };

  const handleInputChange = (field: keyof ProfileUpdateData, value: string) => {
    setUpdatedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Profile" titleLeft={true} leftIcon="back" />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={[styles.loaderText, { color: colors.text }]}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Profile" titleLeft={true} leftIcon="back" />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Could not load profile. Please try again later.</Text>
        </View>
      </View>
    );
  }

  if (!data?.data) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Profile" titleLeft={true} leftIcon="back" />
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.text }]}>No profile data found.</Text>
        </View>
      </View>
    );
  }

  const profileData = data.data;
  const initials = profileData.full_name
    .split(' ')
    .map((name: string) => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Profile"
        titleLeft={true}
        leftIcon="back"
      />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', paddingVertical: 20, backgroundColor: '#4eacea' }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10
          }}>
            <Text style={{ ...FONTS.h1, color: COLORS.primary }}>{initials}</Text>
          </View>
        </View>

        {isEditing ? (
          <View style={[GlobalStyleSheet.container]}>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={updatedProfile.full_name}
                  onChangeText={(text) => handleInputChange('full_name', text)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Account No.</Text>
                <Text style={styles.value}>{profileData.account_no}</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Id</Text>
                <TextInput
                  style={styles.input}
                  value={updatedProfile.email_id}
                  onChangeText={(text) => handleInputChange('email_id', text)}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile No.</Text>
                <TextInput
                  style={styles.input}
                  value={updatedProfile.mobile_no}
                  onChangeText={(text) => handleInputChange('mobile_no', text)}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Communication Address</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={updatedProfile.communication_address}
                  onChangeText={(text) => handleInputChange('communication_address', text)}
                  multiline
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Service Address</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={updatedProfile.service_address}
                  onChangeText={(text) => handleInputChange('service_address', text)}
                  multiline
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={handleSaveProfile}
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.submitButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={[GlobalStyleSheet.container]}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>{profileData.full_name}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Account No.</Text>
              <Text style={styles.value}>{profileData.account_no}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Email Id</Text>
              <View style={styles.editableValue}>
                <Text style={styles.value}>{profileData.email_id}</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Mobile No.</Text>
              <View style={styles.editableValue}>
                <Text style={styles.value}>{profileData.mobile_no}</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Communication Address</Text>
              <Text style={styles.value}>{profileData.communication_address}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Service Address</Text>
              <Text style={styles.value}>{profileData.service_address}</Text>
            </View>

            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editProfileButtonText}>EDIT PROFILE</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    ...FONTS.fontRegular,
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  value: {
    ...FONTS.fontMedium,
    fontSize: 16,
    color: '#333',
  },
  editableValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editProfileButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 8,
  },
  editProfileButtonText: {
    ...FONTS.fontBold,
    fontSize: 16,
    color: COLORS.white,
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
    ...FONTS.font,
    color: 'red',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...FONTS.font,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    ...FONTS.font,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
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
})

export default Profile;