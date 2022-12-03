import EventHandlers from './EventHandlers'

export type Hook = (...args: any) => HookReturnValue

type HookReturnValueBase = {
  [key: string] : any;
  validators?: { [key: string]: any };
  errorMessages?: { [key: string]: string | object };
}

export type HookReturnValue = HookReturnValueBase & EventHandlers
