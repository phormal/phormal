import EventHandlers from './EventHandlers'

export type Hook = (...args: any) => HookReturnValue

type HookReturnValueBase = {
  [key: string] : any;
  validators?: { [key: string]: any };
}

export type HookReturnValue = HookReturnValueBase & EventHandlers
