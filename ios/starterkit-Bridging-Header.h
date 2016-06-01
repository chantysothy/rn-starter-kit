//
//  Use this file to import your target's public headers that you would like to expose to Swift.
//

#import "RCCManager.h"
#import "RCTBridgeModule.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "RCTRootView.h"
#import "RCTUtils.h"
#import "RCTConvert.h"

#ifndef SMS_SDK_Swift__SMSSDK_Bridging_Header_h
#define SMS_SDK_Swift__SMSSDK_Bridging_Header_h
//导入SMS-SDK的头文件
#import <SMS_SDK/SMSSDK.h>
//关闭访问通讯录需要导入的头文件
//#import <SMS_SDK/SMSSDK+AddressBookMethods.h>
#endif