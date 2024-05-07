import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { dataConfirmationProps } from '../components/Confirmation';
import { dataConfirmationTaxProps } from '../features/Tax/components/ConfirmationTax';
import { dataProfileProps } from '../features/profile';
import { DataInputTransferProps } from '../features/transfer/components/InputDataTransfer';

export type MainStackParamList = {
  Home_Tabs: undefined;
  Login: undefined;
  Home: undefined;
  Profile: dataProfileProps;
  History: undefined;
  TopUp: undefined;
  Confirmation: dataConfirmationProps;
  Transfer: dataProfileProps;
  ScanNfc: undefined;
  ExitGame: undefined;
  Tax: undefined;
  ConfirmationTax: dataConfirmationTaxProps;
  InputDataTransfer: DataInputTransferProps;
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
