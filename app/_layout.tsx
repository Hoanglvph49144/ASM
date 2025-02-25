import React, { useEffect } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import ManChinh from './ManChinh'; // Màn hình chính của bạn

// Prevent the splash screen from auto-hiding before asset loading is complete.

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Đặt ManChinh là màn hình đầu tiên */}
        <Stack.Screen name="ManChinh" options={{ headerShown: false }} />
        
        {/* Các màn hình khác */}
        <Stack.Screen name="ManChao" options={{ headerShown: false }} />
        <Stack.Screen name="ManDK" options={{ headerShown: false }} />
        <Stack.Screen name="ManDN" options={{ headerShown: false }} />
        
        {/* Màn hình lỗi 404 (not found) */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
