import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
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
    setMovie(data);
    setLoading(false);
  }
  async function getCreditis() {
    const data = await fetchMovieCredits(item.id);
    setCast(data.cast);
  }
  async function getSimilar() {
    const data = await fetchMovieSimilar(item.id);
    setSimilar(data.results);
  }

  const { width, height } = Dimensions.get("window");
  useEffect(() => {
    getDetails();
    getCreditis();
    getSimilar();
  }, [item]);
  return (
    <View className="flex-1 bg-slate-900 justify-center">
      <ScrollView>
        <SafeAreaView className="flex-row z-30 px-6 absolute w-full justify-between items-center">
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
          <View className="items-center justify-center flex-1 h-[500px]">
            <Progress.CircleSnail
              borderWidth={10}
              color={["white", "red", "green", "blue"]}
            />
          </View>
        ) : (
          <View>
            <Image
              source={{ uri: Image500(movie.poster_path) }}
              style={{ width, height: height * 0.6 }}
            />
            <LinearGradient
              colors={["transparent", "#000000cc", "#000000", "#000743"]}
              start={{ x: 0.5, y: 0 }}
              style={{ width, height: height * 0.4 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
