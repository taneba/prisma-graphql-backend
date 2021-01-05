/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @typedef { import("@prisma/client").UserCreateArgs } UserCreateArgs
 */
import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    # healthcheck
    time: Int!
    users: [User!]!
  }
  type User {
    id: ID!
    email: String!
    name: String!
    words: [Word!]!
    languages: [Language!]!
  }
  type Word {
    id: ID!
    createdAt: String
    updatedAt: String
    name: String!
    description: String
    user: User
    language: Language
  }
  type Language {
    id: ID!
    name: String!
    users: [User!]!
    words: [Word!]!
  }
`
