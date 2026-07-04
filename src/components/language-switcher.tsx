import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { fallbackLng, languageOptions, normalizeLanguage } from "@/components/data/hook/lib/i18n/util";

type LanguageSwitcherProps = {
  className?: string;
  compact?: boolean;
};

export const LanguageSwitcher = ({ className, compact }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const currentLanguage =
    normalizeLanguage(i18n.resolvedLanguage ?? i18n.language) ?? fallbackLng;

  const currentLabel = languageOptions.find((l) => l.value === currentLanguage)?.label ?? "English";
  const shortCode = currentLanguage.split("-")[0].toUpperCase();

  if (compact) {
    return (
      <Select
        value={currentLanguage}
        onValueChange={(language) => {
          void i18n.changeLanguage(language);
        }}
      >
        <SelectTrigger
          className={cn(
            "h-8 w-auto min-w-0 gap-1.5 rounded-md border border-secondary/40 bg-primary-light/50 px-2 text-xs font-semibold text-secondary hover:bg-primary-light hover:text-secondary-foreground transition-colors",
            className
          )}
        >
          <Globe size={13} className="flex-shrink-0" />
          <span>{shortCode}</span>
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((language) => (
            <SelectItem key={language.value} value={language.value}>
              <span className="flex items-center gap-2 text-sm">
                {language.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Select
      value={currentLanguage}
      onValueChange={(language) => {
        void i18n.changeLanguage(language);
      }}
    >
      <SelectTrigger className={cn("min-w-[140px]", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
