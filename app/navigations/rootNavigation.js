import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Home from '../screens/Home/Home.screen';
import DetailProfile from '../screens/DetailProfile/DetailProfile.screen';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home
  },
  DetailProfile: {
    screen: DetailProfile
  }
});

export default createAppContainer(HomeStack);
