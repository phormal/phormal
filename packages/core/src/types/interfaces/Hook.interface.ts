import EventHandlers from './EventHandlers'
import {GenericFunction} from "../globals";

export type Hook = (...args: unknown[]) => HookReturnValue

type HookReturnValueBase = {
  validators?: Record<string, GenericFunction>;
  errorMessages?: { [key: string]: string | object };
  dependencies?: string[];
}

export type HookReturnValue = HookReturnValueBase & EventHandlers
