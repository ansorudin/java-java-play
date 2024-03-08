import { createNavigationContainerRef } from '@react-navigation/native';
import { MainStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<MainStackParamList>();

export function navigate<RouteName extends keyof MainStackParamList>(
  ...args: RouteName extends unknown
    ? undefined extends MainStackParamList[RouteName]
      ? [screen: RouteName] | [screen: RouteName, params: MainStackParamList[RouteName]]
      : [screen: RouteName, params: MainStackParamList[RouteName]]
    : never
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}
