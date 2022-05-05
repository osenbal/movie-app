import { collection, getDocs } from 'firebase/firestore';

export const fetchDataFeeds = async (firestoreDb) => {
    const feeds = await getDocs(collection(firestoreDb, 'videos'));

    return feeds.docs.map(feed => feed.data());
}