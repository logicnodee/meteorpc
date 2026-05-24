import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconMapperProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export default function IconMapper({ name, size = 24, color = 'currentColor', className = '' }: IconMapperProps) {
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    // Fallback if icon not found
    const Fallback = LucideIcons.HelpCircle;
    return <Fallback size={size} color={color} className={className} />;
  }

  return <IconComponent size={size} color={color} className={className} />;
}
