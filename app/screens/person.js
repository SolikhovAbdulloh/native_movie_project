import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchMoviePerson, fetchMoviePersonDetails, Image342 } from "../api";
import UpdatingMovie from "../components/updatingMovie";

export default function Person() {
 
  const [person, setPerson] = useState([]);
  const [personDetails, setPersonDetails] = useState([]);
  const [favourite, setFavurite] = useState(false);
  const [isloading, setLoading] = useState(false);

  const { params } = useRoute();
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  const getPerson = async () => {
    setLoading(true);
    const data = await fetchMoviePerson(params.id);
    setPerson(data);
    setLoading(false);
  };
  const getPersonDetails = async () => {
    const data = await fetchMoviePersonDetails(params.id);
    setPersonDetails(data.cast);
  };
  useEffect(() => {
    getPerson();
    getPersonDetails();
  }, [params.id]);
  return (
    <ScrollView
      className="flex-1 bg-slate-900"
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      <SafeAreaView className="flex-row z-30 px-2 pt-2 w-full justify-between items-center">
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
        <View
          className="flex-row justify-center"
          style={{
            shadowRadius: 15,
            shadowColor: "white",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.8,
          }}
        >
          <View className="overflow-hidden rounded-full h-72 w-72 items-center border-2 border-neutral-600">
            <Image
              source={{ uri: Image342(person.profile_path) }}
              style={{
                width: width * 0.64,
                height: height * 0.39,
              }}
            />
          </View>
        </View>
      )}
      <View>
        <Text className="text-center mt-5 font-semibold text-base  text-gray-500">
          {person.name}
        </Text>
        <Text className="text-center mt-3 text-gray-300">
          {person.place_of_birth}
        </Text>
      </View>
      <View className="flex-row justify-between mx-4 mt-5 mr-3 bg-[grey] p-2 px-1 rounded-full `">
        <View className="items-center p-3 border-r-2 border-zinc-700">
          <Text className="text-white mb-2">Gender</Text>
          <Text className="text-slate-800">
            {person.gender === 1 ? "Female" : "Male"}
          </Text>
        </View>
        {person.birthday && (
          <View className="items-center p-3 border-r-2  border-zinc-700">
            <Text className="text-white mb-2">Birthday</Text>
            <Text className="text-slate-800">{person.birthday}</Text>
          </View>
        )}
        <View className="items-center p-3 border-r-2 border-zinc-700">
          <Text className="text-white mb-2">Known for</Text>
          <Text className="text-slate-800">{person.known_for_department}</Text>
        </View>
        <View className="items-center p-3">
          <Text className="text-white mb-2">Popularity</Text>
          <Text className="text-slate-800">
            {person?.popularity?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View className="mx-4 mt-4 space-y-2">
        <Text className="text-white mb-3 text-lg ">Biography</Text>
        <Text className="tracking-wide text-neutral-600">
          {person.biography}
        </Text>
      </View>
      <View className="mt-4 mb-4">
        {person?.id && personDetails.length > 0 && (
          <UpdatingMovie updating={personDetails} title={"Movies"} />
        )}
      </View>
    </ScrollView>
  );
}
