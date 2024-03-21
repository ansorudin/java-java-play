import {
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  HistoryScreen,
  TopUpScreen,
  ConfirmationScreen,
  TransferScreen,
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
];
