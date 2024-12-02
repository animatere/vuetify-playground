import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [] as { id: number; message: string; type: string }[],
    position: "top-right" as
      | "top-right"
      | "top-left"
      | "top-center",
  }),
  actions: {
    addNotification(message: string, type: string = "info") {
      const id = Date.now();
      this.notifications.push({ id, message, type });
      // Entfernt die Benachrichtigung automatisch nach 5 Sekunden
      setTimeout(() => this.removeNotification(id), 2200);
    },
    removeNotification(id: number) {
      this.notifications = this.notifications.filter((n) => n.id !== id);
    },
    setPosition(
      newPosition:
        | "top-right"
        | "top-left"
        | "top-center",
    ) {
      this.position = newPosition;
    },
  },
});
