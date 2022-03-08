import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';
import { client } from './utils';
const { sequelize, User } = require('../models');

beforeAll(async () => {
  // await sequelize.sync({ force: true });
  const user = await User.destroy({where : { username: "John"}});
})
describe('Tests the register mutation and login', () => {
    it('should successfully create a user with valid credentials', async () => {
        const register = gql`
            mutation {
                register(
                  username: "John",
                  email: "john@example.com",
                  company: "pepsi",
                  password: "john",
                  confirmPassword: "john",
                ){
                  id
                  username
                  company
                  email
                }
              }
          `;

        const res = await client.mutate({
            mutation: register
        })
        const exists = await User.findOne({ where: { id: res.data.register.id }})
        expect(exists.username).toBe("John");
    });

    it('should not create two users with the same username', async () => {
        const register = gql`
        mutation {
            register(
              username: "John"
              company: "pepsi"
              email: "john@example.com"
              password: "dafeMania"
              confirmPassword: "dafeMania"
            ){
                id
                username
                email
                company
            }
          }
        `;
        await client.mutate({
            mutation: register
        })
        .catch(e => {
          expect(e.graphQLErrors[0].extensions.errors.username).toEqual('username is already taken');
        })
    });

    it('should not login ==> user does not exist', async () => {
      const login = gql`
      mutation {
        login (
          username: "John7"
          password: "john"
        ){
          id
          username
          company
          token
        }
      }
      `;
      await client.mutate({
          mutation: login
      })
      .catch(e => {
        expect(e.graphQLErrors[0].extensions.errors.username).toEqual('user not found');
      })
  });

  it('should not login ==> password incorrect', async () => {
    const login = gql`
    mutation {
      login (
        username: "John"
        password: "anotherPassword"
      ){
        id
        username
        company
        token
      }
    }
    `;
    await client.mutate({
        mutation: login
    })
    .catch(e => {
      expect(e.graphQLErrors[0].extensions.errors.password).toEqual('password is incorrect');
    })
});
    
});
