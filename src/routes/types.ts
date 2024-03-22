import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { ConfirmationProps } from '../components/Confirmation';

export type MainStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  History: undefined;
  TopUp: undefined;
  Confirmation: ConfirmationProps;
  Transfer: undefined;
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
