import NavigationAll from "./Navigation/NavigationAll";
import { useEmailUser } from './Component/ZustandEmail'; 
import Login from "./Login/Login";
import MySchedule from "./Home/MySchedule";
import Signup from "./Login/Signup";
import { LogBox } from 'react-native';





export default function App() {

  LogBox.ignoreAllLogs();

  const emailUser = useEmailUser((state) => state.email);
  return (
    emailUser ? <NavigationAll /> : <Login />
  );
}

