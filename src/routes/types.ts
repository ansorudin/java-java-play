import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { ConfirmationProps } from '../components/Confirmation';

export type MainStackParamList = {
  Home_Tabs: undefined;
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  History: undefined;
  TopUp: undefined;
  Confirmation: ConfirmationProps;
  Transfer: undefined;
  ScanNfc: undefined;
  ExitGame: undefined;
  Tax: undefined;
};

export type MainStackScreenList = {
  name: keyof MainStackParamList;
  component: () => JSX.Element;
  options?: NativeStackNavigationOptions;
};

export type MainStackNavigationProps = NativeStackNavigationProp<
  MainStackParamList,
  keyof MainStackParamList
>;
