export interface IFormValues {
  title: string;
  description: string;
  assigned: number;
  status: number;
}

export const formInitialValues: IFormValues = {title: '', description: '', assigned: 0, status: 1};
