import React, { Fragment } from 'react';
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

function processBold(text: string): React.ReactNode[] {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    text.replace(boldRegex, (match, content, offset) => {
        if (lastIndex < offset) {
            elements.push(text.slice(lastIndex, offset));
        }
        elements.push(
            <strong key={offset} className="font-bold">
                {content}
            </strong>
        );
        lastIndex = offset + match.length;
        return match;
    });

    if (lastIndex < text.length) {
        elements.push(text.slice(lastIndex));
    }

    return elements;
}

function processBoldAndLinks(text: string): React.ReactNode[] {
    const boldNodes = processBold(text);
    const finalNodes: React.ReactNode[] = [];

    boldNodes.forEach((node, index) => {
        if (typeof node === 'string') {
            finalNodes.push(
                <Fragment key={`link-${index}`}>
                    {linkify(node)}
                </Fragment>
            );
        } else {
            finalNodes.push(node);
        }
    });

    return finalNodes;
}

export function formatBotResponse(text: string): React.ReactNode {
    const cleanedText = text.trim();

    return cleanedText.split('\n').map((line, idx) => {
        if (line.trim() === '') {
            return <div key={idx} className="h-1"></div>;
        }

        const isListItem = line.trim().startsWith('- ') || line.trim().startsWith('* ');
        const isCodeBlock = line.trim().startsWith('```');

        if (isCodeBlock) {
            return (
                <div key={idx} className="font-mono whitespace-pre-wrap text-sm my-1 p-2 bg-gray-100 rounded">
                    {line}
                </div>
            );
        }

        if (isListItem) {
            const content = line.trim().substring(2).trim();
            const processedContent = processBoldAndLinks(content);

            return (
                <ul key={idx} className="list-disc ml-5 my-1">
                    <li className="list-item">
                        {processedContent}
                    </li>
                </ul>
            );
        }

        const processedContent = processBoldAndLinks(line);

        return (
            <div key={idx} className="my-1">
                {processedContent}
            </div>
        );
    });
}