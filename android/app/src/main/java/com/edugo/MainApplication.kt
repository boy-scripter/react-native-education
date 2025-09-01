package com.edugo

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader

import java.lang.Class
import java.lang.reflect.Method
import android.content.Context
import com.facebook.react.ReactInstanceManager


class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }

   if (BuildConfig.DEBUG) {
     initializeFlipper(this, reactNativeHost.reactInstanceManager)
    }

  }

      private fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
        
              try {
                  // Load the Flipper initializer class via reflection
                  val flipperClass = Class.forName("com.edugo.ReactNativeFlipper")

                  // Get the static initializeFlipper method with correct parameter types
                  val method = flipperClass.getMethod(
                      "initializeFlipper",
                      Context::class.java,
                      Class.forName("com.facebook.react.ReactInstanceManager") // force resolve
                  )

                  // Invoke the static method
                  method.invoke(null, context, reactInstanceManager)
              } catch (e: Exception) {
                  e.printStackTrace()
              }
          
      }


}
