"use client";

//* Libraries imports
import useSWR from "swr";
import z from "zod";

const apiResponseSchema = z.object({
  status: z.string(),
  updated_at: z.coerce.date(),
  database: z.object({
    version: z.string(),
    connection: z.string(),
    max_connections: z.coerce.number(),
    used_connections: z.coerce.number(),
  }),
});

type ApiResponse = z.infer<typeof apiResponseSchema>;

async function getStatus(key) {
  const response = await fetch(key, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  const responseBody = (await response.json()) as unknown;
  return apiResponseSchema.parse(responseBody);
}

export default function StatusPage() {
  const response = useSWR("/api/v1/status", getStatus, {
    refreshInterval: 2000,
  });
  console.log(response.isLoading);

  return (
    <div className="w-full min-h-svh flex justify-center items-center flex-col">
      <h1>Status</h1>
      {response.isLoading && !response.data ? (
        <span>Carregando</span>
      ) : (
        <>
          <UpdatedAt />
          {response.data?.database && (
            <DatabaseStatus database={response.data?.database} />
          )}
        </>
      )}
    </div>
  );
}

function UpdatedAt() {
  const response = useSWR("/api/v1/status", getStatus, {
    refreshInterval: 2000,
  });

  let updatedAtText: string = "Carregando...";

  if (!response.isLoading && response.data) {
    const updatedAt = new Date(response.data.updated_at);
    updatedAtText = updatedAt.toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

type DatabaseStatusProps = {
  database: ApiResponse["database"];
};

function DatabaseStatus(props: DatabaseStatusProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Status do Banco
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Informações atuais da conexão e uso
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Conexão
          </span>
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {props.database.connection}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Versão
          </span>
          <span className="text-sm font-mono font-semibold text-zinc-900 dark:text-zinc-100">
            {props.database.version}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Máx. conexões
          </span>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {props.database.max_connections}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Conexões em uso
          </span>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {props.database.used_connections}
          </span>
        </div>
      </div>
    </div>
  );
}
