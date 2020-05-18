import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Keyboard, ActivityIndicator, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import api from '../../services/api';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  UserButtons,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  DeleteUserButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Usuários',
  };

  /* O navigation possui diversas outras propriedades
   * mas testamos somenteas que vamos usar
   */
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    console.tron.log(this.props);

    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({users: JSON.parse(users)});
    }
  }

  /* Como não faz nada após a gravação, não precisa do async/await */
  async componentDidUpdate(_, prevState) {
    const {users} = this.state;

    if (prevState !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleRemoveUser = (user) => {
    const {users} = this.state;

    this.setState({users: users.filter((u) => u !== user)});

    ToastAndroid.show('Usuário removido com sucesso', ToastAndroid.SHORT);
  };

  handleAddUser = async () => {
    const {users, newUser} = this.state;

    if (newUser) {
      this.setState({loading: true});

      try {
        const res = await api.get(`/users/${newUser}`);

        const userAlreadyExist = users.find((x) => x.login === res.data.login);

        if (userAlreadyExist) {
          ToastAndroid.show('Usuário já cadastrado', ToastAndroid.SHORT);
          Keyboard.dismiss();
          return;
        }

        const data = {
          name: res.data.name,
          login: res.data.login,
          bio: res.data.bio,
          avatar: res.data.avatar_url,
        };

        this.setState({
          users: [...users, data],
        });

        ToastAndroid.show('Usuário adicionado com sucesso', ToastAndroid.SHORT);
      } catch (err) {
        if (err.response.status === 404)
          ToastAndroid.show('Usuário não encontrado', ToastAndroid.SHORT);
      } finally {
        this.setState({loading: false, newUser: ''});
      }
    } else {
      ToastAndroid.show('Informe um nome de usuário', ToastAndroid.SHORT);
    }

    Keyboard.dismiss();
  };

  handleNavigate = (user) => {
    const {navigation} = this.props;
    /* Chamada para tela 'User' passando um objeto 'user como parâmetro' */
    navigation.navigate('User', {user});
  };

  render() {
    const {users, newUser, loading} = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCaptalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={(text) => this.setState({newUser: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="adduser" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={(user) => user.login}
          renderItem={({item}) => (
            <User>
              <Avatar source={{uri: item.avatar}} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <UserButtons>
                <ProfileButton onPress={() => this.handleNavigate(item)}>
                  <ProfileButtonText>Ver perfil</ProfileButtonText>
                </ProfileButton>
                <DeleteUserButton onPress={() => this.handleRemoveUser(item)}>
                  <Icon name="deleteuser" size={20} color="#fff" />
                </DeleteUserButton>
              </UserButtons>
            </User>
          )}
        />
      </Container>
    );
  }
}
