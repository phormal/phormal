import {FormFieldType, ValidationType} from '../globals'
import {Hook, HookReturnValue} from './Hook.interface'

export default interface FormConfig {
  el: string;
  validation?: ValidationType;
}

export interface FormFieldConfig {
  type?: FormFieldType;
  value?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;

  hooks?: HookReturnValue[];
}