import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { Image185 } from "../api";

export default function UpdatingMovie({ updating, title }) {
  const { width, height } = Dimensions.get("window");

  return (
    <View className="mb-5">
      <Text className="text-[red] mx-4 font-bold text-xl">{title}</Text>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {updating.map((item) => (
          <View className="mr-4 space-x-4" key={item.id}>
            <Image
              source={{ uri: Image185(item.poster_path) }}
              style={{
                width: width * 0.3,
                height: height * 0.2,
                backgroundColor: "red",
                borderRadius: 4,
                marginTop: 10,
                marginBottom: 10,
              }}
              resizeMode="cover"
            />
            <Text className="text-[white]">
              {item?.title.length > 12
                ? item?.title.slice(0, 12) + "..."
                : item.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
