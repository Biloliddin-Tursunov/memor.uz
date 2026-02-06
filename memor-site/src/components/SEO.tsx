
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    type?: string;
    lang?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description = "Me'mor — O‘zbek memorchiligi, arxitektura va naqsh san’ati platformasi.",
    image = "/og/cover-main.jpg",
    type = "website",
    lang
}) => {
    const location = useLocation();
    const siteUrl = "https://memor.uz";

    // Construct canonical URL
    // Remove trailing slash if present on pathname, unless it's root
    const pathname = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
    const canonicalUrl = `${siteUrl}${pathname}`;

    // Default title template
    const siteTitle = "Me'mor";
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

    // Current language determination (fallback to 'uz' if not provided)
    const currentLang = lang || (location.pathname.startsWith('/en') ? 'en' :
        location.pathname.startsWith('/ru') ? 'ru' :
            location.pathname.startsWith('/tr') ? 'tr' : 'uz');

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
            <html lang={currentLang} />

            {/* Open Graph / Social Media */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
            <meta property="og:locale" content={currentLang === 'en' ? 'en_US' : currentLang === 'ru' ? 'ru_RU' : currentLang === 'tr' ? 'tr_TR' : 'uz_UZ'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
        </Helmet>
    );
};

export default SEO;
