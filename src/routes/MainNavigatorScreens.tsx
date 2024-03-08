import { HomeScreen, LoginScreen } from '../pages';
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
];
