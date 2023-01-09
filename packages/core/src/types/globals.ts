/* eslint-disable  @typescript-eslint/no-explicit-any */

import FormFieldInterface from './interfaces/FormField.interface'

export const FormFieldTypes = ['email', 'password', 'select', 'checkbox', 'text', 'number', 'radiogroup']
export type FormFieldType = typeof FormFieldTypes[number] | string;

export type ValidationType = 'active' | 'passive';

export type MultiSelectOption = { label: string, value: any };

export type RadioButtonOption = { label: string, value: any, disabled?: boolean };

export type EventHandler = (event: Event, field: FormFieldInterface) => void;

export type ErrorMessageObject = { en: string } & Record<string, string>;

/**
 * Used to describe a condition for a field, for example for disabling or hiding it
 * */
// The types of the values that can be used in a condition
type FieldConditionValue = RegExp | boolean | string;
export type FieldCondition = Record<string, FieldConditionValue>;

export type GenericFunction = (...args: any[]) => void;