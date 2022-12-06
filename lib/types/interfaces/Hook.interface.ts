import EventHandlers from './EventHandlers'
import {GenericFunction} from "../globals";

export type Hook = (...args: any) => HookReturnValue

type HookReturnValueBase = {
  [key: string] : any;
  validators?: Record<string, GenericFunction>;
  errorMessages?: { [key: string]: string | object };
  dependencies?: string[];
}

export type HookReturnValue = HookReturnValueBase & EventHandlers
