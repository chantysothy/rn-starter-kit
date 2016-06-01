//
//  SMSLoginBridge.m
//  PtApp
//
//  Created by Joseph on 16/5/23.
//  Copyright © 2016年 Facebook. All rights reserved.
//

//#import

// CalendarManagerBridge.m
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(SMSLogin, NSObject)

RCT_EXTERN_METHOD(sendCaptcha:(NSString *)mobile zone:(NSString *)zone callback: (RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(verifyCaptcha:(NSString *)captcha  mobile:(NSString *)mobile zone:(NSString *)zone callback: (RCTResponseSenderBlock)callback);

@end