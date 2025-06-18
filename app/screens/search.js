import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchMovieSearch, Image185 } from "../api";

export default function Search() {
  const [isloading, setLoading] = useState(false);
  const [results, setResult] = useState([]);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  const SearchFuction = (search) => {
    if (search.length > 3 && search) {
      setLoading(true);
      fetchMovieSearch({ query: search, include_adult: false, page: "1" }).then(
        (data) => {
          setResult(data.results);
          setLoading(false);
        }
      );
    } else {
      setResult([]);
      setLoading(false);
    }
  };

  const handledebaunce = useCallback(debounce(SearchFuction, 400), []);

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-row justify-between items-center rounded-full border-cyan-50 mx-4 mb-4 mt-4 border-2">
        <TextInput
          onChangeText={handledebaunce}
          placeholder="Search movie"
          placeholderTextColor={"lightgrey"}
          className="text-white font-semibold tracking-wide mx-4 p-1 flex-1 "
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-gray-500 rounded-full p-4"
        >
          <XMarkIcon color={"white"} size={25} />
        </TouchableOpacity>
      </View>
      {isloading ? (
        <View className={"items-center justify-center flex-1 h-[500px]"}>
          <Progress.CircleSnail
            borderWidth={10}
            color={["white", "red", "green", "blue"]}
          />
        </View>
      ) : results.length > 0 ? (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={false}>
          <Text className="text-white font-bold ml-6 mt-2">
            Results:({results.length})
          </Text>
          <View className="mt-4 flex-row flex-wrap gap-[30px] justify-center">
            {results?.map((item) => (
              <View key={item.id}>
                <TouchableWithoutFeedback>
                  <View>
                    <Image
                      source={{ uri: Image185(item.poster_path) }}
                      style={{ width: width * 0.4, height: height * 0.3 }}
                    />
                    <Text className="text-gray-300 mt-1 ml-1">
                      {item?.title.length > 20
                        ? item?.title.slice(0, 20) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="justify-center">
          <Image
            source={require("../assets/images/not-found.png")}
            style={{ width: 280, height: 280 }}
            className="m-auto"
          />
          <Text className={"text-3xl font-semibold text-white text-center"}>
            Movies not found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
