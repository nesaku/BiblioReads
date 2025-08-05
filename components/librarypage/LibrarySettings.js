import React, { useState, useRef } from "react";
import { initializeDB } from "@/db/db";
import Toast from "../global/Toast";
import SmallLoader from "../global/SmallLoader";

const LibrarySettings = () => {
  const [importFile, setImportFile] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [overwriteData, setOverwriteData] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();

  // Get and export all library data in a JSON file with a timestamp
  const handleExport = async () => {
    setIsLoading(true);
    try {
      const db = await initializeDB();
      const [books, authors, quotes] = await Promise.all([
        db.getAll("books"),
        db.getAll("authors"),
        db.getAll("quotes"),
      ]);

      const exportData = { books, authors, quotes };
      const now = new Date();
      const timestamp = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const filename = `library-export-${timestamp}.json`;

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      setToastMessage("Library exported successfully");
      setToastType("success");
    } catch (error) {
      console.error("Export failed:", error);
      setToastMessage("Error exporting library");
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImportFile(file);
      setShowImportModal(true);
    }
  };

  // Confirm import
  const confirmImport = async () => {
    setShowImportModal(false);
    if (!importFile) return;

    setIsLoading(true);
    try {
      const text = await importFile.text();
      const data = JSON.parse(text);

      if (
        typeof data !== "object" ||
        !["books", "authors", "quotes"].every((key) => Array.isArray(data[key]))
      ) {
        setToastMessage("Invalid file format");
        setToastType("error");
        setIsLoading(false);
        return;
      }

      const db = await initializeDB();

      if (overwriteData) {
        for (const store of ["books", "authors", "quotes"]) {
          const keys = await db.getAllKeys(store);
          const tx = db.transaction(store, "readwrite");
          const objectStore = tx.objectStore(store);
          keys.forEach((key) => objectStore.delete(key));
          await tx.done;
        }
      }

      const insertTx = db.transaction(
        ["books", "authors", "quotes"],
        "readwrite"
      );
      for (const [store, items] of Object.entries(data)) {
        items.forEach((item) => {
          const key = item.id || crypto.randomUUID();
          insertTx.objectStore(store).put(item, key);
        });
      }
      await insertTx.done;

      setToastMessage("Library imported successfully");
      setToastType("success");
      setImportFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      window.location.reload();
    } catch (error) {
      console.error("Import failed:", error);
      setToastMessage("Error importing library");
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete all data from every store
  const handleDeleteAll = async () => {
    setIsLoading(true);
    try {
      const db = await initializeDB();
      for (const store of ["books", "authors", "quotes"]) {
        const keys = await db.getAllKeys(store);
        const tx = db.transaction(store, "readwrite");
        const objectStore = tx.objectStore(store);
        keys.forEach((key) => objectStore.delete(key));
        await tx.done;
      }
      setToastMessage("Library data deleted");
      setToastType("success");
      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error);
      setToastMessage("Error deleting library");
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center px-10 py-2">
      <div id="exportLibrary" className="m-8 sm:m-10">
        <h3 className="mb-2 text-2xl font-semibold capitalize text-gray-700 dark:text-gray-300">
          Export Library
        </h3>
        <button
          onClick={handleExport}
          className="bg-rose-500 text-white font-semibold px-4 py-2 rounded hover:bg-rose-600"
        >
          Export
        </button>
      </div>

      <div
        id="importLibrary"
        className="flex flex-col justify-center items-center m-8 sm:m-10"
      >
        <label className="mb-2 text-2xl font-semibold capitalize text-gray-700 dark:text-gray-300">
          Import Library
        </label>
        <input
          type="file"
          accept="application/json"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="font-medium w-sm px-2 py-10 text-center text-gray-900 bg-gray-50/80 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
        />
        <label className="flex items-center mt-4 text-md font-medium text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={overwriteData}
            onChange={() => setOverwriteData((v) => !v)}
            className="mr-2"
          />
          Overwrite existing library data
        </label>
      </div>

      <div id="deleteLibrary" className="m-8 sm:m-10">
        <h3 className="mb-2 text-2xl font-semibold capitalize text-gray-700 dark:text-gray-300">
          Delete Library
        </h3>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 text-white font-bold px-4 py-2 rounded hover:bg-red-700"
        >
          Delete All Library Data
        </button>
      </div>

      {/* Import Confirmation Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Confirm Import
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to import this file?{" "}
              {overwriteData ? (
                <span className="font-bold">
                  This will overwrite your existing library.
                </span>
              ) : (
                "This will merge with existing data."
              )}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmImport}
                className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to{" "}
              <span className="font-bold">delete all library data</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/*    {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <SmallLoader other={true} />
        </div>
      )} */}

      {toastMessage && <Toast message={toastMessage} type={toastType} />}
    </div>
  );
};

export default LibrarySettings;
