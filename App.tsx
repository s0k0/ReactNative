import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";

import ImageCard from "./components/ImageCard";
import * as config from "./config.json";

export interface ImageProps {
  id: string;
  farm: number;
  secret: string;
  title: string;
  server: string;
  ownername: string;
}

export default function App() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ImageProps[]>([]);
  const [page, setPage] = useState<number>(1);

  const query = "Gustav Klimt";

  const getMovies = async () => {
    try {
      const response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&text=${query}&media=photos&api_key=${config.apiKey}&per_page=${config.pageSize}&page=${page}&extras=owner_name&format=json&nojsoncallback=true`
      );
      const json = await response.json();
      setData(data.concat(json.photos.photo));
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoading(false), 1);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Welcome to the Flickr!</Text>
      <Text style={styles.title}>{`Results for '${query}'`}</Text>
      <StatusBar style="auto" />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.flatList}
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <ImageCard
              title={item.title}
              id={item.id}
              farm={item.farm}
              secret={item.secret}
              server={item.server}
              owner={item.ownername}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 24,
  },
  title: {
    fontSize: 16,
  },
  flatList: {
    width: "100%",
  },
  listItem: {
    padding: 10,
    width: "100%",
  },
});
