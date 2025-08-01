import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fetchPopularMovie,
  fetchTopratedMovie,
  fetchTrendingMovie,
  fetchUpcomingMovie,
} from "../api/index";
import TopRatedMovie from "../components//top-rated-movie";
import TradingMovie from "../components/tradingMovie";
import UpdatingMovie from "../components/updatingMovie";
export default function Home() {
  const [trading, setTrading] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState([]);
  const [toprated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);

  const navigation = useNavigation();

  const getTradingmovie = async () => {
    setLoading(true);
    const data = await fetchTrendingMovie();
    setTrading(data.results);
    setLoading(false);
  };
  const getPopularMovie = async () => {
    const data = await fetchPopularMovie();
    setPopular(data.results);
  };
  const getUpdatingMovie = async () => {
    const data = await fetchUpcomingMovie();
    setUpdating(data.results);
  };
  const getTopRetedMovie = async () => {
    const data = await fetchTopratedMovie();
    setTopRated(data.results);
  };
  useEffect(() => {
    getPopularMovie();
    getTradingmovie();
    getTopRetedMovie();
    getUpdatingMovie();
  }, []);

  return (
    <View className="flex-1 bg-slate-900">
      <SafeAreaView>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-6 mt-4">
          <Image
            className="w-[50px] h-[50px]"
            source={require("../assets/images/logo.png")}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon color={"white"} size={30} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <View className="justify-center items-center flex-1">
          <Progress.CircleSnail
            borderWidth={10}
            color={["red", "green", "blue"]}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {trading.length > 0 && <TradingMovie trading={trading} />}
          {updating.length > 0 && (
            <UpdatingMovie
              updating={updating.reverse()}
              title="Updating Movie"
            />
          )}

          {popular.length > 0 && (
            <UpdatingMovie updating={popular} title="Popular movie" />
          )}
          {toprated.length > 0 && <TopRatedMovie TopRate={toprated} />}
        </ScrollView>
      )}
    </View>
  );
}
