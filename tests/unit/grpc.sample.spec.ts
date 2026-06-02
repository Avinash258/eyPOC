import path from "node:path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { describe, expect, it } from "vitest";

interface UserRequest {
  id: string;
}

interface UserResponse {
  id: string;
  name: string;
  role: string;
}

type UserServiceClient = grpc.Client & {
  getUser(
    request: UserRequest,
    callback: (error: grpc.ServiceError | null, response: UserResponse) => void
  ): void;
};

const protoPath = path.resolve(process.cwd(), "tests/fixtures/grpc/user-service.proto");
const packageDefinition = protoLoader.loadSync(protoPath, {
  defaults: true,
  enums: String,
  keepCase: false,
  longs: String,
  oneofs: true
});
const loadedPackage = grpc.loadPackageDefinition(packageDefinition) as any;
const UserService = loadedPackage.qa.samples.UserService;

const getUser = (
  call: grpc.ServerUnaryCall<UserRequest, UserResponse>,
  callback: grpc.sendUnaryData<UserResponse>
): void => {
  callback(null, {
    id: call.request.id,
    name: "Anika QA",
    role: "tester"
  });
};

const createClient = (address: string): UserServiceClient =>
  new UserService(address, grpc.credentials.createInsecure()) as UserServiceClient;

const getUserFromGrpc = (client: UserServiceClient, request: UserRequest): Promise<UserResponse> =>
  new Promise((resolve, reject) => {
    client.getUser(request, (error, response) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(response);
    });
  });

describe("gRPC sample", () => {
  it("calls a local service using the proto contract", async () => {
    const server = new grpc.Server();
    server.addService(UserService.service, { getUser });

    const port = await new Promise<number>((resolve, reject) => {
      server.bindAsync("127.0.0.1:0", grpc.ServerCredentials.createInsecure(), (error, boundPort) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(boundPort);
      });
    });

    const client = createClient(`127.0.0.1:${port}`);

    try {
      const response = await getUserFromGrpc(client, { id: "1" });

      expect(response).toEqual({
        id: "1",
        name: "Anika QA",
        role: "tester"
      });
    } finally {
      client.close();
      server.forceShutdown();
    }
  });
});
