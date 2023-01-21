import {FieldCondition, FormFieldType, MultiSelectOption, RadioButtonOption, ValidationType} from '../globals'
import {HookReturnValue} from './Hook.interface'
import EventHandlers from './EventHandlers'

export default interface FormConfig {
  el: string;
  validation?: ValidationType;
  language?: string;
  theme?: 'basic' | 'material';
  fallbackLanguage?: string;
  autoInit?: boolean; // Prevents the form from being initialized automatically (used by react package)
}

type FormFieldConfigBase = {
  // For all fields
  type?: FormFieldType;
  value?: string|boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  disabledIf?: FieldCondition;
  hideIf?: FieldCondition;
  row?: string;
  focus?: boolean;

  // For select fields
  options?: MultiSelectOption[] | RadioButtonOption[];

  // For date & time fields
  min?: string;
  max?: string;

  hooks?: HookReturnValue[];
}

export type FormFieldConfig = FormFieldConfigBase & EventHandlers

export type MultiSelectConfig = Omit<FormFieldConfig, 'options'> & { options: MultiSelectOption[] }

export type RadioGroupConfig = Omit<FormFieldConfig, 'options'> & { options: RadioButtonOption[] }
