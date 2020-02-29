import { storage } from "config/firebase";
storage.setMaxOperationRetryTime(1000);

export const uploadAudio = async (uri, onProgress, onError, onCompletion) => {
  const uploadTask = storage
    .ref("audio-messages/" + new Date().getTime())
    .putFile(uri);

  console.log("upload task ", uploadTask);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(Math.round(progress));
    },
    onError,
    async () => {
      const downloadURI = await uploadTask._ref.getDownloadURL();
      console.log("download uri", downloadURI);
      onCompletion(downloadURI);
    }
  );
  return uploadTask;
};
