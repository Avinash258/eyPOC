import { buildSchema, graphql } from "graphql";
import { describe, expect, it } from "vitest";

const schema = buildSchema(`
  type Query {
    user(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    role: String!
  }
`);

const users = [
  { id: "1", name: "Anika QA", role: "tester" },
  { id: "2", name: "Ravi API", role: "developer" }
];

const rootValue = {
  user: ({ id }: { id: string }) => users.find((user) => user.id === id) ?? null
};

describe("GraphQL sample", () => {
  it("returns only the fields requested by the query", async () => {
    const result = await graphql({
      schema,
      rootValue,
      source: `
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
          }
        }
      `,
      variableValues: { id: "1" }
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      user: {
        id: "1",
        name: "Anika QA"
      }
    });
  });
});
