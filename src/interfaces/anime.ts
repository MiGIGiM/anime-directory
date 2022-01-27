export interface Anime {
    createdAt: string;
    updatedAt: string;
    slug: string;
    synopsis: string;
    coverImageTopOffset: number;
    titles: {
        en: string;
        en_jp: string;
        ja_jp: string;
    };
    canonicalTitle: string;
    abbreviatedTitles: string[];
    averageRating: number;
    ratingFrequencies: {
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        13: string;
        14: string;
        15: string;
        16: string;
        17: string;
        18: string;
        19: string;
        20: string;
    };
    userCount: number;
    favoritesCount: number;
    startDate: string;
    endDate: string;
    popularityRank: number;
    ratingRank: number;
    ageRating: string;
    ageRatingGuide: string;
    subtype: string;
    status: string;
    tba: string;
    posterImage: {
        tiny: string;
        small: string;
        medium: string;
        large: string;
        original: string;
        meta: {
            dimensions: {
                tiny: {
                    width: number;
                    height: number;
                };
                small: {
                    width: number;
                    height: number;
                };
                large: {
                    width: number;
                    height: number;
                };
            };
        };
    };
    coverImage: {
        tiny: string;
        small: string;
        medium: string;
        large: string;
        original: string;
        meta: {
            dimensions: {
                tiny: {
                    width: number;
                    height: number;
                };
                small: {
                    width: number;
                    height: number;
                };
                large: {
                    width: number;
                    height: number;
                };
            };
        };
    };
    episodeCount: number;
    episodeLength: number;
    youtubeVideoId: string;
    showType: string;
    nsfw: boolean;
}
