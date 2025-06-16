import { Image, View } from "react-native";
import { Image500 } from "../api";
export default function MovieCard({ item, width }) {
  return (
    <View className="m-auto">
      <Image
        source={{ uri: Image500(item.poster_path) }}
        style={{
          width,
          borderRadius: 15,
          overflow: "hidden",
          height: 440,
          objectFit: "cover",
        }}
      />
    </View>
  );
}
