import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { initDatabase } from "../src/database/database";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await initDatabase();
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Redirect href="/TelaInicio" />;
}