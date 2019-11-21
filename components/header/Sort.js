import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, opacities } from '../../constants/Index';

const Sort = () => (
    <TouchableOpacity
        activeOpacity={opacities.regular}
        style={{
            marginRight: parseInt(spacing.tiny, 10),
            marginBottom: 2,
        }}
    >
        <MaterialIcons name='sort' size={30} color={colors.white} />
    </TouchableOpacity>
);

export default Sort;
