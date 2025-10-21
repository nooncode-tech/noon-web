import React from 'react';
import Link from 'next/link';

export function linkify(text: string): React.ReactNode[] {
    const urlRegex = /(https?:\/\/[^\s]+)|(\/prototype[^\s]*)/g;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    text.replace(urlRegex, (url, _g1, _g2, offset) => {
        if (lastIndex < offset) {
            elements.push(text.slice(lastIndex, offset));
        }
        const isInternal = url.startsWith('/prototype');
        const LinkComponent = isInternal ? Link : 'a';
        
        elements.push(
            <LinkComponent
                key={offset}
                href={url}
                className="underline text-blue-600"
                target='_blank'
                rel='noopener noreferrer'
                
            >
                {isInternal ? "Link" : url}
            </LinkComponent>
        );
        lastIndex = offset + url.length;
        return url;
    });

    if (lastIndex < text.length) {
        elements.push(text.slice(lastIndex));
    }

    return elements;
}

export function formatBotResponse(text: string): React.ReactNode {
    return text.split('\n').map((line, idx) => (
        <div key={idx}>{linkify(line)}</div>
    ));
}