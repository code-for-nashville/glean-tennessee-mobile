/** @license
 *@version 1.0.0
 *<p>
 * Sends notifications from users to organization personnel
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
import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {Button,FormLabel,FormInput} from 'react-native-elements';
import firebase from 'react-native-firebase';
//import TitledInput from './TitledInput';
//import Spinner from './Spinner';

const sgAPIKey = "<<INSERT YOUR API KEY HERE>>";

function _getEmailContent(params) {
	// some kind of input cleaning probably needed here
	return "<p><b>Request from: "+params.name+"<b><br/> \
		<b>Items</b>: "+(params.items||"not specified")+"<br/>\
		<b>Location</b>: "+(params.location||"not specified");
}

function _onSendRequest() {
	var msgBody = {
		personalizations: [{
      to: [
        {
          email: "stephenkillingsworth@gmail.com"
        }
      ],
      subject: "__=GLEANINING REQUEST=__"
    }],
	  from: {
	    email: this.props.userRecord.email
	  },
	  content: [{
      type: "text/html",
     	value: _getEmailContent({name:this.props.userRecord.fullName,items:this.state.itemsText,location:this.state.locationText})
    }]
	};

	if(typeof this.props.onSendRequest === "function") {
		this.props.onSendRequest({description: this.state.itemsText,location:this.state.locationText});
	}

	var _that = this;
	fetch('https://api.sendgrid.com/v3/mail/send', {
	  method: 'POST',
	  headers: {
			'Authorization': 'Bearer ' + sgAPIKey,
			'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(msgBody),
	}).then((response) => {
	  _that.setState({sgResponse: JSON.stringify(response),isSending:false});

	});
}

const styles = {
		buttonStandard: {
			marginTop: 30,
			backgroundColor: "#efefef",
			borderColor: "#2a5188",
			borderWidth: 1,
		},
		textEntry: {
			fontSize: 18,
			color: "#ffffff",
			marginBottom: 10
		},
		centeredForm: {
	    flex: 2,
	    flexDirection: 'column',
			justifyContent: 'center',
	    alignItems: 'center',
		},
    errorTextStyle: {
        color: '#E64A19',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }
};
export class GleanRequestForm extends Component {
		constructor(props) {
			super(props);
			this.state = {
				messageInfo: {
					itemsText:"",
					locationText:""
				},
				isSending:false,
				sgResponse:null
			};
			_onSendRequest = _onSendRequest.bind(this);
		}

    /*renderButtonOrSpinner() {
        if (this.state.loading) {
            return ;//<Spinner />;
        }
    }*/
		setMessageInfo = (newProperty) => {
			this.setState(messageInfo:{...this.state.messageInfo,...newProperty})
		}
		_renderResultView() {
			<View style={styles.centeredForm}>
				<Text>Sendgrid result</Text>
				<Text>{this.state.sgResponse}</Text>
			</View>
		}
		_renderLoadingIndicator(textParam) {
			return (
				<View>
					<Text style={{fontSize:24,marginBottom:10}}>{textParam}</Text>
					<ActivityIndicator size="large" color="#ffffff" />
				</View>
			)
		}
		_renderSendForm() {
			return (
				<View style={styles.centeredForm}>
					<Text>Welcome, {this.props.userRecord.fullName}</Text>
					<FormLabel>Items</FormLabel>
					<FormInput
							style={styles.textEntry}
							placeholder="Items for pickup"
							multiline = {true}
							numberOfLines = {4}
							value={this.state.itemsText}
							onChangeText={itemsText => {this.setMessageInfo({itemsText})}} />
					<FormLabel>Location</FormLabel>
					<FormInput
							style={styles.textEntry}
							placeholder="Location"
							multiline = {true}
							numberOfLines = {2}
							value={this.state.locationText}
							onChangeText={locationText => {this.setMessageInfo({locationText})}}/>
						<Button
							large
							buttonStyle={styles.buttonStandard}
							textStyle={{color:"#3a6db5"}}
							onPress={_onSendRequest} title="Send Request"
							/>
				</View>
			);
		}
    render() {
			if(!this.state.sgResponse)
			{
				if(this.state.isSending) {
					return this._renderLoadingIndicator("sending message");
				}
				else {
      		return this._renderSendForm();
				}
			}
			else {
				return this._renderResultView();
			}
		}
}
