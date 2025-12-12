import { describe, it, expect } from 'vitest';
import i18n from './i18n/config';

describe('i18n Functionality', () => {
    it('initializes with default language', () => {
        expect(i18n.language).toMatch(/^en/);
    });

    it('translates text', () => {
        i18n.addResourceBundle('en', 'translation', { test_key: 'Hello World' });
        expect(i18n.t('test_key')).toBe('Hello World');
    });

    it('changes language', async () => {
        i18n.addResourceBundle('bn', 'translation', { test_key: 'ওহে বিশ্ব' });

        await i18n.changeLanguage('bn');
        expect(i18n.language).toBe('bn');
        expect(i18n.t('test_key')).toBe('ওহে বিশ্ব');

        await i18n.changeLanguage('en'); // Reset
    });
});
