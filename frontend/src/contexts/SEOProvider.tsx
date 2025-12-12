import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { seoService, type SeoSettings } from '../services/seoService';

interface SEOContextType {
    settings: SeoSettings | null;
    loading: boolean;
    error: string | null;
}

const defaultSettings: SeoSettings = {
    site_title: 'BANCAT',
    site_description: '',
    site_keywords: '',
    og_image: '',
    twitter_handle: '',
    google_site_verification: '',
    bing_site_verification: '',
    google_analytics_id: '',
    google_tag_manager_id: '',
    facebook_pixel_id: '',
    robots_txt_content: '',
    structured_data_org: { name: '', url: '', logo: '', sameAs: [] },
    canonical_url_base: '',
    locale: 'en_US',
    allow_indexing: true,
};

const SEOContext = createContext<SEOContextType>({
    settings: defaultSettings,
    loading: true,
    error: null,
});

export const useSEO = () => useContext(SEOContext);

interface SEOProviderProps {
    children: ReactNode;
}

export const SEOProvider = ({ children }: SEOProviderProps) => {
    const [settings, setSettings] = useState<SeoSettings | null>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await seoService.getSettings();
                setSettings(data);

                // Inject analytics scripts
                if (data.google_analytics_id) {
                    injectGoogleAnalytics(data.google_analytics_id);
                }
                if (data.google_tag_manager_id) {
                    injectGoogleTagManager(data.google_tag_manager_id);
                }
                if (data.facebook_pixel_id) {
                    injectFacebookPixel(data.facebook_pixel_id);
                }
            } catch (err) {
                console.error('Failed to fetch SEO settings:', err);
                setError('Failed to load SEO settings');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return (
        <SEOContext.Provider value={{ settings, loading, error }}>
            {children}
        </SEOContext.Provider>
    );
};

// Analytics script injection helpers
function injectGoogleAnalytics(id: string) {
    if (!id || document.getElementById('ga-script')) return;

    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}');
    `;
    document.head.appendChild(inlineScript);
}

function injectGoogleTagManager(id: string) {
    if (!id || document.getElementById('gtm-script')) return;

    const script = document.createElement('script');
    script.id = 'gtm-script';
    script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${id}');
    `;
    document.head.appendChild(script);
}

function injectFacebookPixel(id: string) {
    if (!id || document.getElementById('fb-pixel-script')) return;

    const script = document.createElement('script');
    script.id = 'fb-pixel-script';
    script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${id}');
        fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
}
