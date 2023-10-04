import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'expo-checkbox';

const CustomCheckbox = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Checkbox value={value} onValueChange={onValueChange} />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </View>
  );
};

const styles = {
  checkboxContainer: {
    with: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 12,
  },
};

export default CustomCheckbox;
