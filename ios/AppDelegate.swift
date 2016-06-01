import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  var bridge: RCTBridge!
  
  func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject : AnyObject]?) -> Bool {
    SMSSDK.registerApp("1311d54a7bc9a", withSecret: "c604d2ec84b01adc897c13725381cac3")
    
    let jsCodeLocation = NSURL(string: "http://localhost:8081/index.ios.bundle?platform=ios&dev=true")
    //let jsCodeLocation = NSBundle.mainBundle().URLForResource("main", withExtension: "jsbundle")
    
    self.window = UIWindow(frame: UIScreen.mainScreen().bounds)
    self.window!.backgroundColor = UIColor.whiteColor()
    RCCManager.sharedInstance().initBridgeWithBundleURL(jsCodeLocation)
    
//    let rootView = RCTRootView(bundleURL:jsCodeLocation, moduleName: "MatchJoin", initialProperties: nil, launchOptions:launchOptions)
//    self.bridge = rootView.bridge
//    self.window = UIWindow(frame: UIScreen.mainScreen().bounds)
//    let rootViewController = UIViewController()
//    rootViewController.view = rootView
//    self.window!.rootViewController = rootViewController;
//    self.window!.makeKeyAndVisible()
    
    return true
  }
}