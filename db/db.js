import { openDB } from "idb";

export async function initializeDB() {
  try {
    const db = await openDB("library", 4, {
      upgrade(db, oldVersion, newVersion, transaction) {
        const requiredStores = ["books", "authors", "quotes"];

        requiredStores.forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
            // console.log(`Created object store: ${store}`);
          }
        });
      },
    });

    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
