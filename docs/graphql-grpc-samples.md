# GraphQL and gRPC Samples

## What GraphQL Is

GraphQL is an API query language. A client sends one request that says exactly which fields it needs, and the server returns data in the same shape.

Use GraphQL when:

- UI screens need flexible data from several backend objects.
- Clients should avoid over-fetching or under-fetching fields.
- The API contract is best described as a schema with types and fields.

Sample in this project: `tests/unit/graphql.sample.spec.ts`

## What gRPC Is

gRPC is a high-performance RPC protocol. The contract is defined in a `.proto` file, and clients call service methods like functions.

Use gRPC when:

- Backend services talk to each other frequently.
- Low latency and strong typed contracts matter.
- Streaming or binary protocol efficiency is useful.

Sample in this project:

- Contract: `tests/fixtures/grpc/user-service.proto`
- Test: `tests/unit/grpc.sample.spec.ts`

## Quick Difference

| Topic | GraphQL | gRPC |
| --- | --- | --- |
| Style | Query API | Remote procedure call |
| Contract | GraphQL schema | Protocol Buffers `.proto` |
| Common use | Frontend to backend | Service to service |
| Payload | Usually JSON over HTTP | Protobuf over HTTP/2 |
| Client asks for | Fields it wants | Method it wants to call |

## Run The Samples

```bash
npm run test:unit
```

