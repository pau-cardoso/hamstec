import React from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../../atoms/IconButton/IconButton';
import { neutral, primary } from '../../config/colors';

export default function BottomNavigation({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;

          case 'Proyectos':
            iconName = 'list';
            break;

          default:
            iconName = 'home';
            break;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <IconButton
            key={index}
            onPress={onPress }
            iconName={iconName}
            color={isFocused ? primary.brand : neutral.s300}
            type={isFocused? 'contained' : 'default'} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 50,
  },
});