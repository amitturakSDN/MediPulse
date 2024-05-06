import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalColors } from '@/theme';

const ViewCrv = ({ style, ...props }) => {
    return (
        <View
            style={[styles.container, style]}
        >
            {props.children}
        </View>
    )
}

export default memo(ViewCrv);

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#F8F8F8',
        flex: 1,
        overflow: 'hidden',
    },
});
