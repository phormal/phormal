export type Hook = (...args: any) => HookReturnValue

export type HookReturnValue = {
  [key: string] : any;
  validators?: { [key: string]: any };
}
