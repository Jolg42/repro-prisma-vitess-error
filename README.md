## Reproduction steps

```sh
docker-compose up -d vitess-8

npm i

# First time works
RUST_LOG=debug DEBUG=* npx prisma db push --force-reset

# Second time should fail
RUST_LOG=debug DEBUG=* npx prisma db push --force-reset
```

The query running can be found in the logs below.
I tried to run it separately using `mysql` or TablePlus and could not reproduce the error.
The error only appears when using our Rust, Schema engine.

Note that removing `BINARY` from the query fixes the issue, you can try this by changing the Prisma packages version from `5.1.1` to `5.2.0-integration-engines-5-2-0-14-joel-basedon-vitess-docker-image-version-update-5a2d26a26c5f7f7ca0deb9908246abfafd259a65.1`

Full logs

```
 prisma:engines  binaries to download libquery-engine, schema-engine +0ms
  prisma:loadEnv  project root found at /Users/j42/Repros/vitess/package.json +0ms
  prisma:tryLoadEnv  Environment variables not found at null +0ms
  prisma:tryLoadEnv  Environment variables not found at undefined +0ms
  prisma:tryLoadEnv  No Environment variables loaded +0ms
  prisma:getConfig  Using getConfig Wasm +0ms
  prisma:getConfig  config data retrieved without errors in getConfig Wasm +1ms
  prisma:loadEnv  project root found at /Users/j42/Repros/vitess/package.json +3ms
  prisma:tryLoadEnv  Environment variables not found at null +2ms
  prisma:tryLoadEnv  Environment variables not found at undefined +0ms
  prisma:tryLoadEnv  No Environment variables loaded +0ms
Prisma schema loaded from prisma/schema.prisma
  prisma:getConfig  Using getConfig Wasm +1ms
  prisma:getConfig  config data retrieved without errors in getConfig Wasm +0ms
Datasource "db": MySQL database "reprovitess" at "127.0.0.1:33807"
  prisma:getConfig  Using getConfig Wasm +2ms
  prisma:getConfig  config data retrieved without errors in getConfig Wasm +1ms

  prisma:schemaEngine:rpc  starting Schema engine with binary: /Users/j42/Repros/vitess/node_modules/@prisma/engines/schema-engine-darwin-arm64 +0ms
  prisma:schemaEngine:rpc  SENDING RPC CALL {"id":1,"jsonrpc":"2.0","method":"reset"} +5ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.904482Z","level":"INFO","fields":{"message":"Starting schema engine RPC server","git_hash":"6a3747c37ff169c90047725a05a6ef02e32ac97e"},"target":"schema_engine"} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.905034Z","level":"DEBUG","fields":{"message":"running the command","cmd":"\"reset\""},"target":"schema_core::rpc"} +1ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.905069Z","level":"DEBUG","fields":{"message":"Resetting the database."},"target":"schema_core::state"} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.912601Z","level":"DEBUG","fields":{"query_type":"query_raw","sql":"SELECT @@version, @@GLOBAL.version","params":"[]"},"target":"sql_schema_connector::flavour::mysql::connection","span":{"name":"Reset"},"spans":[{"name":"Reset"}]} +7ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.914029Z","level":"DEBUG","fields":{"query":"SELECT @@version, @@GLOBAL.version","params":"[]","result":"success","item_type":"query","is_query":true,"duration_ms":1},"target":"quaint::connector::metrics","span":{"db.statement":"SELECT @@version, @@GLOBAL.version","name":"quaint:query"},"spans":[{"name":"Reset"},{"db.statement":"SELECT @@version, @@GLOBAL.version","name":"quaint:query"}]} +2ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.914045Z","level":"DEBUG","fields":{"message":"quaint:query{db.statement: SELECT @@version, @@GLOBAL.version}: Span closed. Elapsed: 1.418709ms","span_timing_μs":1418},"target":"schema_core::timings","span":{"name":"Reset"},"spans":[{"name":"Reset"}]} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.914059Z","level":"DEBUG","fields":{"query_type":"query_raw","sql":"SELECT @@lower_case_table_names","params":"[]"},"target":"sql_schema_connector::flavour::mysql::connection","span":{"name":"Reset"},"spans":[{"name":"Reset"}]} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.915882Z","level":"DEBUG","fields":{"query":"SELECT @@lower_case_table_names","params":"[]","result":"success","item_type":"query","is_query":true,"duration_ms":1},"target":"quaint::connector::metrics","span":{"db.statement":"SELECT @@lower_case_table_names","name":"quaint:query"},"spans":[{"name":"Reset"},{"db.statement":"SELECT @@lower_case_table_names","name":"quaint:query"}]} +1ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.915899Z","level":"DEBUG","fields":{"message":"quaint:query{db.statement: SELECT @@lower_case_table_names}: Span closed. Elapsed: 1.833625ms","span_timing_μs":1833},"target":"schema_core::timings","span":{"name":"Reset"},"spans":[{"name":"Reset"}]} +1ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.915931Z","level":"INFO","fields":{"message":"Attempting best_effort_reset"},"target":"sql_schema_connector","span":{"namespaces":"None","name":"best_effort_reset"},"spans":[{"name":"Reset"},{"namespaces":"None","name":"best_effort_reset"}]} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.917115Z","level":"DEBUG","fields":{"query":"SELECT @@GLOBAL.version version","params":"[]","result":"success","item_type":"query","is_query":true,"duration_ms":1},"target":"quaint::connector::metrics","span":{"db.statement":"SELECT @@GLOBAL.version version","name":"quaint:query"},"spans":[{"name":"Reset"},{"namespaces":"None","name":"best_effort_reset"},{"name":"describe_schema"},{"schemas":"[\"reprovitess\"]","name":"describe"},{"db.statement":"SELECT @@GLOBAL.version version","name":"quaint:query"}]} +1ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.917126Z","level":"DEBUG","fields":{"message":"quaint:query{db.statement: SELECT @@GLOBAL.version version}: Span closed. Elapsed: 1.12025ms","span_timing_μs":1120},"target":"schema_core::timings","span":{"schemas":"[\"reprovitess\"]","name":"describe"},"spans":[{"name":"Reset"},{"namespaces":"None","name":"best_effort_reset"},{"name":"describe_schema"},{"schemas":"[\"reprovitess\"]","name":"describe"}]} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.920354Z","level":"DEBUG","fields":{"query":"SELECT TABLE_NAME AS view_name, VIEW_DEFINITION AS view_sql\nFROM INFORMATION_SCHEMA.VIEWS\nWHERE TABLE_SCHEMA = ?;\n","params":"[\"reprovitess\"]","result":"success","item_type":"query","is_query":true,"duration_ms":3},"target":"quaint::connector::metrics","span":{"db.statement":"SELECT TABLE_NAME AS view_name, VIEW_DEFINITION AS view_sql\nFROM INFORMATION_SCHEMA.VIEWS\nWHERE TABLE_SCHEMA = ?;\n","name":"quaint:query"},"spans":[{"name":"Reset"},{"namespaces":"None","name":"best_effort_reset"},{"name":"describe_schema"},{"schemas":"[\"reprovitess\"]","name":"describe"},{"schema":"reprovitess","name":"get_views"},{"db.statement":"SELECT TABLE_NAME AS view_name, VIEW_DEFINITION AS view_sql\nFROM INFORMATION_SCHEMA.VIEWS\nWHERE TABLE_SCHEMA = ?;\n","name":"quaint:query"}]} +3ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.920392Z","level":"DEBUG","fields":{"message":"quaint:query{db.statement: SELECT TABLE_NAME AS view_name, VIEW_DEFINITION AS view_sql\nFROM INFORMATION_SCHEMA.VIEWS\nWHERE TABLE_SCHEMA = ?;\n}: Span closed. Elapsed: 3.236709ms","span_timing_μs":3236},"target":"schema_core::timings","span":{"schema":"reprovitess","name":"get_views"},"spans":[{"name":"Reset"},{"namespaces":"None","name":"best_effort_reset"},{"name":"describe_schema"},{"schemas":"[\"reprovitess\"]","name":"describe"},{"schema":"reprovitess","name":"get_views"}]} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.920414Z","level":"DEBUG","fields":{"message":"get_views{schema: \"reprovitess\"}: Span closed. Elapsed: 3.262542ms","span_timing_μs":3262},"target":"schema_core::timings","span":{"schemas":"[\"reprovitess\"]","name":"describe"},"spans":[{"name":"Reset"},{"namespaces":"None","name":"best_effort_reset"},{"name":"describe_schema"},{"schemas":"[\"reprovitess\"]","name":"describe"}]} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.927824Z","level":"DEBUG","fields":{"query":"\n            SELECT DISTINCT\n              BINARY table_info.table_name AS table_name,\n              table_info.create_options AS create_options,\n              table_info.table_comment AS table_comment\n            FROM information_schema.tables AS table_info\n            JOIN information_schema.columns AS column_info\n                ON BINARY column_info.table_name = BINARY table_info.table_name\n            WHERE\n                table_info.table_schema = ?\n                AND column_info.table_schema = ?\n                -- Exclude views.\n                AND table_info.table_type = 'BASE TABLE'\n            ORDER BY BINARY table_info.table_name","params":"[\"reprovitess\",\"reprovitess\"]","result":"error","item_type":"query","is_query":true,"duration_ms":7},"target":"quaint::connector::metrics","span":{"db.statement":"\n            SELECT DISTINCT\n              BINARY table_info.table_name AS table_name,\n              table_info.create_options AS create_options,\n              table_info.table_comment AS table_comment\n            FROM information_schema.tables AS table_info\n            JOIN information_schema.columns AS column_info\n                ON BINARY column_info.table_name = BINARY table_info.table_name\n            WHERE\n                table_info.table_schema = ?\n                AND column_info.table_schema = ?\n                -- Exclude views.\n                AND table_info.table_type = 'BASE TABLE'\n            ORDER BY BINARY table_info.table_name","name":"quaint:query"},"spans":[{"name":"Reset"},{"namespaces":"None","name":"best_effort_reset"},{"name":"describe_schema"},{"schemas":"[\"reprovitess\"]","name":"describe"},{"schema":"reprovitess","sql_schema":"SqlSchema { namespaces: [], tables: [], enums: [], enum_variants: [], table_columns: [], foreign_keys: [], table_default_values: [], view_default_values: [], foreign_key_columns: [], indexes: [], index_columns: [], check_constraints: [], views: [], view_columns: [], procedures: [], user_defined_types: [], connector_data: <ConnectorData> }","name":"get_table_names"},{"db.statement":"\n            SELECT DISTINCT\n              BINARY table_info.table_name AS table_name,\n              table_info.create_options AS create_options,\n              table_info.table_comment AS table_comment\n            FROM information_schema.tables AS table_info\n            JOIN information_schema.columns AS column_info\n                ON BINARY column_info.table_name = BINARY table_info.table_name\n            WHERE\n                table_info.table_schema = ?\n                AND column_info.table_schema = ?\n                -- Exclude views.\n                AND table_info.table_type = 'BASE TABLE'\n            ORDER BY BINARY table_info.table_name","name":"quaint:query"}]} +7ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.927855Z","level":"DEBUG","fields":{"message":"quaint:query{db.statement: \n            SELECT DISTINCT\n              BINARY table_info.table_name AS table_name,\n              table_info.create_options AS create_options,\n              table_info.table_comment AS table_comment\n            FROM information_schema.tables AS table_info\n            JOIN information_schema.columns AS column_info\n                ON BINARY column_info.table_name = BINARY table_info.table_name\n            WHERE\n                table_info.table_schema = ?\n                AND column_info.table_schema = ?\n                -- Exclude views.\n                AND table_info.table_type = 'BASE TABLE'\n            ORDER BY BINARY table_info.table_name}: Span closed. Elapsed: 7.38875ms","span_timing_μs":7388},"target":"schema_core::timings","span":{"schema":"reprovitess","sql_schema":"SqlSchema { namespaces: [], tables: [], enums: [], enum_variants: [], table_columns: [], foreign_keys: [], table_default_values: [], view_default_values: [], foreign_key_columns: [], indexes: [], index_columns: [], check_constraints: [], views: [], view_columns: [], procedures: [], user_defined_types: [], connector_data: <ConnectorData> }","name":"get_table_names"},"spans":[{"name":"Reset"},{"namespaces":"None","name":"best_effort_reset"},{"name":"describe_schema"},{"schemas":"[\"reprovitess\"]","name":"describe"},{"schema":"reprovitess","sql_schema":"SqlSchema { namespaces: [], tables: [], enums: [], enum_variants: [], table_columns: [], foreign_keys: [], table_default_values: [], view_default_values: [], foreign_key_columns: [], indexes: [], index_columns: [], check_constraints: [], views: [], view_columns: [], procedures: [], user_defined_types: [], connector_data: <ConnectorData> }","name":"get_table_names"}]} +1ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.92787Z","level":"DEBUG","fields":{"message":"get_table_names{schema: \"reprovitess\", sql_schema: SqlSchema { namespaces: [], tables: [], enums: [], enum_variants: [], table_columns: [], foreign_keys: [], table_default_values: [], view_default_values: [], foreign_key_columns: [], indexes: [], index_columns: [], check_constraints: [], views: [], view_columns: [], procedures: [], user_defined_types: [], connector_data: <ConnectorData> }}: Span closed. Elapsed: 7.411625ms","span_timing_μs":7411},"target":"schema_core::timings","span":{"name":"describe_schema"},"spans":[{"name":"Reset"},{"namespaces":"None","name":"best_effort_reset"},{"name":"describe_schema"}]} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.927875Z","level":"DEBUG","fields":{"message":"describe{schemas: [\"reprovitess\"]}: Span closed. Elapsed: 11.910333ms","span_timing_μs":11910},"target":"schema_core::timings","span":{"name":"describe_schema"},"spans":[{"name":"Reset"},{"namespaces":"None","name":"best_effort_reset"},{"name":"describe_schema"}]} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.927921Z","level":"DEBUG","fields":{"message":"describe_schema{}: Span closed. Elapsed: 11.984833ms","span_timing_μs":11984},"target":"schema_core::timings"} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.927924Z","level":"DEBUG","fields":{"message":"best_effort_reset{namespaces: None}: Span closed. Elapsed: 11.994625ms","span_timing_μs":11994},"target":"schema_core::timings"} +0ms
  prisma:schemaEngine:stderr  {"timestamp":"2023-08-10T15:40:33.927926Z","level":"DEBUG","fields":{"message":"Reset{}: Span closed. Elapsed: 22.726291ms","span_timing_μs":22726},"target":"schema_core::timings"} +0ms
  prisma:schemaEngine:rpc  {
  jsonrpc: '2.0',
  error: {
    code: 4466,
    message: 'An error happened. Check the data field for details.',
    data: {
      is_panic: false,
      message: 'The fallback method for database resets failed, meaning Migrate could not clean up the database entirely. Original error: \n' +
        'text type with an unknown/unsupported collation cannot be hashed\n' +
        '   0: sql_schema_connector::flavour::mysql::connection::describe_schema\n' +
        '             at schema-engine/connectors/sql-schema-connector/src/flavour/mysql/connection.rs:34\n' +
        '   1: sql_schema_connector::best_effort_reset\n' +
        '           with namespaces=None\n' +
        '             at schema-engine/connectors/sql-schema-connector/src/lib.rs:344\n' +
        '   2: schema_core::state::Reset\n' +
        '             at schema-engine/core/src/state.rs:428',
      meta: [Object],
      error_code: 'P3016'
    }
  },
  id: 1
} +27ms
Error: Error: P3016

The fallback method for database resets failed, meaning Migrate could not clean up the database entirely. Original error:
text type with an unknown/unsupported collation cannot be hashed
   0: sql_schema_connector::flavour::mysql::connection::describe_schema
             at schema-engine/connectors/sql-schema-connector/src/flavour/mysql/connection.rs:34
   1: sql_schema_connector::best_effort_reset
           with namespaces=None
             at schema-engine/connectors/sql-schema-connector/src/lib.rs:344
   2: schema_core::state::Reset
             at schema-engine/core/src/state.rs:428

    at Object.<anonymous> (/Users/j42/Repros/vitess/node_modules/prisma/build/index.js:93540:25)
    at SchemaEngine.handleResponse (/Users/j42/Repros/vitess/node_modules/prisma/build/index.js:93388:36)
    at LineStream2.<anonymous> (/Users/j42/Repros/vitess/node_modules/prisma/build/index.js:93491:16)
    at LineStream2.emit (node:events:513:28)
    at addChunk (node:internal/streams/readable:315:12)
    at readableAddChunk (node:internal/streams/readable:289:9)
    at LineStream2.Readable.push (node:internal/streams/readable:228:10)
    at LineStream2._pushBuffer (/Users/j42/Repros/vitess/node_modules/prisma/build/index.js:93167:17)
    at LineStream2._transform (/Users/j42/Repros/vitess/node_modules/prisma/build/index.js:93161:8)
    at LineStream2.Transform._write (node:internal/streams/transform:205:23)
```
