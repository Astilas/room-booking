import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';
// import { prisma } from '../src/generated/prisma-client';
import { client } from './utils';
import db  from "../models"

beforeAll(async () => {
   await db.sequelize.sync({ force: true })
})
describe('Tests the register Mutation', () => {
//     it('should not signup a user with a password less than 8 characters', async () => {
//         const register = gql`
//             mutation {
//               register(
//                 username: "John",
//                 email: "john@example.com",
//                 password: "john",
//               ){
//                 username
//                 email
//                 company
//               }
//             }
//             `;

//         await expect(client.mutate({
//             mutation: register
//         })).rejects.toThrowError("password must be more than 8 characters");
//     });

    it('should successfully create a user with valid credentials', async () => {
        const register = gql`
            mutation {
                register(
                  username: "John",
                  company: "pepsi",
                  email: "john@example.com",
                  password: "john",
                ){
                  username
                  email
                  company
                }
              }
          `;

        const res = await client.mutate({
            mutation: register
        })
        const exists = await prisma.$exists.user({ id: res.data.register.id });
        expect(exists).toBe(true);
    });

    it('should not create two users with the same credentials', async () => {
        const register = gql`
        mutation {
            register(
              username: "John",
              company: "pepsi",
              email: "john@example.com",
              password: "dafeMania"
            ){
                username
                email
                company
            }
          }
        `;
        await expect(client.mutate({
            mutation: register
        })).rejects.toThrowError("A unique constraint would be violated on User. Details: Field name = email");
    });
});




// "jest": {
  // "globalSetup": "./tests/config/globalSetup.js",
  // "globalTeardown": "./tests/config/globalTeardown.js"
// },