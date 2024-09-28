export function sendAnalytics(
  eventName: "unlock" | "achievementDetail" | "memberDetail" | "",
  url: string,
): void {
  window.gtag("event", eventName, {
    items: [
      {
        item_id: url,
      },
    ],
  });
}
