export function localStorageProvider(): Map<string, any> | undefined {
  console.log(import.meta.env.VITE_USE_CACHE_AS_LOCAL_STORAGE);
  if (import.meta.env.VITE_USE_CACHE_AS_LOCAL_STORAGE !== "1") {
    return undefined;
  }

  // 初期化時に、 `localStorage` から Map にデータを復元します。
  const map = new Map<string, any>(
    JSON.parse(localStorage.getItem("app-cache") ?? "[]") as
      | Iterable<readonly [string, any]>
      | null
      | undefined,
  );

  // アプリが終了する前に、すべてのデータを `localStorage` に保存します。
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });

  // パフォーマンスのために、書き込みと読み取りには引き続き Map を使用します。
  return map;
}
