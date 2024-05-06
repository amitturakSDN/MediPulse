import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { globalColors ,globalFonts } from '@/theme';


const TextR5 = ({
    bold, semiBold, light,
    style,
    ...props
}) => {

    // text font family
    const __textFontFamily = () => {
        if (bold) {
            return globalFonts.bold;
        } else if (semiBold) {
            return globalFonts.semiBold;
        } else if (light) {
            return globalFonts.light;
        }
        return globalFonts.regular;
    }

    return (
        <Text
            style={[styles.text, {
                fontFamily: __textFontFamily(),
            }, style]}
            {...props}
        >
            {props.children}
        </Text>
    )
}

export default TextR5;

const styles = StyleSheet.create({
    text: {
        color: globalColors.white,
    },
});
