export function handleSWRError(data: unknown, error: any): Error | never {
  if (error != null) {
    return Error(`Error occurred while fetching data!: ${error}`, {
      cause: error,
    });
  }

  if (data == null) {
    return Error("Fetched data successfully but data is null");
  }

  throw Error("Unknown error");
}
