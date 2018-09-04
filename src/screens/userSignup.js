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
import { View, Text, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
//import TitledInput from './TitledInput';
//import Spinner from './Spinner';

export class SignupForm extends PureComponent {
		constructor(props) {
			super(props);

	    this.state = {user:null, fullName: '', email: '', password: '', phone: '', address: '', city: '', state: 'TN', zip: '', error: '', loading: false };
			this.onSignupPress = this.onSignupPress.bind(this);
		}
    onSignupPress() {
        this.setState({ error: '', loading: true });

        const { email, password } = this.state;
				var _that = this;
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
          .then((user) => {
						//_that.setState({ error: '', loading: false });
		 				 if(typeof _that.props.onSuccess === "function"){
		 					 _that.props.onSuccess(user,{fullName:_that.state.fullName,phone:_that.state.phone,address:_that.state.address,city:_that.state.city,state:_that.state.state,zip:_that.state.zip});
		 				 }
					})
          .catch((err) => {
						console.error(err);
            //_that.setState({ error: 'Signup failed.', loading: false });
          });
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
								<Text>Let's Register</Text>
								<Text>This is the information SoSA will use to get in touch with you.</Text>
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='First Last'
                    value={this.state.fullName}
                    onChangeText={fullName => this.setState({ fullName })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='you@email.com'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='password'
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='555-555-1212'
                    value={this.state.phone}
                    onChangeText={phone => this.setState({ phone })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='123 MyStreet St.'
                    value={this.state.address}
                    onChangeText={address => this.setState({ address })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='Hendersonville'
                    value={this.state.city}
                    onChangeText={city => this.setState({ city })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='TN'
                    value={this.state.state}
                    onChangeText={state => this.setState({ state })}
                />
                <TextInput
										style={styles.whiteTextBtn}
										placeholderTextColor="#a0a0a0"
										selectionColor="#c0c0c0"
                    placeholder='76201'
                    value={this.state.zip}
                    onChangeText={zip => this.setState({ zip })}
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
