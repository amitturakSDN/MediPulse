import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import ForgotPassword from '../screens/auth/forgotPassword';
import OtpScreen from '../screens/auth/otpScreen';
import ConfirmPassword from '../screens/auth/confirmPassword';
import ChangePassword from '../screens/auth/changePassword';

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="OtpScreen" component={OtpScreen} />
      <AuthStack.Screen name="ConfirmPassword" component={ConfirmPassword} /> 
      <AuthStack.Screen name="ChangePassword" component={ChangePassword} /> 


    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
