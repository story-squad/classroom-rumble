export interface IPromptInQueue extends IPrompt {
  starts_at: Date & string;
}

export interface IPrompt extends INewPrompt {
  id: number;
  active: boolean;
  approved: boolean;
  hasSubmitted?: boolean;
  starts_at?: Date & string;
}

export interface INewPrompt {
  prompt: string;
  approved?: boolean;
  creatorId?: number;
}
