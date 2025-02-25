import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login';
import Main from './mainScreen'
import Detail from './detailScreen'
import Register from './register'
import Home from './home'
import Favourite from './favourite'
import Setting from './setting';
import Admin from './AdminScreen';
import Cart from './CartScreen';
import { CartProvider } from './CartContext';
import personDetail from './personDetail'
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  subtitle: string;
  image: string;
  rating: number;
  reviews: number;
  sizes?: { size: string; price: number }[];
  weights?: { weight: string; price: number }[];
  tags: string[];
  roastType: string;
  type: 'drink' | 'bean';
  favorite?: boolean; // Thêm trường favorite
}
export type RootStackParamList = {
  Cart:undefined;
  Login: undefined;
  Main: undefined;
  Detail: { products: Product }; // Thêm tham số products
  Register: undefined;
  Home: undefined;
  Favourite: { products: Product }; // Thêm tham số products
  Setting: undefined;
  Admin: undefined;
  personDetail:undefined;
};
const Stack = createNativeStackNavigator()
const Index = () => {
    
    return (
      <CartProvider>
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Detail" component={Detail}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name='Favourite' component={Favourite}/>
        <Stack.Screen name='Setting' component={Setting}/>
        <Stack.Screen name='Admin' component={Admin}/>
        <Stack.Screen name='Cart' component={Cart}/>
        <Stack.Screen name="personDetail" component={personDetail}/>
      </Stack.Navigator>
    </CartProvider>
    )
   
};

export default Index;

