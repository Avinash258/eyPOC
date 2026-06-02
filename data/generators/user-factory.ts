import { faker } from "@faker-js/faker";

export interface UserPayload {
  id?: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export const buildUser = (): UserPayload => ({
  name: faker.person.fullName(),
  username: faker.internet.username(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  website: faker.internet.domainName()
});

export const buildUsers = (count: number): UserPayload[] =>
  Array.from({ length: count }, () => buildUser());
