package com.education; // Replace with your actual package

import android.content.Context;

import com.facebook.flipper.android.AndroidFlipperClient;
import com.facebook.flipper.android.utils.FlipperUtils;
import com.facebook.flipper.core.FlipperClient;
import com.facebook.flipper.plugins.inspector.DescriptorMapping;
import com.facebook.flipper.plugins.inspector.InspectorFlipperPlugin;
import com.facebook.flipper.plugins.network.FlipperOkhttpInterceptor;
import com.facebook.flipper.plugins.network.NetworkFlipperPlugin;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.modules.network.NetworkingModule;

import okhttp3.OkHttpClient;

public class ReactNativeFlipper {
    public static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        if (FlipperUtils.shouldEnableFlipper(context)) {
            final FlipperClient client = AndroidFlipperClient.getInstance(context);

            // Add layout inspector plugin
            client.addPlugin(new InspectorFlipperPlugin(context, DescriptorMapping.withDefaults()));

            // Add network plugin
            final NetworkFlipperPlugin networkFlipperPlugin = new NetworkFlipperPlugin();
            NetworkingModule.setCustomClientBuilder(new NetworkingModule.CustomClientBuilder() {
                @Override
                public void apply(OkHttpClient.Builder builder) {
                    builder.addNetworkInterceptor(new FlipperOkhttpInterceptor(networkFlipperPlugin));
                }
            });

            client.addPlugin(networkFlipperPlugin);

            // Start Flipper client
            client.start();
        }
    }
}
