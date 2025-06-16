import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import { Image500 } from "../api";
export default function MovieCard({ item, width }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="m-auto"
      onPress={() => navigation.navigate("Detailed", item)}
    >
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
    </TouchableOpacity>
  );
}
