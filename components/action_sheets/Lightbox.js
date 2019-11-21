import { ActionSheetIOS } from 'react-native';

const SHEET_ITEMS = ['Image Attribution', 'Cancel'];
const SHEET_CANCEL_INDEX = 1;

export function lightboxActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: SHEET_ITEMS,
            cancelButtonIndex: SHEET_CANCEL_INDEX,
        },

        (buttonIndex) => {
            if (buttonIndex === 0) {
                this.showAttributionAlert();
            }
        },
    );
}

export default { lightboxActionSheet };
