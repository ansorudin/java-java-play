import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { ConfirmationProps } from '../components/Confirmation';
import { dataConfirmationTaxProps } from '../features/Tax/components/ConfirmationTax';

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
  ConfirmationTax: dataConfirmationTaxProps;
  InputRecipients: { amount: number };
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
