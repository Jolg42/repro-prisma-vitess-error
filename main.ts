import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  // This query works as expected (no error)
  const tables = await prisma.$queryRaw`
      SELECT DISTINCT
       table_info.table_name AS table_name,
      table_info.create_options AS create_options,
      table_info.table_comment AS table_comment
    FROM information_schema.tables AS table_info
    JOIN information_schema.columns AS column_info
        ON  column_info.table_name = table_info.table_name
    WHERE
        table_info.table_schema = 'reprovitess'
        AND column_info.table_schema = 'reprovitess'
        -- Exclude views.
        AND table_info.table_type = 'BASE TABLE'
    ORDER BY table_info.table_name
`;
  console.log({ tables });

  prisma.$disconnect();
}

main();
