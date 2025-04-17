import {createNavigationContainerRef, ParamListBase,} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<ParamListBase>();

export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
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
      routes: [{name: routeName, params}],
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
