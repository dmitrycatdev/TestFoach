import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FirstScreen from "@/features/First/FirstScreen";
import SecondScreen from "@/features/Second/SecondScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppRouteNames } from "./types";
import FirstDetailScreen from "@/features/First/FirstDetailScreen";

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
   
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelPosition: "beside-icon",
                tabBarLabelStyle:    {
                    fontWeight: "700",
                    fontSize:   15,
                },
                tabBarIconStyle: { display: "none" },
            }}
        >
            <Tab.Screen name={AppRouteNames.First} component={FirstScreen} />
            <Tab.Screen name={AppRouteNames.Second} component={SecondScreen} />
        </Tab.Navigator>
    );
};

const Router = () => {
    const renderFirstScreenDetails = (props: any) => <FirstDetailScreen {...props}/>;
    return (
        <RootStack.Navigator>
            <RootStack.Screen 
                name="Tabs"
                component={Tabs}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen 
                name={AppRouteNames.FirstDetail} 
                component={renderFirstScreenDetails}                
            />
            
        </RootStack.Navigator>
    );
};

export default Router;