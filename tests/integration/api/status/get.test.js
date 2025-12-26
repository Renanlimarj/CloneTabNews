test("Get to /api/v1/status return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_At).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_At).toISOString();
  expect(responseBody.updated_At).toBe(parsedUpdatedAt);

  const databaseVersion = responseBody.dependencies.database.version.slice(0,4)

  const nodeEnv = process.env.NODE_ENV;
  console.log(nodeEnv);


  expect(responseBody.environment).toBe(nodeEnv);
  expect(databaseVersion).toEqual("17.7");
  expect(responseBody.dependencies.database.max_connections).toEqual(450);
  expect(responseBody.dependencies.database.active_connections).toEqual(1);
});
