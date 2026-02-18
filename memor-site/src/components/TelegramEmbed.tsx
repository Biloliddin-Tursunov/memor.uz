import React, { useEffect, useRef } from 'react';

interface TelegramEmbedProps {
    postUrl: string;
    width?: string;
    userpic?: boolean;
}

const TelegramEmbed: React.FC<TelegramEmbedProps> = ({ postUrl, width = '100%', userpic = true }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear previous content to prevent duplicates on re-renders
        containerRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-post', postUrl.replace('https://t.me/', ''));
        script.setAttribute('data-width', width);
        if (!userpic) {
            script.setAttribute('data-userpic', 'false');
        }
        script.async = true;

        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [postUrl, width, userpic]);

    return (
        <div
            ref={containerRef}
            className="flex justify-center w-full my-4"
        />
    );
};

export default TelegramEmbed;
