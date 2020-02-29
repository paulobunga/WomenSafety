import { Machine, interpret } from "xstate";

export const alertMachine = Machine({
  id: "alert",
  initial: "idle",
  states: {
    idle: {
      on: {
        alert: "alert"
      }
    },
    alert: {
      on: {
        receive: "received",
        reject: "idle"
      }
    },
    received: {
      on: {
        hangup: "idle"
      }
    }
  }
});

export let alertMachineService = interpret(alertMachine);

alertMachineService.start();
