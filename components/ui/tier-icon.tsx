import { Music, Guitar, Star, Flame, Crown, LucideIcon } from "lucide-react";

interface TierIconProps {
    iconName: string;
    className?: string;
}

const iconMap: Record<string, LucideIcon> = {
    music: Music,
    guitar: Guitar,
    star: Star,
    flame: Flame,
    crown: Crown,
};

export function TierIcon({ iconName, className }: TierIconProps) {
    const Icon = iconMap[iconName.toLowerCase()] || Music;
    return <Icon className={className} />;
}
