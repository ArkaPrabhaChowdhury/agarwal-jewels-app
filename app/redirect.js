import { useFocusEffect } from "expo-router";
import React from "react";
import { View } from "react-native-ui-lib";
import * as Linking from "expo-linking";
const RedirectPage = () => {
    useFocusEffect(
        React.useCallback(() => {
            Linking.openURL("agarwaljewelsapp://dashboard");
        }, [])
    )
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Redirecting to app...
    </View>
  );
};

export default RedirectPage;
