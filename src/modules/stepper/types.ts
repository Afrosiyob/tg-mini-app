export interface IStep {
  id?: number;
  prev?: string;
  next?: string;
  title?: string;
  number?: number;
  component?: JSX.Element;
}

export interface ISteps {
  [key: string]: IStep;
}

export interface IProviderProps {
  firstStepKey?: string;
  steps: ISteps;
  onFirst?: () => void;
  onLast?: () => void;
  onChange?: (step: string) => void;
}

export interface IContextProps {
  component?: JSX.Element | null;
  step: string;
  steps: ISteps;
  currentStep: IStep;
  isFirst: boolean;
  isLast: boolean;
  canPrev: boolean;
  canNext: boolean;
  prev: () => void;
  next: () => void;
  goTo: (step: string) => void;
  goToFirst: () => void;
  onFirst: () => void;
  onLast: () => void;
}
