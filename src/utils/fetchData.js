import { collection, getDocs, doc, getDoc, orderBy } from 'firebase/firestore';

export const fetchDataFeeds = async (firestoreDb) => {
    const feeds = await getDocs(collection(firestoreDb, 'videos'), orderBy("id", "desc"));

    return feeds.docs.map(feed => feed.data());
}

export const getUserInfo = async (firebaseDb, userId) => {
    const userRef = doc(firebaseDb, "users", userId);

    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data();
    } else {
        return 'no user data';
    }
}

export const getSpesificVideo = async (firebaseDb, videoId) => {
    const videoRef = doc(firebaseDb, "videos", videoId);

    const videoSnap = await getDoc(videoRef);

    if (videoSnap.exists()) {
        return videoSnap.data();
    } else {
        return "Video Not Exist";
    }

}   