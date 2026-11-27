import {Asset} from 'expo-asset';
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

export default function App() {
  const [gameUri, setGameUri] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    Asset.loadAsync(require('./assets/game.html')).then(([asset]) => {
      if (mounted) {
        setGameUri(asset.localUri ?? asset.uri);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!gameUri) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#e8a317" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <WebView
        source={{uri: gameUri}}
        style={styles.webview}
        originWhitelist={['*']}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        domStorageEnabled
        overScrollMode="never"
        scrollEnabled={false}
        bounces={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#173a6e',
  },
  loading: {
    flex: 1,
    backgroundColor: '#173a6e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    backgroundColor: '#173a6e',
  },
});
