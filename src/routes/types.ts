import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { dataConfirmationProps } from '../components/Confirmation';
import { dataConfirmationTaxProps } from '../features/Tax/components/ConfirmationTax';
import { IPlayer } from '../stores/type';
import { DataTopUpProps } from '../features/topup';
import { DataTransferProps } from '../features/transfer';
import { DataInputTransferProps } from '../features/transfer/components/InputDataTransfer';

export type MainStackParamList = {
  Home_Tabs: undefined;
  Login: undefined;
  Home: undefined;
  Profile: IPlayer;
  History: { playerId: string };
  TopUp: DataTopUpProps;
  Confirmation: dataConfirmationProps;
  Transfer: DataTransferProps;
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
