/**
 * Sistema de tiers para músicos según su seniority calculado
 *
 * Tiers:
 * - BEGINNER: 0-2 seniority
 * - INTERMEDIATE: 2-4 seniority
 * - ADVANCED: 4-6 seniority
 * - EXPERT: 6-8 seniority
 * - MASTER: 8+ seniority
 */

export type MusicianTier =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "EXPERT"
  | "MASTER";

export interface TierConfig {
  name: string;
  label: string;
  borderColor: string;
  borderEffect: string;
  badgeColor: string;
  textEffect: string;
  nameEffect: string;
  locationEffect: string;
  iconName: string; // Nombre del icono de Lucide
  hue: number; // Para el color del shimmer
}

export const TIER_CONFIGS: Record<MusicianTier, TierConfig> = {
  BEGINNER: {
    name: "BEGINNER",
    label: "Principiante",
    borderColor: "border-gray-500/30",
    borderEffect: "",
    badgeColor: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    textEffect: "text-white/90",
    nameEffect: "text-white",
    locationEffect: "text-white/80",
    iconName: "music",
    hue: 0,
  },
  INTERMEDIATE: {
    name: "INTERMEDIATE",
    label: "Intermedio",
    borderColor: "border-blue-400/50",
    borderEffect: "",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    textEffect: "text-white/90",
    nameEffect: "text-white",
    locationEffect: "text-white/80",
    iconName: "guitar",
    hue: 220,
  },
  ADVANCED: {
    name: "ADVANCED",
    label: "Avanzado",
    borderColor: "border-purple-400/60",
    borderEffect: "",
    badgeColor: "bg-purple-500/25 text-purple-300 border-purple-400/50",
    textEffect: "text-purple-300 font-semibold animate-pulse-soft",
    nameEffect: "text-white",
    locationEffect: "text-purple-200/90",
    iconName: "star",
    hue: 270,
  },
  EXPERT: {
    name: "EXPERT",
    label: "Experto",
    borderColor: "border-amber-500/60",
    borderEffect: "animate-border-trace [--border-color:oklch(0.8_0.2_40)]",
    badgeColor:
      "bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-200 border-amber-400/60",
    textEffect: "text-amber-300 font-bold animate-text-shimmer",
    nameEffect: "text-amber-100 font-bold animate-name-entrance",
    locationEffect: "text-amber-200/90",
    iconName: "flame",
    hue: 40,
  },
  MASTER: {
    name: "MASTER",
    label: "Maestro",
    borderColor: "border-primary/60",
    borderEffect: "animate-border-trace [--border-color:oklch(0.8_0.2_140)]",
    badgeColor:
      "bg-gradient-to-r from-primary/40 to-primary/20 text-primary border-primary",
    textEffect: "text-primary font-bold animate-text-shimmer",
    nameEffect:
      "text-primary font-extrabold animate-name-entrance drop-shadow-[0_0_8px_rgba(0,255,157,0.5)]",
    locationEffect: "text-primary/90",
    iconName: "crown",
    hue: 140,
  },
};

export function getMusicianTier(calculatedSeniority: number): MusicianTier {
  if (calculatedSeniority >= 8) return "MASTER";
  if (calculatedSeniority >= 6) return "EXPERT";
  if (calculatedSeniority >= 4) return "ADVANCED";
  if (calculatedSeniority >= 2) return "INTERMEDIATE";
  return "BEGINNER";
}

export function getTierConfig(calculatedSeniority: number): TierConfig {
  const tier = getMusicianTier(calculatedSeniority);
  return TIER_CONFIGS[tier];
}
