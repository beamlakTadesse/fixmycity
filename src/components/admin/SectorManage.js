import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Progress from "@material-tailwind/react/Progress";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import AddSectorAdminForm from "./addSectorAdmin";
import React, { useEffect, useState } from "react";

export default function SectorManage({ sectorsCount }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Card>
      <CardHeader color="blue" contentPosition="none">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white text-2xl">Active Sectors Admin</h2>
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            style={{ padding: 0 }}
          >
            See More
          </Button>
        </div>
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <Button
            size="lg"
            style={{ padding: 0 }}
            onClick={(e) => setShowModal(true)}
          >
            Add Sector Admin
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
          <ModalBody>
            <AddSectorAdminForm />
          </ModalBody>
        </Modal>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Sector
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Visitors
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-56"></th>
              </tr>
            </thead>
            <tbody>
              {sectorsCount &&
                Object.keys(sectorsCount).map((oneKey, i) => {
                  return (
                    <tr>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {sectorsCount[oneKey][2]}
                      </th>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {sectorsCount[oneKey][0]}
                      </td>
                      <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <Progress
                          color="blue"
                          value={sectorsCount[oneKey][1]}
                        />
                      </td>
                    </tr>
                    // sectorsCount[oneKey][0]
                  );
                })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
