import ExpoModulesCore
// import UIKit
import WebKit

public class MyModuleView: ExpoView {
  // Add your view configuration here
  let webView = WKWebView()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
    addSubview(webView)

    let url =  URL(string:"https://docs.expo.dev/modules/")!
    let urlRequest = URLRequest(url:url)
    webView.load(urlRequest)
  }

  public override func layoutSubviews() {
    super.layoutSubviews()
    webView.frame = bounds
  }
}
