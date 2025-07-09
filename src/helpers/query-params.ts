import { ReducedHelperObject } from './reducer';

/**
 * Given a query params object return a flattened query string.
 */
export const getQueryString = (queryObj: ReducedHelperObject): string => {
  const params = new URLSearchParams();

  Object.entries(queryObj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else {
      params.append(key, value);
    }
  });

  return params.toString();
};
