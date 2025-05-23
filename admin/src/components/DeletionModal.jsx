import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "./Modal";
import { useContext, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "./LoadingSpinner";

import { ModalContext } from "./Modal";
import { createPortal } from "react-dom";

function DeletionModal({ targetName, mutationFuntion, queryKey, modalKey }) {
  const { close } = useContext(ModalContext);
  const closeRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        return await mutationFuntion();
      } catch (error) {
        console.error("Deletion error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
      close();
      toast.success(`${targetName} has been deleted!`);
      setErrorMessage("");
    },
    onError: (err) => {
      const message = err.message || "An error occurred during deletion";
      setErrorMessage(message);
      toast.error(message);
      console.error("Deletion error:", err);
    },
  });

  return (
    <>
      <Modal.ToggleOpen modalKey={modalKey}>
        <button
          type="button"
          className="inline-flex w-full items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400"
        >
          <span>
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <span>Delete</span>
        </button>
      </Modal.ToggleOpen>

      <Modal.Overlay modalKey={modalKey}>
        <Modal.Wrapper>
          <div className="w-[90%] max-w-[620px] p-5 mt-5 bg-gray-200 dark:bg-slate-900 rounded-sm mx-auto">
            <h2 className="text-2xl">Delete {targetName}</h2>
            <p className="mb-4 text-sm">This action cannot be undone. Are you sure to delete this item?</p>
            {errorMessage && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            <div className="flex justify-end items-center gap-3">
              <Modal.ToggleClose>
                <button
                  className="px-6 py-3 bg-slate-800 text-slate-50 disabled:bg-slate-600 disabled:cursor-not-allowed"
                  disabled={isPending}
                  ref={closeRef}
                >
                  Cancel
                </button>
              </Modal.ToggleClose>
              <button
                onClick={mutate}
                className="px-6 py-3 bg-red-800 text-red-50 disabled:bg-red-600 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? <LoadingSpinner /> : "Delete"}
              </button>
            </div>
          </div>
        </Modal.Wrapper>
      </Modal.Overlay>

      {createPortal(<Toaster position="top-center" />, document.body)}
    </>
  );
}

export default DeletionModal;
