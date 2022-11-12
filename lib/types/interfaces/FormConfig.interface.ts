import {FormFieldType} from '../globals'
import {Hook, HookReturnValue} from './Hook.interface'

export default interface FormConfig {
  fields: { [key: string]: ConfigFormField };
  el: string;
}

export interface ConfigFormField {
  type?: FormFieldType;
  value?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;

  hooks?: HookReturnValue[];
}