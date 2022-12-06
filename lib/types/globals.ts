import FormFieldInterface from './interfaces/FormField.interface'

export type FormFieldType = 'zip' | 'email' | 'password' | 'phone' | 'number' | 'date' | 'time' | 'datetime' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'image' | 'custom' | 'text' | string;

export type ValidationType = 'active' | 'passive';

export type MultiSelectOption = { label: string, value: any };

export type EventHandler = (event: Event, field: FormFieldInterface) => void;

export type ErrorMessageObject = string | { en: string } & Record<string, string>;

/**
 * Used to describe a condition for a field, for example for disabling or hiding it
 * */
// The types of the values that can be used in a condition
type FieldConditionValue = RegExp | boolean | string;
export type FieldCondition = Record<string, FieldConditionValue>;

export type GenericFunction = (...args: any[]) => void;