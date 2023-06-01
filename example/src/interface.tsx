export type ToastId = string | number;
export type ToastStatus = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type ToastPosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right';

export interface ToastMethods {
  /**
   * Function to actually create a toast and add it
   * to state at the specified position
   */
  notify: (message: any, options?: any) => ToastId;
  /**
   * Close all toasts at once.
   * If given positions, will only close those.
   */
  closeAll: (options?: any) => void;
  /**
   * Requests to close a toast based on its id and position
   */
  close: (id: ToastId) => void;
  /**
   * Update a specific toast with new options based on the
   * passed `id`
   */
  update: (id: ToastId, options: Omit<any, 'id'>) => void;
  isActive: (id: ToastId) => boolean;
}

export interface ToastOptions {
  /**
   * The toast's id
   */
  id: ToastId;
  /**
   * The duration of the toast
   */
  duration: number | null;
  /**
   * The status of the toast's alert component.
   */
  status: ToastStatus;

  /**
   * Function that removes the toast from manager's state.
   */
  onRequestRemove(): void;

  /**
   * The position of the toast
   */
  position: ToastPosition;

  /**
   * Callback function to run side effects after the toast has closed.
   */
  onCloseComplete?(): void;

  /**
   * Internally used to queue closing a toast. Should probably not be used by
   * anyone else, but documented regardless.
   */
  requestClose?: boolean;
  /**
   * Optional style overrides for the toast component.
   */
  style?: any;
}

export type ToastState = {
  [K in ToastPosition]: ToastOptions[];
};

export type ToastStore = ToastMethods & {
  getState: () => ToastState;
  subscribe: (onStoreChange: () => void) => () => void;
  removeToast: (id: ToastId, position: ToastPosition) => void;
};
