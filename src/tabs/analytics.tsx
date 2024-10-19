import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Analytics = () => {
  return (
    <View style={Styles.container}>
      <Text>
        Analytics
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
});

export default Analytics;
