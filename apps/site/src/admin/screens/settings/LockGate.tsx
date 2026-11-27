// STUB (owned by the cloud-sync agent): shows a PIN screen (local mode) or a login screen (cloud mode) before children.
import type { ComponentChildren } from 'preact';
import type { Store } from '../../store';
import type { Lang } from '../../types';
export function LockGate({ children }: { store: Store; lang: Lang; children: ComponentChildren }) { return <>{children}</>; }
