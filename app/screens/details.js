import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieSimilar,
  Image500,
} from "../api";
import Cast from "../components/cast";
import UpdatingMovie from "../components/updatingMovie";

export default function Details() {
  const [favourite, setFavurite] = useState(false);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [isloading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { params: item } = useRoute();

  async function getDetails() {
    setLoading(true);
    const data = await fetchMovieDetails(item.id);
    item && setMovie(data);
    setLoading(false);
  }
  async function getCreditis() {
    const data = await fetchMovieCredits(item.id);
    item && setCast(data.cast);
  }
  async function getSimilar() {
    const data = await fetchMovieSimilar(item.id);
    item && setSimilar(data.results);
  }

  const { width, height } = Dimensions.get("window");
  useEffect(() => {
    getDetails();
    getCreditis();
    getSimilar();
  }, [item]);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className={"flex-1 bg-slate-900"}
    >
      <View className={"w-full"}>
        <SafeAreaView className="flex-row z-30 px-2 absolute w-full justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={35} color="white" strokeWidth={3.5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFavurite((prev) => !prev)}>
            <HeartIcon
              size={35}
              color={favourite ? "red" : "white"}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {isloading ? (
          <View className={"items-center justify-center flex-1 h-[500px]"}>
            <Progress.CircleSnail
              borderWidth={10}
              color={["white", "red", "green", "blue"]}
            />
          </View>
        ) : (
          <View>
            <Image
              source={{ uri: Image500(movie.poster_path) }}
              style={{ width, height: height * 0.5 }}
            />
          </View>
        )}
      </View>
      <View className={"space-y-4"}>
        <Text className="text-white text-3xl text-center pt-2 mt-3 font-bold tracking-widest">
          {movie?.title}
        </Text>
        <Text className="text-white text-center font-semibold mt-2 text-base">
          {movie?.status} * {movie?.release_date?.split("-")[0]} *{" "}
          {movie.runtime} min
        </Text>
        <View className="flex-row justify-center items-center mt-3 gap-4 flex-wrap space-x-2">
          {movie?.genres?.map((item, idx) => (
            <Text
              className="text-white font-semibold flex-wrap text-center text-base"
              key={item.id}
            >
              {item.name}
              {idx + 1 != movie.genres.length ? "   *" : null}
            </Text>
          ))}
        </View>
        <View>
          <Text className="mx-4 mt-4 text-neutral-400 font-medium tracking-wide">
            {movie?.overview}
          </Text>
          {movie.id && cast.length > 0 && <Cast cast={cast} />}
          {movie.id && similar.length > 0 && (
            <UpdatingMovie title="Similar movie" updating={similar} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
