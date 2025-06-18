import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Image185 } from "../api";

export default function Cast({ cast }) {
  const navigation = useNavigation();
  return (
    <View className="my-6">
      <Text className="text-white font-bold mx-4 mb-4">Actors</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        <View className="flex-row">
          {cast &&
            cast.map((person, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => navigation.navigate("Person", person)}
                className="items-center mr-4"
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border-neutral-600">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={{ uri: Image185(person?.profile_path) }}
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {person.character.length > 0
                    ? person.character.slice(0, 10) + "..."
                    : person.character}
                </Text>
                <Text className="text-neutral-500 text-xs mt-1">
                  {person?.original_name?.length > 0
                    ? person.original_name.slice(0, 10) + "..."
                    : person.original_name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
