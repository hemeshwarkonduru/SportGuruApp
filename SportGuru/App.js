import NavigationAll from "./Navigation/NavigationAll";
import { useEmailUser } from './Component/ZustandEmail'; 
import Login from "./Login/Login";
import MySchedule from "./Home/MySchedule";


export default function App() {

  const emailUser = useEmailUser((state) => state.email);
  return (
    emailUser ? <NavigationAll /> : <Login />
  );
}

