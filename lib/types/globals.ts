import FormFieldInterface from './interfaces/FormField.interface'

export type FormFieldType = 'zip' | 'email' | 'password' | 'phone' | 'number' | 'date' | 'time' | 'datetime' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'image' | 'custom' | 'text' | string;

export type ValidationType = 'active' | 'passive';

export type MultiSelectOption = { label: string, value: any };

export type EventHandler = (event: Event, field: FormFieldInterface) => void;

export type ErrorMessageObject = string | { en: string, [key: string]: string };

/**
 * Used to describe a condition for a field, for example for disabling or hiding it
 * */
export type FieldCondition = { [key: string]: RegExp | boolean | string };