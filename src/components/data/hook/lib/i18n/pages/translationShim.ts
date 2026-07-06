import i18n from "../config";

/**
 * Legacy global i18n shim.
 * Some compiled/legacy code expects a global `Translation` symbol.
 * This prevents runtime crashes and forwards translations to i18next.
 */
export function installTranslationShim() {
  const w = window as unknown as { Translation?: unknown };

  // If something else already defined it, don't overwrite.
  if (typeof w.Translation !== "undefined") return;

  // Provide a minimal API surface.
  w.Translation = {
    t: (key: string, options?: Record<string, unknown>) => i18n.t(key, options as any),
    // Some legacy code expects `translate`.
    translate: (key: string, options?: Record<string, unknown>) => i18n.t(key, options as any),
    // Some code may check for existence only.
    exists: true,
  };
}

