import Parse from "parse";

const appId = import.meta.env.VITE_PARSE_APP_ID;
const jsId = import.meta.env.VITE_PARSE_JS_KEY;
const serverURL = import.meta.env.VITE_PARSE_SERVER_URL;

console.log("appId=" + appId, "\njsId" + jsId, "\nServer URL: " + serverURL);

Parse.serverURL = serverURL;
Parse.initialize(appId, jsId);

export default Parse;
