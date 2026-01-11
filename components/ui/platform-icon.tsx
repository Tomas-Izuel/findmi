import {
    Mail,
    MessageCircle,
    Instagram,
    Facebook,
    Twitter,
    Youtube,
    Music,
    Cloud,
    Disc,
    Phone,
    Globe,
    Contact,
    type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    mail: Mail,
    "message-circle": MessageCircle,
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    youtube: Youtube,
    music: Music,
    cloud: Cloud,
    disc: Disc,
    phone: Phone,
    globe: Globe,
};

interface PlatformIconProps {
    icon: string | null;
    className?: string;
}

export function PlatformIcon({ icon, className = "h-5 w-5" }: PlatformIconProps) {
    const IconComponent = icon ? iconMap[icon] : null;

    if (IconComponent) {
        return <IconComponent className={className} />;
    }

    return <Contact className={className} />;
}
