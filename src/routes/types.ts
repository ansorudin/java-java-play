import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { DataConfirmationProps } from '../components/Confirmation';
import { dataConfirmationTaxProps } from '../features/Tax/components/ConfirmationTax';
import { IPlayer } from '../stores/type';
import { DataTopUpProps } from '../features/topup';
import { IExpense } from '../features/type';
import { DataInputTransferProps } from '../features/transfer/components/InputDataTransfer';
import { ActionType } from '../features/scanNfc';

export type MainStackParamList = {
  Home_Tabs: undefined;
  Login: undefined;
  Home: undefined;
  Profile: IPlayer;
  History: { playerId: string };
  TopUp: DataTopUpProps;
  Confirmation: DataConfirmationProps;
  Transfer: IExpense;
  ScanNfc: { action: ActionType; amount?: number };
  ExitGame: undefined;
  Tax: undefined;
  ConfirmationTax: dataConfirmationTaxProps;
  InputDataTransfer: DataInputTransferProps;
  InputRecipients: { amount: number };
  Dice: undefined;
  Register_Player: { username: string };
  Property: IExpense;
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
