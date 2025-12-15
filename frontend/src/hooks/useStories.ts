import { useQuery } from '@tanstack/react-query';
import { storyService } from '../services/storyService';

export const useStories = (filters: any) => {
    return useQuery({
        queryKey: ['stories', filters],
        queryFn: () => storyService.getAll(filters),
        staleTime: 5 * 60 * 1000,
    });
};

export const useStory = (slug: string | undefined) => {
    return useQuery({
        queryKey: ['story', slug],
        queryFn: () => storyService.getBySlug(slug!),
        enabled: !!slug,
    });
};
