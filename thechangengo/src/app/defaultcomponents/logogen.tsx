// app/components/DynamicTextLogo.tsx
import React from 'react';

interface DynamicTextLogoProps {
    text: string;
    ratio?: '1:1' | '1:2';
    bgColor?: string; // Optional background color
}

export default function DynamicTextLogo({
    text,
    ratio = '1:1',
    bgColor = '#6C63FF' // Default purple-ish
}: DynamicTextLogoProps) {
    const aspectRatioClass = ratio === '1:1' ? 'w-20 h-20' : 'w-40 h-20';

    return (
        <div
            className={`flex items-center justify-center rounded-md text-white font-bold text-2xl ${aspectRatioClass}`}
            style={{ backgroundColor: bgColor }}
        >
            {text}
        </div>
    );
}
