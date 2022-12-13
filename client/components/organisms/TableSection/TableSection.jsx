import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import Card from '../../atoms/Card/Card'
import TextPairing from '../../atoms/TextPairing/TextPairing';
import Table from '../../molecules/Table/Table';
import Row from '../../molecules/Table/Row';
import Cell from '../../molecules/Table/Cell';
import IconButton from '../../atoms/IconButton/IconButton';
import { primary } from '../../config/colors';

export default function TableSection({section, headers, data, onPressAdd, flexArray, style, navigation}) {

  return(
    <Card>
      <View style={styles.container}>
        <TextPairing text={section} type='semibold' size={32} style={{marginBottom: 8}} />
        <ScrollView
          horizontal
          contentContainerStyle={{width: '100%'}}
          showsHorizontalScrollIndicator={false} >

          <Table>
            <Row>
              { headers.map((header, key) => (
                <Cell key={key} value={header} header flex={flexArray[key]} />
              ))}
            </Row>
            { data.map((row, key) => (
              <Row key={key}>
                {row.map((cell, key) => (
                  <Cell key={key} value={cell} flex={flexArray[key]} />
                ))}
              </Row>
            ))}
          </Table>
        </ScrollView>
        <IconButton onPress={onPressAdd} iconName='add' type='full' color={primary.brand} size={24} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
});

TableSection.defaultProps = {
  onPressAdd: () => {},
};

TableSection.propTypes = {
  section: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onPressAdd: PropTypes.func
};
