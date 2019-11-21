import { colors } from './Colors';

export const themes = {
    light: {
        // Navigation
        headerStyle: colors.purple,
        navActive: colors.purple,
        navInactive: colors.darkGray,

        // Scaffolding
        rootBackground: colors.white,
        blockView: colors.purple,
        refreshControlTint: colors.cardGray,

        // Cards
        cardBackground: colors.gray,
        cardContentBackground: colors.white,
        metaDataTypeText: colors.darkGray,
        metaDataText: colors.black,

        // Loading
        loadingPrimary: colors.cardGray,
        loadingSecondary: colors.white,
    },
    dark: {
        // Navigation
        headerStyle: colors.black,
        navActive: colors.white,
        navInactive: colors.darkGray,

        // Scaffolding
        rootBackground: colors.trueBlack,
        blockView: colors.black,
        refreshControlTint: colors.white,

        // Cards
        cardBackground: colors.black,
        cardContentBackground: colors.black,
        metaDataTypeText: colors.white,
        metaDataText: colors.white,

        // Loading
        loadingPrimary: colors.black,
        loadingSecondary: colors.loadingBlack,
    },
};

export default { themes };
