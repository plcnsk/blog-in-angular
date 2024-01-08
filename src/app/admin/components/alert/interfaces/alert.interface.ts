export interface AlertInterface {
  type: string;
  text: string;
}

export type AlertType = 'success' | 'warning' | 'danger';
