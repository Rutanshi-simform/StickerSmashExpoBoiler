package expo.modules.mymodule

import android.content.Context
import android.content.SharedPreferences
import androidx.core.os.bundleOf
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class MyModule : Module() {
  // Context property - must be outside definition block
  private val context
    get() = requireNotNull(appContext.reactContext)

  // Helper function - must be outside definition block
  private fun getPreferences(): SharedPreferences {
    return context.getSharedPreferences(context.packageName + ".settings", Context.MODE_PRIVATE)
  }

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('MyModule')` in JavaScript.
    Name("MyModule")

    Events("onChangeTheme")

    // Defines constant property on the module.
    Constant("PI") {
      Math.PI
    }

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world!"
    }

    Function("setTheme") { theme: String ->
      getPreferences().edit().putString("theme", theme).commit()
      this@MyModule.sendEvent("onChangeTheme", bundleOf("theme" to theme))
    }

    Function("getTheme") {
      return@Function getPreferences().getString("theme", "system")
    }
  }
}
