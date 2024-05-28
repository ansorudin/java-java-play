import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { dataConfirmationProps } from '../components/Confirmation';
import { dataConfirmationTaxProps } from '../features/Tax/components/ConfirmationTax';
import { PlayerProps } from '../features/home';
import { IdataProfile } from '../components/type';
import { DataTopUpProps } from '../features/topup';
import { DataInputTransferProps } from '../features/transfer/components/InputDataTransfer';

export type MainStackParamList = {
  Home_Tabs: undefined;
  Login: undefined;
  Home: undefined;
  Profile: PlayerProps;
  History: { playerId: string };
  TopUp: DataTopUpProps;
  Confirmation: dataConfirmationProps;
  Transfer: IdataProfile;
  ScanNfc: undefined;
  ExitGame: undefined;
  Tax: undefined;
  ConfirmationTax: dataConfirmationTaxProps;
  InputDataTransfer: DataInputTransferProps;
  InputRecipients: { amount: number };
  Dice: undefined;
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
