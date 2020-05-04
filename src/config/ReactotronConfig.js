import Reacttotron from 'reactotron-react-native';

/**
 * Só será executado quando estiver rodando em um emulador
 */
if (__DEV__) {
  const tron = Reacttotron.configure().useReactNative().connect();

  /* Criando uma nova  variável dentro do console para lançar os logs para o Reactotron */
  console.tron = tron;

  /* Limpa a timeline toda vez que fizer um refresh na aplicação */
  tron.clear();
}
