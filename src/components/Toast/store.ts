export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
}

export interface NotifyOptions {
  id?: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

type Listener = (items: ToastItem[]) => void;

let items: ToastItem[] = [];
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener(items));
}

function notify({ id, title, description, variant = "info", duration = 3000 }: NotifyOptions): string {
  const toastId = id ?? Math.random().toString(36).slice(2);
  items = [...items.filter((t) => t.id !== toastId), { id: toastId, title, description, variant, duration }];
  emit();
  return toastId;
}

function dismiss(id: string) {
  items = items.filter((t) => t.id !== id);
  emit();
}

function clearAll() {
  items = [];
  emit();
}

export const toastStore = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    listener(items);
    return () => listeners.delete(listener);
  },
  getItems: () => items,
};

export const toast = {
  notify,
  success: (options: Omit<NotifyOptions, "variant">) => notify({ ...options, variant: "success" }),
  error: (options: Omit<NotifyOptions, "variant">) => notify({ ...options, variant: "error" }),
  warning: (options: Omit<NotifyOptions, "variant">) => notify({ ...options, variant: "warning" }),
  info: (options: Omit<NotifyOptions, "variant">) => notify({ ...options, variant: "info" }),
  dismiss,
  clearAll,
};
