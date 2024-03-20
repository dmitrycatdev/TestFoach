import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import Router from "@/router/Router";


const App = () => (
    <Provider store={store}>
        <NavigationContainer>
            <Router />
        </NavigationContainer>
    </Provider>
);

export default App;
