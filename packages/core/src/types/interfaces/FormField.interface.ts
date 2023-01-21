import {FieldCondition, EventHandler, FormFieldType} from '../globals'
import {Phormal} from '../../index'
import {FormFieldConfig} from "./FormConfig.interface";

export default interface FormFieldInterface {
  type: FormFieldType;
  name: string;
  config: FormFieldConfig|undefined;
  label: string | undefined;
  placeholder?: string;
  dependencies?: ReadonlyArray<string>;
  disabledIf?: FieldCondition;
  hideIf?: FieldCondition;
  row?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string[];
  dependants?: string[];
  isHidden?: boolean;

  // date & time attributes
  min?: string|null;
  max?: string|null;

  render(mountingEl: HTMLElement): void;
  runAllValidators(): void;
  getValue(): string | number | undefined | boolean;
  setValue(value: string | number): void;
  resolveDependencies(): void;
  checkValueDependencies(): void;
  addDependant(dependant: string): void;

  _form: Phormal | undefined;
  _errorMessages?: { [key: string]: string | object };

  _onClick: (event: Event) => void;
  _onChange: (event: Event) => void;
  _onBlur: (event: Event) => void;
  _onFocus: (event: Event) => void;
  _onInput: (event: Event) => void;

  _onClickHandlers: EventHandler[];
  _onChangeHandlers: EventHandler[];
  _onBlurHandlers: EventHandler[];
  _onFocusHandlers: EventHandler[];
  _onInputHandlers: EventHandler[];

  // Allow extensibility
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [key: string]: any;
}
