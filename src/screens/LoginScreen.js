import React, {Component, PropTypes} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    PixelRatio,
    TextInput,
    ActionSheetIOS,
    Alert,
    NativeModules
} from 'react-native';
import { connect } from 'react-redux';
import * as authActions from '../reducers/auth/actions';

import * as appActions from '../reducers/app/actions';
var Icon = require('react-native-vector-icons/FontAwesome');

class LoginScreen extends Component {

    static propTypes = {
        str: PropTypes.string.isRequired,
        obj: PropTypes.object.isRequired,
        num: PropTypes.number.isRequired
    };
    constructor(props) {
        super(props);
        console.log(props);
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.loginArea}>
                    <View style={styles.loginRow}>
                        <TouchableOpacity
                            style={styles.Label}
                            onPress={this.selectZone.bind(this)}
                        >
                            <Text style={styles.labelTxt}>{this.props.auth.zone}</Text>
                            <View style={styles.arrowDown}>
                                <Icon name="angle-down" size={14} color="#cfcfcf" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.inputArea}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(mobile) => this.props.dispatch(authActions.inputValueChanged("mobile",mobile))}
                                placeholder="手机号"
                                value={this.props.auth.mobile}
                            />
                        </View>
                        <View style={styles.sendCaptchArea}>
                            <TouchableOpacity style={styles.sendCaptchBtn} onPress={this.sendCaptcha.bind(this)}>
                                <Text style={styles.sendCaptchTxt}>获取验证码</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.loginRow}>
                        <View style={styles.Label}>
                            <Text style={styles.labelTxt}>验证码</Text>
                        </View>
                        <View style={styles.inputArea}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(captcha) => this.props.dispatch(authActions.inputValueChanged("captcha",captcha))}
                                placeholder="验证码"
                                value={this.props.auth.captcha}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.loginBtnArea}>
                    <TouchableOpacity style={styles.loginBtnBtn} onPress={this.verifyCaptcha.bind(this)}>
                        <Text style={styles.loginBtnTxt}>下一步</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    is_mobile(str) {
        return /^1[3|4|5|7|8][0-9]\d{8}$/.test(str);
    }
    getZone(){
        let zone = this.props.auth.zone;
        zone = zone.replace("+","").replace(" ","").replace(" ","");
        return zone;
    }
    selectZone(){
        ActionSheetIOS.showActionSheetWithOptions({
                options: this.props.auth.zones,
                cancelButtonIndex: 2
            },
            (buttonIndex) => {
                if(buttonIndex < 2){
                    let zone = this.props.auth.zones[buttonIndex];
                    zone = "+ "+zone.split("+")[1];
                    this.props.dispatch(authActions.inputValueChanged("zone",zone))
                }
            });
    }
    sendCaptcha(){
        if(!this.is_mobile(this.props.auth.mobile)){ return Alert.alert("手机号不合法" );}
        //this.context.showProgressHUD();
        NativeModules.SMSLogin.sendCaptcha(this.props.auth.mobile, this.getZone(), (response)=> {
            console.log("sendCaptcha In Callback",response);
            //this.context.dismissProgressHUD();
            if(response.error == 0){
                return Alert.alert("验证码发送成功");
            }else{
                // 477 当前手机号发送短信的数量超过当天限额
                return Alert.alert(
                    response.result.getVerificationCode
                );
            }
        });
    }
    verifyCaptcha(){
        return this.props.dispatch(appActions.login({user_id:1,mobile:"18666666666"}));
        if(!this.is_mobile(this.props.auth.mobile))
            return Alert.alert("手机号不合法");

        if(this.props.auth.captcha.length != 4)
            return Alert.alert( "验证码须为4位");

        //this.context.showProgressHUD();
        NativeModules.SMSLogin.verifyCaptcha(this.props.auth.captcha,this.props.auth.mobile, this.getZone(), (response) => {
            //this.context.dismissProgressHUD();
            console.log("sendCaptcha In Callback",response);
            if(response.error == 0){
                //this.context.store.setAuthUserInfo(response.result.user_info);
                //Alert.alert(
                //    "登陆成功"
                //);
                //this.props.tabNav.pop();
                this.props.dispatch(appActions.login(response.result.user_info));
            }else{
                return Alert.alert(response.result);
            }
        });
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
    },
    button: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        color: 'blue'
    },
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    loginArea:{
        backgroundColor: "#fff",
        height:88,
        marginTop:10,
        borderColor:"#d6d6d6",
        borderBottomWidth:1 / PixelRatio.get(),
        borderTopWidth:1 / PixelRatio.get(),
        flexDirection:"column"
    },
    loginRow:{
        height:44,
        marginLeft:16,
        borderColor:"#d6d6d6",
        borderBottomWidth:1 / PixelRatio.get(),
        flexDirection:"row",
        alignItems: 'center',
    },
    labelTxt:{
        fontSize:14,
        marginRight:5
    },
    Label:{
        flexDirection:"row",
        width:44
    },
    arrowDown:{
        alignSelf: 'flex-end',
    },
    inputArea:{
        backgroundColor: "#fff",
        marginLeft:16,
        width:120
    },
    input:{
        flex:1,
        height:40,
        fontSize: 14,
        color: '#000',
    },
    sendCaptchArea:{
        position:"absolute",
        right:16,
        top:8,
        bottom:0,
        alignItems: 'center',

    },
    sendCaptchBtn:{
        borderColor:"#bebebe",
        borderWidth:1 / PixelRatio.get(),
        paddingLeft:15,
        paddingRight:15,
        borderRadius:5
    },
    sendCaptchTxt:{
        fontSize:12,
        marginTop:6,
        marginBottom:6
    },
    loginBtnArea:{
        marginTop:16,
        height:38,
        marginBottom:16
    },
    loginBtnBtn:{
        flex:1,
        justifyContent:"center",
        alignItems: 'center',
        marginLeft:16,
        marginRight:16,
        borderRadius:5,
        backgroundColor: "#518edf",
    },
    loginBtnTxt:{
        color:"white",
        fontSize:16
    }

});
function mapStateToProps(state) {
    return {
        auth:state.auth
    };
}
export default connect(mapStateToProps)(LoginScreen);