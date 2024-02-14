import type * as Party from "partykit/server";
import { onConnect } from "y-partykit";
import * as git from "isomorphic-git";
import http from "./server/http/http";

export default class YjsServer implements Party.Server {
  constructor(public party: Party.Room) {}

  async onStart() {
    // you can also add a callback as the last parameter instead of using promises
    const { BFSRequire, configure } = await import("browserfs");
    configure({ fs: "InMemory", options: undefined }, (_) => {
      const fs = BFSRequire("fs");
      git
        .clone({
          fs,
          http,
          dir: "/partyDocument",
          url: "https://github.com/OCA99/tm-backend.git",
        })
        .then(console.log)
        .catch(console.error);
    });
  }

  onConnect(conn: Party.Connection) {
    return onConnect(conn, this.party, {
      persist: {
        mode: "history",
      },

      callback: {
        async handler(yDoc) {
          // return sendDataToExternalService(yDoc);
        },
        // only save after every 5 seconds of inactivity
        debounceWait: 5000,
        // if updates keep coming, save at least once every 10 seconds (default)
        debounceMaxWait: 10000,
      },
    });
  }
}
