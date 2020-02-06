import firebase from "./firebase";

const storage = firebase.storage();
storage.setMaxOperationRetryTime(1000);

export const uploadAudio = async (uri, onProgress, onError, onCompletion) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = storage.ref().child(new Date().getTime().toString());
  const uploadTask = ref.put(blob);

  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(Math.round(progress));
    },
    onError,
    async () => {
      const downloadURI = await uploadTask.snapshot.ref.getDownloadURL();
      onCompletion(downloadURI);
    }
  );
  return uploadTask;
};
