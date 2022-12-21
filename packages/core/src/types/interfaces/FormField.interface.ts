import {FieldCondition, EventHandler, FormFieldType} from '../globals'
import {Phormal} from '../../index'
import {FormFieldConfig} from "./FormConfig.interface";

export default interface FormFieldInterface {
  readonly type: FormFieldType;
  readonly name: string;
  readonly config: FormFieldConfig|undefined;
  readonly defaultValue?: string | number;
  readonly label?: string;
  readonly placeholder?: string;
  readonly dependencies?: ReadonlyArray<string>;
  readonly disabledIf?: FieldCondition;
  readonly hideIf?: FieldCondition;
  readonly row?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string[];
  dependants?: string[];
  isHidden?: boolean;

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
  [key: string]: any;
}