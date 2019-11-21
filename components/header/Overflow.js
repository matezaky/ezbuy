import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, opacities } from '../../constants/Index';

const Overflow = ({ navigation }) => (
    <TouchableOpacity
        activeOpacity={opacities.regular}
        style={{
            marginRight: 12,
        }}
        onPress={navigation.getParam('showActionSheet')}
    >
        <Ionicons name='ios-more' size={32} color={colors.white} />
    </TouchableOpacity>
);

export default Overflow;
