import React, { useState } from "react";
import ModalBody from "@material-tailwind/react/ModalBody";
import Modal from "@material-tailwind/react/Modal";
export default function DeleteDialog(state) {
   
    return (
        <Modal size="lg" active={state} toggler={() => !state}>

            <ModalBody>

                <div>
                    {/* {
                        submitted && */}
                    <div role="alert">
                        <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Danger
                        </div>
                        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <p>Something not ideal might be happening.</p>
                        </div>
                    </div>
                    {/* } */}

                </div>
            </ModalBody>
        </Modal>);
}