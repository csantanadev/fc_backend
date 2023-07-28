import { User } from "../user.entity";
import { test, expect, describe } from "vitest";

describe("User Entity", () => {
  test("Should be able to create a new user", async () => {
    const user = await User.create({
      name: "USER_NAME",
      username: "USERNAME",
      password: "PASSWORD_TEST",
      cpf: "06386116445",
      date_birth : new Date('1985-11-04'),
      email: 'carlos@gmail.com',
      phone: '89899898',
      mother_name: 'fulana'
    });

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty("id");
    expect(user.password).not.equal("PASSWORD_TEST");
  });
});
