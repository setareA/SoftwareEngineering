const userDao = require("../userDao");
const db = require("../db");

const initializeDB = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "DELETE FROM users; DELETE FROM customer; DELETE FROM shopemployee;";
    db.run(sql, [], (err) => {
      if (err) {
        reject(err);
        return;
      } else resolve();
    });
  });
};

const addUserForTest = (user, userId, hash, role) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users(USERID, USERNAME, HASH, ROLE) VALUES (?, ? , ? , ?)";
    db.run(sql, [userId, user.username, hash, role], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

describe("Test userDao functions", () => {
  beforeAll(() => {
    initializeDB();
  });

  afterAll(() => {
    initializeDB();
  });

  test("test checkIfUserNotExists while it deosn't", async () => {
    return expect(
      userDao.checkIfUserNotExists("setare@polito.it")
    ).resolves.toBe();
  });

  test("test checkIfUserNotExists while it deos", async () => {
    const newUser = {
      name: "setare",
      surname: "askari",
      username: "setare@polito.it",
      password: "123456",
    };
    addUserForTest(newUser, 1, "123456", "customer")
      .then(() => {
        return expect(
          userDao.checkIfUserNotExists("setare@polito.it")
        ).rejects.toEqual({ code: 409, msg: "user already exits." });
      })
      .catch(() => {});
  });
});
