import {FieldCondition, EventHandler, FormFieldType, MultiSelectOption, ValidationType} from '../globals'
import {Hook, HookReturnValue} from './Hook.interface'
import {FormField} from '../../FormField'
import FormFieldInterface from './FormField.interface'
import EventHandlers from './EventHandlers'

export default interface FormConfig {
  el: string;
  validation?: ValidationType;
  language?: string;
  theme?: 'base';
}

type FormFieldConfigBase = {
  type?: FormFieldType;
  value?: string|boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  disabledIf?: FieldCondition;
  hideIf?: FieldCondition;
  dependencies?: string[];

  // For select fields
  options?: MultiSelectOption[];

  hooks?: HookReturnValue[];
}

export type FormFieldConfig = FormFieldConfigBase & EventHandlers