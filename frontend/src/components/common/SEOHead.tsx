import { Helmet } from 'react-helmet-async';
import { useSEO } from '../../contexts/SEOProvider';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    noindex?: boolean;
}

export const SEOHead = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    noindex,
}: SEOHeadProps) => {
    const { settings } = useSEO();

    if (!settings) return null;

    const pageTitle = title
        ? `${title} | ${settings.site_title}`
        : settings.site_title;
    const pageDescription = description || settings.site_description;
    const pageKeywords = keywords || settings.site_keywords;
    const pageImage = image || settings.og_image;
    const pageUrl = url
        ? `${settings.canonical_url_base}${url}`
        : settings.canonical_url_base;
    const shouldIndex = noindex === undefined ? settings.allow_indexing : !noindex;

    // Build Organization structured data
    const orgSchema = settings.structured_data_org?.name
        ? {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: settings.structured_data_org.name,
            url: settings.structured_data_org.url,
            logo: settings.structured_data_org.logo,
            sameAs: settings.structured_data_org.sameAs || [],
        }
        : null;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            {pageKeywords && <meta name="keywords" content={pageKeywords} />}

            {/* Robots */}
            <meta
                name="robots"
                content={shouldIndex ? 'index, follow' : 'noindex, nofollow'}
            />

            {/* Canonical URL */}
            {pageUrl && <link rel="canonical" href={pageUrl} />}

            {/* Open Graph */}
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:type" content={type} />
            {pageUrl && <meta property="og:url" content={pageUrl} />}
            {pageImage && <meta property="og:image" content={pageImage} />}
            <meta property="og:locale" content={settings.locale} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            {pageImage && <meta name="twitter:image" content={pageImage} />}
            {settings.twitter_handle && (
                <meta name="twitter:site" content={settings.twitter_handle} />
            )}

            {/* Verification Tags */}
            {settings.google_site_verification && (
                <meta
                    name="google-site-verification"
                    content={settings.google_site_verification}
                />
            )}
            {settings.bing_site_verification && (
                <meta
                    name="msvalidate.01"
                    content={settings.bing_site_verification}
                />
            )}

            {/* Structured Data */}
            {orgSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(orgSchema)}
                </script>
            )}
        </Helmet>
    );
};
