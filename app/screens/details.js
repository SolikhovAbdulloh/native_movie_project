import { Text, View } from "react-native";

export default function Details({ item }) {
  console.log(item);

  return (
    <View className="h-[500px] items-center justify-center">
      <Text className=" text-red-500">Detailed</Text>
    </View>
  );
}
