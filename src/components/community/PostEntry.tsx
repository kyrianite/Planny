import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/ColorScheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDistanceToNow } from 'date-fns';


type PostProps = {
  communityId: Number,
  messageId: Number,
  firstName: string;
  lastName: string;
  time: string;
  topic: string;
  photos: string[];
  plantType: string;
  plantName: string;
  likes: number;
  replies: number;
  showComment: () => void;
};

export default function PostEntry(props: PostProps) {
  const {
    communityId,
    messageId,
    firstName,
    lastName,
    time,
    topic,
    photos,
    plantType,
    plantName,
    likes,
    replies,
    showComment,
  } = props;

  const onLikePress = () => {
    console.log('like + 1')
  };
  const onReplyPress = () => {
    showComment();
  };
  const onSharePress = () => {
    console.log('share + 1')
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.postUsername}>{firstName} {lastName}</Text>
      </View>
      {photos.length ? <View style={styles.postPhotoContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {photos.map((photo, index) => (
            <Image source={{ uri: photo }} style={styles.postPhoto} key={index} />
          ))}
        </ScrollView>
      </View> : null}

      <View style={styles.posttopic}>

        <Text>{topic}</Text>

      </View>
      <View style={styles.postFooter}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={onLikePress}>
          <Icon name="flower" size={20} color={Colors.sage} />
          <Text style={{ marginLeft: 5 }}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={onReplyPress}>
          <Icon name="reply" size={20} color={Colors.sage} />
          <Text style={{ marginLeft: 5 }}>{replies}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={onSharePress}>
          <Icon name="share-variant" size={20} color={Colors.sage} />
        </TouchableOpacity>
      </View>
      <Text style={styles.posttime}>{formatDistanceToNow(new Date(time), { addSuffix: true })}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    // backgroundColor: Colors.porcelain,
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  postUsername: {
    fontWeight: 'bold',
  },
  posttime: {
    marginTop: 5

  },
  posttopic: {
    marginBottom: 5,
  },

  postPhotoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 210,
    marginBottom: 5
  },
  postPhoto: {
    height: 200,
    width: 200,
    marginRight: 20,
    borderRadius: 10
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
