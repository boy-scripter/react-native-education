import { RootStackParamList } from '@/types/navigation';
import { createNavigationContainerRef, RouteProp, useRoute, } from '@react-navigation/native';
import { useEffect } from 'react';


export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export type RouteNameArgs = {
  [RouteName in keyof RootStackParamList]: undefined extends RootStackParamList[RouteName]
  ? [
    screen: RouteName,
    params?: RootStackParamList[RouteName],
    options?: { merge?: boolean; pop?: boolean }
  ]
  : [
    screen: RouteName,
    params: RootStackParamList[RouteName],
    options?: { merge?: boolean; pop?: boolean }
  ];
}[keyof RootStackParamList]

export function navigate(...args: RouteNameArgs) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function canGoBack() {
  return navigationRef.isReady() && navigationRef.canGoBack();
}

export function resetRoot(routeName: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    });
  }
}

export function replace(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(state => {
      const routes = state.routes.slice(0, state.routes.length - 1);
      routes.push({
        key: `${name}-${Date.now()}`, // Generate a unique key
        name,
        params,
      });
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    });
  }
}

export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute();
  }
  return null;
}

export function useRouteEffect<
  ParamList extends Record<string, any>,
  RouteName extends keyof ParamList
>(
  callback: (params : ParamList[RouteName]) => void,
  deps?: (keyof ParamList[RouteName])[]
) {
  const route = useRoute<RouteProp<ParamList, RouteName>>();
  const params = (route.params ?? {}) as ParamList[RouteName];

  const dependencyObject =
    deps === undefined
      ? params
      : deps.reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {} as Partial<ParamList[RouteName]>);

  const dependency = JSON.stringify(dependencyObject);

  useEffect(() => {
    callback(params!);
  }, [dependency]);
}