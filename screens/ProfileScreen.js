import React from 'react'
import { Button, Text, View } from 'react-native';
import db from '../api.js'

class ProfileScreen extends React.Component {
	static navigationOptions = {
		headerTitle: "Profile",
	};
	logOut() {
		db.signOut()
		this.props.navigation.navigate('Landing');
	}
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Logout"
          onPress={() => this.logOut() }
        />
      </View>
    );
  }
}
export default ProfileScreen