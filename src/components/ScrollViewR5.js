import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, RefreshControl} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import { globalColors } from '@/theme';
import ViewCrv from './ViewCrv';

export const ScrollViewR5 = React.forwardRef((props, ref) => {
  let renderHeader = props.renderHeader;
  let headerStyle = props.headerStyle;
  let bodyStyle = props.bodyStyle;

  const [refreshLoader, setrefreshLoader] = useState(false);

  const __srollToRefresh = () => {
    if (!props?.onRefresh) return;
    props?.onRefresh() || console.log();
    setrefreshLoader(true);
    setTimeout(() => {
      setrefreshLoader(true);
    }, 15000);
  };

  return (
    <View style={[styles.container, headerStyle]}>
      <SafeAreaView style={styles.safeContainer}>
        <KeyboardAwareScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContainer}
          style={{
            margin: 0,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshLoader}
              onRefresh={__srollToRefresh}
            />
          }>
          {/* top header */}
          {renderHeader()}

          {/* body */}
          <ViewCrv style={bodyStyle}>
            {/* body content */}
            {props.children}
          </ViewCrv>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
});

export default ScrollViewR5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.black,
  },
  safeContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
