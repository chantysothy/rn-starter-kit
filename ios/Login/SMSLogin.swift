//
//  SMSLogin.swift
//  PtApp
//
//  Created by Joseph on 16/5/23.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import Alamofire

@objc(SMSLogin)
class SMSLogin: NSObject {
  var bridge: RCTBridge!  // this is synthesized
  @objc func sendCaptcha(mobile: String, zone: String, callback: (NSObject) -> () ) -> Void {
    //NSLog("%@ %@", mobile, zone)
    //NSLog("Bridge: %@", self.bridge);
    //self.bridge.eventDispatcher.sendAppEventWithName("managerCallback", body: ["mobile":mobile])
    // zone：此参数可以写死，也可以使用 +(void)getCountryZone:(SMSGetZoneResultHandler)result; 通过网络请求的方式获取区号，此方法在'SMS_SDK.framework / SMSSDK+ExtexdMethods.h中'
    SMSSDK.getVerificationCodeByMethod(SMSGetCodeMethodSMS, phoneNumber: mobile, zone: zone, customIdentifier: nil) { (error : NSError!) -> Void in
      if (error == nil)
      {
        NSLog("请求成功,请等待短信～")
        callback([["error": 0,]])
      }
      else
      {
        // 错误码可以参考‘SMS_SDK.framework / SMSSDKResultHanderDef.h’
        NSLog("请求失败:%@", error)
        callback([
          ["error": error.code,
            "result": error.userInfo]
          ])
      }
    }
    
  }
  @objc func verifyCaptcha(captcha: String, mobile: String, zone: String, callback: (NSObject) -> () ) -> Void {
    let parameters = [
      "mobile": mobile,
      "captcha": captcha,
      "zone": zone,
      ]
    Alamofire.request(.POST, "http:/127.0.0.1:3080/api.php?controller=mobile/auth&action=login_by_mobile_captcha", parameters: parameters)
      .responseJSON { response in
        print(response.result)   // result of response serialization
        if let JSON = response.result.value {
         // print("JSON: \(JSON)")
          callback([JSON])
        }
    }
    //NSLog("%@", captcha)
//    SMSSDK.commitVerificationCode(captcha, phoneNumber: mobile, zone: zone) { (error : NSError!) -> Void in
//      if (error == nil)
//      {
//        NSLog("请求成功,请等待短信～")
//        callback([["error": 0,]])
//      }
//      else
//      {
//        // 错误码可以参考‘SMS_SDK.framework / SMSSDKResultHanderDef.h’
//        NSLog("请求失败:%@", error)
//      }
//      
//    }
  }
}