// index.js
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import "./assets/fonts/CuteFont-Regular.ttf";

AppRegistry.registerComponent(appName, () => App);
