import { openDB } from "idb";

export async function initializeDB() {
  try {
    return await openDB("library", 2, {
      upgrade(db) {
        const objectStores = ["books", "authors", "quotes"];
        objectStores.forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
          }
        });
      },
    });
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
