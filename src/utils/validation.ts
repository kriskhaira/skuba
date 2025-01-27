export const isObject = (
  value: unknown,
): value is Record<PropertyKey, unknown> =>
  typeof value === 'object' && value !== null;

export const hasProp = <P extends PropertyKey>(
  value: unknown,
  prop: P,
): value is Record<P, unknown> => isObject(value) && value.hasOwnProperty(prop);

export const hasNumberProp = <P extends PropertyKey>(
  value: unknown,
  prop: P,
): value is Record<P, string> =>
  isObject(value) && typeof value[prop] === 'number';

export const hasStringProp = <P extends PropertyKey>(
  value: unknown,
  prop: P,
): value is Record<P, string> =>
  isObject(value) && typeof value[prop] === 'string';
