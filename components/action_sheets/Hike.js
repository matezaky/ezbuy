import { ActionSheetIOS } from 'react-native';

const SHEET_ITEMS = ['Get Directions', 'Cancel'];
const SHEET_CANCEL_INDEX = 1;

export function hikeActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: SHEET_ITEMS,
            cancelButtonIndex: SHEET_CANCEL_INDEX,
        },

        (buttonIndex) => {
            if (buttonIndex === 0) {
                this.navigationToHike();
            }
        },
    );
}

export default { hikeActionSheet };
