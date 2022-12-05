import FormFieldInterface from './interfaces/FormField.interface'

export type FormFieldType = 'zip' | 'email' | 'password' | 'phone' | 'number' | 'date' | 'time' | 'datetime' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'image' | 'custom' | 'text' | string;

export type ValidationType = 'active' | 'passive';

export type MultiSelectOption = { label: string, value: any };

export type EventHandler = (event: Event, field: FormFieldInterface) => void;

export type ErrorMessageObject = string | { en: string, [key: string]: string };

export type disabledIf = { [key: string]: RegExp | boolean | string };