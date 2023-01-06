import {FieldCondition, FormFieldType, MultiSelectOption, ValidationType} from '../globals'
import {HookReturnValue} from './Hook.interface'
import EventHandlers from './EventHandlers'

export default interface FormConfig {
  el: string;
  validation?: ValidationType;
  language?: string;
  theme?: 'basic' | 'material';
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
  row?: string;
  focus?: boolean;

  // For select fields
  options?: MultiSelectOption[];

  hooks?: HookReturnValue[];
}

export type FormFieldConfig = FormFieldConfigBase & EventHandlers