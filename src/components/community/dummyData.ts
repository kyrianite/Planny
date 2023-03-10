export type post = {
  communityId: number,
  messageId: number,
  firstName: string;
  lastName: string;
  time: string;
  topic: string;
  photos: string[];
  plantType: string;
  plantName: string;
  likes: number;
  replies: number;
  profilePicture: string
};

export const dummyPosts: post[] = [
  {
    communityId:10001,
    messageId: 1000001,
    firstName: 'Nathanael',
    lastName: 'Tjen',
    time: '2023-03-05',
    topic: '🌿🌸Don’t use hot water for your plants',
    photos: ['https://secure.img1-cg.wfcdn.com/im/70455228/scale-w300%5Ecompr-r70/2176/217692118/default_name.jpg', 'https://secure.img1-cg.wfcdn.com/im/59356836/resize-h800-w800%5Ecompr-r85/1434/143429039/Aloe+Vera+Plant+in+Basket.jpg','https://hips.hearstapps.com/hmg-prod/images/766/articles/2016/11/aloe-vera-doesnt-contain-aloe-1494154802.jpeg'],
    plantType: 'Succulent',
    plantName: 'Aloe Vera',
    likes: 10,
    replies: 3,
    profilePicture:'https://ca.slack-edge.com/T0455847Q-U04ER3F959T-ef44f68e627e-512'
  },
  {
    communityId:10002,
    messageId: 1000002,
    firstName: 'Jessica',
    lastName: 'Vu',
    time: '2023-03-03',
    topic: 'Put your plants in the sun🌹',
    photos: ['https://jayscotts.com/wp-content/uploads/2020/12/indoor-flowers-for-beginners-3.jpg','https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1653591340-christmas-cactus-royalty-free-image-1568922653.jpg'],
    plantType: 'Rose',
    plantName: 'Rose',
    likes: 10,
    replies: 3,
    profilePicture:'https://ca.slack-edge.com/T0455847Q-U04EMDCLARL-6e419e5fc48b-512'
  },
  {
    communityId:10003,
    messageId: 1000003,
    firstName: 'Erik',
    lastName: 'Newland',
    time: '2023-03-02',
    topic: 'Check out my awesome Cactus🌵🌵🌵!',
    photos: ['https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/types-of-cactus-section-1.jpg', 'https://www.ftd.com/blog/wp-content/uploads/2018/07/types-of-cactus-hero.jpg', 'https://secure.img1-cg.wfcdn.com/im/56520246/resize-h445%5Ecompr-r85/2247/224789930/14%27%27+Faux+Cactus+Tree+in+Ceramic+Pot.jpg','https://secure.img1-fg.wfcdn.com/im/36176888/resize-h445%5Ecompr-r85/1209/120991332/14%27%27+Faux+Cactus+Tree+in+Ceramic+Pot.jpg'],
    plantType: 'Succulent',
    plantName: 'Cactus',
    likes: 5,
    replies: 3,
    profilePicture:'https://ca.slack-edge.com/T0455847Q-U04ETTW2G75-46dfcc5471da-512'
  },
  {
    communityId:10004,
    messageId: 1000004,
    firstName: 'Sandy',
    lastName: 'Chu',
    time: '2023-02-01',
    topic: '🌱🔥🌿 Hey fellow trainers! Want to keep your plant Pokémon happy and healthy? Make sure to water them regularly. 🌿🌱💪',
    photos: ['https://i0.wp.com/yumetwinsblog.wpcomstaging.com/wp-content/uploads/2021/12/bb4bccb5-7a06-4b30-be9d-5ea3f461873e_3.png?w=620&ssl=1', 'https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_1:1,f_auto,q_auto,g_auto/shape/cover/sport/dataimagepngbase64iVBORw0KGgoAAAANSUhEUgAAAlgAAAJY-6a18dd469e165d7ae758b6f2e559e449.jpg'],
    plantType: 'Pokemon',
    plantName: 'Pokemon',
    likes: 10,
    replies: 3,
    profilePicture:'https://ca.slack-edge.com/T0455847Q-U04FHNK2BG8-4a6ba3fba6e6-512'
  },
  {
    communityId:10005,
    messageId: 1000005,
    firstName: 'William',
    lastName: 'Wong',
    time: '2023-02-01',
    topic: '🌱💡 Remember to give your plants a good drink of water only when the top inch of soil is dry to the touch!',
    photos: ['https://empire-s3-production.bobvila.com/slides/30451/original/Gloxinia-flowering-houseplants.jpg?1551987245', 'https://hips.hearstapps.com/hmg-prod/images/perennial-flowers-and-plants-1674072475.jpeg'],
    plantType: '',
    plantName: '',
    likes: 10,
    replies: 3,
    profilePicture:'https://ca.slack-edge.com/T0455847Q-U04EDFABKBR-085e96a0c7ec-512'
  },

  {
    communityId:10006,
    messageId: 1000006,
    firstName: 'Quanjing',
    lastName: 'Chen',
    time: '2023-01-01',
    topic: 'If your plant seems sad, give it a little pep talk',
    photos: ['https://ashleyfurniture.scene7.com/is/image/AshleyFurniture/A600023662_1?$AFHS-PDP-Main$','https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/types-of-cactus-section-6.jpg'],
    plantType: 'rose',
    plantName: 'rose',
    likes: 10,
    replies: 3,
    profilePicture:'https://ca.slack-edge.com/T0455847Q-U04EMDMHHF0-04bbf4b803f8-512'
  },
];
