import {
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  HistoryScreen,
  TopUpScreen,
  ConfirmationScreen,
  TransferScreen,
  ScanNfcScreen,
  ExitGameScreen,
  TaxBalanceScreen,
  ConfirmationTaxScreen,
  InputRecipientsScreen,
  InputDataTransferScreen,
  DiceScreen,
  RegisterPlayerScreen,
  PropertyScreen,
} from '../pages';
import { MainStackScreenList } from './types';

export const MainScreens: MainStackScreenList[] = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Login',
    component: LoginScreen,
  },

  {
    name: 'Profile',
    component: ProfileScreen,
  },
  {
    name: 'History',
    component: HistoryScreen,
  },
  {
    name: 'TopUp',
    component: TopUpScreen,
  },
  {
    name: 'Confirmation',
    component: ConfirmationScreen,
  },
  {
    name: 'Transfer',
    component: TransferScreen,
  },
  {
    name: 'ScanNfc',
    component: ScanNfcScreen,
  },
  {
    name: 'ExitGame',
    component: ExitGameScreen,
  },
  {
    name: 'Tax',
    component: TaxBalanceScreen,
  },
  {
    name: 'ConfirmationTax',
    component: ConfirmationTaxScreen,
  },
  {
    name: 'InputRecipients',
    component: InputRecipientsScreen,
  },
  {
    name: 'InputDataTransfer',
    component: InputDataTransferScreen,
  },
  {
    name: 'Dice',
    component: DiceScreen,
  },
  {
    name: 'Register_Player',
    component: RegisterPlayerScreen,
  },
  {
    name: 'Property',
    component: PropertyScreen,
  },
];
