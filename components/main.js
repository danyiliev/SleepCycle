import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Picker,
  Text,
  ActivityIndicator
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { isEmpty } from 'lodash';

import { changeUser } from '../reducers/sleepcycle';

import { userList } from '../config';

import Interval from './Interval';

const styles = {
  picker: {
    borderBottomWidth: 1,
    borderColor: '#878787'
  }
};

class Main extends React.Component {
  componentWillMount() {
    const { userId, changeUser } = this.props;
    if (!isEmpty(userId)) {
      changeUser(userId);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (isEmpty(this.props.error) && !isEmpty(nextProps.error)) {
      Toast.show('Error Occured', Toast.LONG);
    }
  }
  render() {
    const { userId, loading, sleepData, changeUser } = this.props;
    return (
      <ScrollView>
        <Picker
          selectedValue={userId}
          onValueChange={itemValue => {
            changeUser(itemValue);
          }}
          style={styles.picker}
        >
          {userList.map(val => (
            <Picker.Item
              key={`user_${val.userId}`}
              label={val.name}
              value={val.userId}
            />
          ))}
        </Picker>
        {!loading &&
          isEmpty(sleepData) && (
            <View>
              <Text>Please select a user</Text>
            </View>
          )}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {!loading &&
          !isEmpty(sleepData) && (
            <View>
              {sleepData.map(val => (
                <Interval key={`interval_${val.id}`} interval={val} />
              ))}
            </View>
          )}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({
  appstate: { loading, error },
  sleepcycle: { userId, sleepData }
}) => ({
  loading,
  error,
  userId,
  sleepData
});

const mapDispatchToProps = {
  changeUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
