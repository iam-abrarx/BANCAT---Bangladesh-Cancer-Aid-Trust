import { useQuery } from '@tanstack/react-query';
import { programService } from '../services/programService';
import { campaignService } from '../services/campaignService';

export const usePrograms = () => {
    return useQuery({
        queryKey: ['programs'],
        queryFn: programService.getAll,
    });
};

export const useProgram = (slug: string | undefined) => {
    return useQuery({
        queryKey: ['program', slug],
        queryFn: () => programService.getBySlug(slug!),
        enabled: !!slug,
    });
};

export const useCampaigns = (params?: { featured?: boolean }) => {
    return useQuery({
        queryKey: ['campaigns', params],
        queryFn: () => campaignService.getAll(params),
    });
};

export const useCampaign = (slug: string | undefined) => {
    return useQuery({
        queryKey: ['campaign', slug],
        queryFn: () => campaignService.getBySlug(slug!),
        enabled: !!slug,
    });
};
