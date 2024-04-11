import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [pressing, setPressing] = useState(false);
  const [sound, setSound] = useState();
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/moai.mp3"),
      { volume: 1 }
    );
    setSound(sound);

    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const pressIn = () => {
    setPressing(true);
    playSound().catch((e) => console.log("failed to play sound", e));
  };
  const pressOut = () => {
    setPressing(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPressIn={pressIn} onPressOut={pressOut}>
        <Text style={[styles.moai, { fontSize: pressing ? 150 : 160 }]}>
          🗿
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  moai: {
    fontSize: 70,
  },
});
