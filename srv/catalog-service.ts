import { registerGenericHandlers } from "../src/services/generic-service";

module.exports = (srv: any) => {
  registerGenericHandlers(srv);
};
