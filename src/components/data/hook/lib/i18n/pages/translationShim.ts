import i18n from "../config";

/**
 * Legacy global i18n shim.
 * Some compiled/legacy code expects a global `Translation` symbol.
 * This prevents runtime crashes and forwards translations to i18next.
 */
export function installTranslationShim() {
  const g = globalThis as unknown as { Translation?: unknown };

  // If something else already defined it, don't overwrite.
  if (typeof g.Translation !== "undefined") return;

  // Provide a minimal API surface.
  const translationApi = {
    t: (key: string, options?: Record<string, unknown>) => i18n.t(key, options as any),
    translate: (key: string, options?: Record<string, unknown>) => i18n.t(key, options as any),
    exists: true,
  };

  // Ensure both globalThis + window have the symbol for legacy bundles.
  g.Translation = translationApi;
  (window as unknown as { Translation?: unknown }).Translation = translationApi;
}


