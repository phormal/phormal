import {FormFieldType} from '../globals'
import {Hook, HookReturnValue} from './Hook.interface'

export default interface FormConfig {
  fields: ConfigFormField[];
  el: string;
}

export interface ConfigFormField {
  type: FormFieldType;
  defaultValue?: string | number;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;

  hooks?: HookReturnValue[];
}