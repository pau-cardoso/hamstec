import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import TextPairing from '../../atoms/TextPairing/TextPairing';
import IconButton from '../../atoms/IconButton/IconButton'
import { neutral, primary } from '../../config/colors';
import { moderateScale } from '../../config/utils';

export default function PageHeader({ title, secondaryTitle, onPressBackButton, onRightButtonClick, rightButtonIcon, style }) {
  return(
    <SafeAreaView>
      <View style={[styles.container, style]}>
        <View style={styles.leftContainer}>
          { onPressBackButton &&
          <View style={styles.backButtonContainer}>
            <IconButton
              onPress={onPressBackButton}
              iconName='arrow-back'
              size={40}
              color={neutral.s900}
            />
          </View>
          }
          <View style={styles.textContainer}>
            <TextPairing
              text={title}
              type='semibold'
              color='s900'
              size={32} />
            <TextPairing
              style={{marginLeft: moderateScale(12)}}
              text={secondaryTitle}
              type='medium'
              color='s400'
              size={32} />
          </View>
        </View>
        { onRightButtonClick &&
            <IconButton
              iconName={rightButtonIcon}
              size={40}
              color={primary.brand}
              onPress={onRightButtonClick} />
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
	leftContainer: {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'row',
  },
  backButtonContainer: {
	  marginRight: moderateScale(12),
  },
  textContainer: {
    flexDirection: 'row',
  },
});


PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onPressBackButton: PropTypes.func,
  onRightButtonClick: PropTypes.func,
  rightButtonIcon: PropTypes.string,
};
