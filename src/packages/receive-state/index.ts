import create from "zustand";

const [useReceiveStore, receiveStoreApi] = create(() => ({
  enableReception: false
}));

export const setEnableReception = (enableReception: boolean) => {
  receiveStoreApi.setState({
    enableReception
  });
};

export { useReceiveStore };
