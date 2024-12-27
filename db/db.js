import { openDB } from "idb";

export async function initializeDB() {
  // console.log("Initializing DB");
  try {
    return await openDB("library", 2, {
      upgrade(db) {
        // console.log("Running upgrade");
        const objectStores = ["books", "authors", "quotes"];
        objectStores.forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
            //console.log(`Object store '${store}' created`);
          } else {
            //console.log(`Object store '${store}' already exists`);
          }
        });
      },
    });
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
