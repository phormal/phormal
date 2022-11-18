import FormFieldInterface from './interfaces/FormField.interface'

export type FormFieldType = 'postalCode' | 'zip' | 'email' | 'password' | 'phone' | 'number' | 'date' | 'time' | 'datetime' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'image' | 'custom' | 'text';

export type ValidationType = 'active' | 'passive';

export type MultiSelectOption = { label: string, value: any };

export type EventHandler = (event: Event, field?: FormFieldInterface) => void;