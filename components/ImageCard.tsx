import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export interface ImageCardProps {
  title: string;
  id: string;
  farm: number;
  secret: string;
  server: string;
  owner: string;
}

const ImageCard = ({
  title,
  id,
  farm,
  secret,
  server,
  owner,
}: ImageCardProps) => {
  const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: url }} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.owner}>{owner}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    maxWidth: 400,
  },
  image: {
    width: 320,
    height: 400,
  },
  title: {
    fontSize: 18,
  },
  owner: {
    color: "grey",
  },
});

export default ImageCard;
