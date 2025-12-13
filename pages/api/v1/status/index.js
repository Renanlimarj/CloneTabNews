import database from "infra/database.js";


async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("show server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version; 
  
  const databaseMaxConnectionsResult = await database.query("show max_connections;");
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

  console.log(databaseVersionValue);

  response.status(200).json({
    updated_At: updatedAt,
    dependencies: {
      database: {
        version : databaseVersionValue,
        max_connections : parseInt(databaseMaxConnectionsValue)  
      }
    }
  });
}

export default status;
