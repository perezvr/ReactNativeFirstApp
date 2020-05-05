import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

/**
 * Criação das rotas da aplicação
 *
 * createAppContainer => Contém as configurações para as rotas funcionarem
 * createStackNavigator => Contém um tipo de configuração de rotas
 */
const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      },
    },
  ),
);

export default Routes;
