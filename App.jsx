// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/pages/shared/LoginScreen';
import Signup from './src/pages/shared/Signup';
import ForgotPassword from './src/pages/shared/ForgotPassword';
import ReportInfoPage from './src/pages/dc/ReportInfoPage';
import ReferralInfoPage from './src/pages/dc/ReferralInfoPage';
import DcHome from './src/pages/dc/DcHome';
import AnalyticsPage from './src/pages/shared/AnalyticsPage';
import AssignAssociationPage from './src/pages/shared/AssignAssociationPage';
import EditProfilePage from './src/pages/shared/EditProfilePage';
import SentInvitePage from './src/pages/shared/SentInvitePage';
import LabReportsPage from './src/pages/dc/LabReports';
import MorePage from './src/pages/dc/More';
import ReferralsPage from './src/pages/dc/ReferralsPage';
import TabNavigator from './src/navigation/TabNavigator';
import ProfilePage from './src/pages/shared/ProfilePage';
import ResetPasswordPage from './src/pages/shared/ResetPasswordPage';
import AccountPage from './src/pages/shared/AccountPage';
import OTPVerificationScreen from './src/pages/shared/OTPVerificationScreen';
import PasswordSetUp from './src/pages/shared/PasswordSetUp';
// import AdminDashboard from './pages/AdminDashboard';
// import UserDashboard from './pages/UserDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} 
      // initialRouteName=''
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ReportInfo" component={ReportInfoPage} />
        <Stack.Screen name="ReferralInfo" component={ReferralInfoPage} />
        <Stack.Screen name="AnalyticsPage" component={AnalyticsPage} />
        <Stack.Screen
          name="AssignAssociationPage"
          component={AssignAssociationPage}
        />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
        <Stack.Screen name="SentInvitePage" component={SentInvitePage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="ResetPasswordPage" component={ResetPasswordPage} />
        <Stack.Screen name="AccountPage" component={AccountPage} />
        <Stack.Screen
          name="OtpVerification"
          component={OTPVerificationScreen}
        />
        <Stack.Screen name="PasswordSetUp" component={PasswordSetUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
