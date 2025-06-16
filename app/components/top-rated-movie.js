import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import MovieCard from "./movie-card";

export default function TopRateMovie({ TopRate }) {
  const { width } = Dimensions.get("window");
  const itemWidth = width;
  const sideSpacing = (width - itemWidth) / 1;
  return (
    <View className="mb-10">
      <Text className="text-[white] mt-5 text-xl font-bold mx-4">
        TopRate Movie
      </Text>
      <Carousel
        data={TopRate}
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
    </View>
  );
}
