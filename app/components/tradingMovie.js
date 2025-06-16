import { Dimensions, Text, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import MovieCard from "../components/movie-card";
export default function TradingMovie({ trading }) {
  const { width } = Dimensions.get("window");
  const itemWidth = width;
  const sideSpacing = (width - itemWidth) / 1;
  return (
    <TouchableOpacity
      className="mb-10"
    >
      <Text className="text-[white] mb-5 text-xl font-bold mx-4">
        Trading Movie
      </Text>
      <Carousel
        data={trading}
        width={itemWidth}
        height={450}
        scrollAnimationDuration={1000}
        style={{
          paddingHorizontal: sideSpacing,
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 70,
        }}
        renderItem={({ item }) => <MovieCard item={item} width={itemWidth} />}
      />
    </TouchableOpacity>
  );
}
