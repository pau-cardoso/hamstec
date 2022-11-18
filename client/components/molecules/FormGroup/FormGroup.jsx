import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Button from '../../atoms/Button/Button'

export default function FormGroup({ children, onPressSave, style }) {
  const arrayChildren = React.Children.toArray(children);

  return(
    <View style={style}>
      <View style={styles.container} >
        { React.Children.map(arrayChildren, (child) => {
          return (
            <View style={styles.child}>
              { child }
            </View>)
        }) }
      </View>
      <View style={styles.btn}>
        <Button title='Guardar' onPress={onPressSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 8,
  },
  child: {
    width: '100%',
    marginBottom: 12,
  },
  btn: {
    marginTop: 10,
  },
});

FormGroup.propTypes = {
  onPressSave: PropTypes.func.isRequired,
};
