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
  color: string;
  gradient: string;
  borderGlow: string;
  animation: string;
  badgeColor: string;
  icon: string;
}

export const TIER_CONFIGS: Record<MusicianTier, TierConfig> = {
  BEGINNER: {
    name: "BEGINNER",
    label: "Principiante",
    color: "text-gray-400",
    gradient: "from-gray-500/20 to-transparent",
    borderGlow: "border-gray-500/30",
    animation: "",
    badgeColor: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    icon: "🎵",
  },
  INTERMEDIATE: {
    name: "INTERMEDIATE",
    label: "Intermedio",
    color: "text-blue-400",
    gradient: "from-blue-500/30 to-transparent",
    borderGlow: "border-blue-500/40 shadow-lg shadow-blue-500/20",
    animation: "",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    icon: "🎸",
  },
  ADVANCED: {
    name: "ADVANCED",
    label: "Avanzado",
    color: "text-purple-400",
    gradient: "from-purple-500/40 to-transparent",
    borderGlow: "border-purple-500/50 shadow-xl shadow-purple-500/30",
    animation: "animate-pulse-slow",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/50",
    icon: "⭐",
  },
  EXPERT: {
    name: "EXPERT",
    label: "Experto",
    color: "text-amber-400",
    gradient: "from-amber-500/50 to-orange-500/30",
    borderGlow: "border-amber-500/60 shadow-2xl shadow-amber-500/40",
    animation: "animate-pulse-slow",
    badgeColor:
      "bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-200 border-amber-500/60",
    icon: "🔥",
  },
  MASTER: {
    name: "MASTER",
    label: "Maestro",
    color: "text-primary",
    gradient: "from-primary/60 via-primary/40 to-transparent",
    borderGlow:
      "border-primary shadow-[0_0_30px_rgba(0,255,157,0.5)] animate-glow-pulse",
    animation: "animate-float",
    badgeColor:
      "bg-gradient-to-r from-primary/40 to-primary/20 text-primary border-primary animate-pulse-slow",
    icon: "👑",
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
