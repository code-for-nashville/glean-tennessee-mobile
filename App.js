/** @license
 *@version 1.0.0
 *<p>
 * Main app file
 * </p>
 *<p>
 MIT License

 Copyright (c) 2018 Stephen Killingsworth

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 *</p>
 */


import React,{Component} from 'react';
import {
	StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  View,
	ActivityIndicator,
	AppRegistry,
	AppState
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
/*import {
	List,
	ListItem,
	FormLabel,
	FormInput,
	FormValidationMessage
} from 'react-native-elements';
*/

import {LoginForm} from './src/screens/userLogin';
import {GleanRequestForm} from './src/screens/gleanRequestForm'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c3dfd9',
  },
  userLoginContainer: {
		marginTop:20,
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c3dfd9',
  },
	logoDisplay: {
		flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
	},
  buttonContainer: {
    margin: 20
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#FFFFFF',
  },
});

//https://medium.com/differential/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8
var fileList= [];
var numStudies = 0;


class GleanTNLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
			ready:false,
			user: null,
			loadingFirebase: true,
			tempFileKey: null,
			internetConnection:true
    };
  }

	resetInitialState() {
	}

	// Code that can be executed when the app goes to the background
	handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
    }
  }

	componentWillMount() {
		StatusBar.setHidden(false);
    //AppState.addEventListener('change', this.handleAppStateChange);
	}

	 componentDidMount() {
			 //this.setState({ user:user,loading:false});
			 var _that = this;
			 this.setupLoginHandler();
	 }

   componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
   }

	 setupLoginHandler() {
		 /*NetInfo.getConnectionInfo().then((connectionInfo) => {
			 if(connectionInfo.type !== "none")
			 {*/
				 // then try to use firebase auth
				 this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
					 var isError = true;
					 if(user)
					 {
						 if(typeof user === "object")
						 {
							 if(typeof user.uid === "string")
							 {
								 isError = false;
							 	 this.setState({user:user,loadingFirebase:false});
							 }
						 }
					 }
					 else
						this.setState({user:user,loadingFirebase:false});
					 /*if(isError)
					 	console.error("User data not found after login:",user);*/
				 });
		 //});
	 }

	_renderLoadingIndicator(textParam) {
		return (
			<View>
				<Text style={{fontSize:24,marginBottom:10}}>{textParam}</Text>
				<ActivityIndicator size="large" color="#ffffff" />
			</View>
		)
	}

	_renderLogin() {
		if(!this.state.user)
		{
			var _that = this;
			function _handleUserLogin(userRecord) {
				_that.setState({user:userRecord});
				// show spinner
			}

			if(this.state.loadingFirebase === true)
			{
				return this._renderLoadingIndicator("...connecting to service...");
			}
			else
			{
				return (
						<LoginForm
							successCallback={_handleUserLogin}
						/>
				);
			}
		}
	}


	_renderUserHome() {
		var _that = this;

		function _handleLogout() {
			firebase.auth().signOut()
			.then(() => {
				_that.resetInitialState();
			})
			.catch((err) => {
				console.error(err);
			});
		}

		return (
			<GleanRequestForm />
		);
	}

	_renderLogo() {
		return null;
	}

	_renderBottomContent() {
		return null;
	}

  render() {
		if(!this.state.user)
		{
			return(
				<View style={[styles.userLoginContainer]}>
					{this._renderLogo()}
					{this._renderLogin()}
					{this._renderBottomContent()}
				</View>
			);
		}
		else  // we have an authenticated user
		{
			return this._renderUserHome();
		}
  }
}

//export default PRIDeploy;

const GleanTennessee = StackNavigator({
  Login: {
    screen: GleanTNLogin,
  },
},
{
	headerMode: "none",
	navigationOptions: {
    headerVisible: false
  }
});

export default GleanTennessee;
AppRegistry.registerComponent('GleanTennessee',()=>GleanTennessee);
