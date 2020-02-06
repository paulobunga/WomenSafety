import create from "zustand";
import { myUserId } from "../../../config";
import { sendUserLocation } from "../message";

const [useLocationsStore] = create(set => ({
  sender: {},
  coordinates: {},
  setLocationStore: (data: any) => set(() => data)
}));

export async function startSendingLocation(lat: number, long: number) {
  sendUserLocation(myUserId, lat, long);
}

export { useLocationsStore };
