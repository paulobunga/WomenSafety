import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateAlertScreen from "../screens/CreateAlertScreen";
import ReceivedAlertsScreen from "../screens/ReceivedAlertsScreen";

const Tab = createBottomTabNavigator();
const AlertNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Create" component={CreateAlertScreen} />
            <Tab.Screen name="Received" component={ReceivedAlertsScreen} />
        </Tab.Navigator>
    );
};

export default AlertNavigator;
