/** @license
 *@version 1.0.0
 *<p>
 * User login component
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

import React, { PureComponent } from 'react';
import { View, Text, TextInput, Checkbox} from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
//import TitledInput from './TitledInput';
//import Spinner from './Spinner';

export class SignupForm extends PureComponent {
		constructor(props) {
			super(props);

	    this.state = {
				userInfo: {
					fullName: '',
					email: '',
					password: '',
					phone: '',
					address: '',
					city: '',
					state: 'TN',
					zip: '',
					organicProduce:false
				},
				error: '',
				loading: false
			};
		}
    onSignupPress = () => {
      this.setState({ error: '', loading: true });

      const { email, password } = this.state.userInfo;
			var _that = this;
      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
        .then((user) => {
					//_that.setState({ error: '', loading: false });
	 				 if(typeof _that.props.onSuccess === "function"){
	 					 _that.props.onSuccess(user,_that.state.userInfo);
	 				 }
				})
        .catch((err) => {
					console.error(err);
          //_that.setState({ error: 'Signup failed.', loading: false });
        });
    }
		setUserInfo = (newProperty) => {
			this.setState(userInfo:{...this.state.userInfo,...newProperty})
		}
    renderButtonOrSpinner() {
        if (this.state.loading) {
            return ;//<Spinner />;
        }
        return ( <Button
					large
					buttonStyle={styles.buttonStandard}
					textStyle={{color:"#3a6db5"}}
					onPress={this.onSignupPress.bind(this)} title="Submit"
					/>
				);
    }
    render() {
        return (
            <View style={{
			        flex: 2,
			        flexDirection: 'column',
			        justifyContent: 'center',
			        alignItems: 'center',
			      }}>
								<Text>Register</Text>
								<Text>This is the information SoSA will use to get in touch with
								you and coordinate pickup.</Text>
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='First Last'
                    value={this.state.userInfo.fullName}
                    onChangeText={fullName => this.setUserInfo({ fullName })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='you@email.com'
                    value={this.state.userInfo.email}
                    onChangeText={email => this.setUserInfo({ email })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='password'
                    secureTextEntry
                    value={this.state.userInfo.password}
                    onChangeText={password => this.setUserInfo({ password })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='555-555-1212'
                    value={this.state.userInfo.phone}
                    onChangeText={phone => this.setUserInfo({ phone })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='123 MyStreet St.'
                    value={this.state.userInfo.address}
                    onChangeText={address => this.setUserInfo({ address })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='Hendersonville'
                    value={this.state.userInfo.city}
                    onChangeText={city => this.setUserInfo({ city })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='TN'
                    value={this.state.userInfo.state}
                    onChangeText={state => this.setUserInfo({ state })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='76201'
                    value={this.state.userInfo.zip}
                    onChangeText={zip => this.setUserInfo({ zip })}
                />
								<Checkbox
									style={}
									value={this.state.userInfo.organicProduce}
								/>
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                {this.renderButtonOrSpinner()}
								<Text className="sign-up-offer">Login instead?</Text>
								<Text className="fakelink" onPress={() => {this.props.onLoginPress()}}>
								  Log In
								</Text>
            </View>
        );
    }
}

const styles = {
		buttonStandard: {
			backgroundColor: "#efefef",
			borderColor: "#2a5188",
			borderWidth: 1,
		},
		whiteTextBtn: {
			height: 44,
			width: 400,
			fontSize: 24,
			color: "#ffffff",
			textAlign: "center"
		},
    errorTextStyle: {
      color: '#E64A19',
      alignSelf: 'center',
			fontSize: 24,
      paddingTop: 10,
      paddingBottom: 10
    }
};
