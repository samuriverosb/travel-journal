import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#F5F7FA",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Travel Journal",
          }}
        />

        <Stack.Screen
          name="add-entry"
          options={{
            title: "New Entry",
          }}
        />

        <Stack.Screen
          name="entry/[id]"
          options={{
            title: "Travel Memory",
          }}
        />

        <Stack.Screen
          name="edit-entry/[id]"
          options={{
            title: "Edit Entry",
          }}
        />
      </Stack>
    </>
  );
}