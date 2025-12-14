import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("show server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  console.log(databaseVersionResult);

  const databaseMaxConnectionsResult = await database.query(
    "show max_connections;"
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const query = {
    text: "select count(*)::int from pg_stat_activity where datname = $1",
    values: [process.env.POSTGRES_DATABASE],
  };
  const databaseActiveConnectionsResult = await database.query(query);
  const databaseActiveConnectionsValue =
    databaseActiveConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_At: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        active_connections: parseInt(databaseActiveConnectionsValue),
      },
    },
  });
}

export default status;
