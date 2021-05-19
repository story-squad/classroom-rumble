export interface IPromptInQueue extends IPrompt {
  starts_at: Date & string;
}
// TYPE GUARD for the IPromptInQueue interface, if `starts_at` exists, it's a prompt in queue
export const isPromptInQueue = (
  prompt: IPrompt | IPromptInQueue,
): prompt is IPromptInQueue => !!(prompt as IPromptInQueue).starts_at;

export interface IPrompt extends INewPrompt {
  id: number;
  active: boolean;
  approved: boolean;
  hasSubmitted?: boolean;
}

export interface INewPrompt {
  prompt: string;
  approved?: boolean;
  creatorId?: number;
}
