import { GraphQLExtension } from 'apollo-server-express'
import { Context, createContext } from './context'
import * as gql from './generated/graphql'

const resolvers: gql.Resolvers<Context> = {
  Query: {
    time: (_parent, _params, _ctx: Context) => Math.floor(Date.now() / 1000),
    users: (_parent, _params, _ctx: Context) =>
      _ctx.prisma.user.findMany({
        include: {
          languages: true,
          words: true,
        },
      }),
  },
  User: {
    languages: (parent, params, ctx: Context) =>
      ctx.prisma.user.findUnique({ where: { id: parent.id } }).languages(),
    words: (parent, params, ctx: Context) =>
      ctx.prisma.user.findUnique({ where: { id: parent.id } }).words(),
  },
  Language: {
    users: (parent, params, ctx: Context) =>
      ctx.prisma.language.findUnique({ where: { id: parent.id } }).users(),
  },
  Word: {
    user: (parent, params, ctx: Context) =>
      ctx.prisma.word.findUnique({ where: { id: parent.id } }).user(),
    language: (parent, params, ctx: Context) =>
      ctx.prisma.word.findUnique({ where: { id: parent.id } }).language(),
  },
}

export default resolvers
