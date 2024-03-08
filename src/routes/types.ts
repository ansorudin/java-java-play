import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Login: undefined;
  Home: undefined;
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
