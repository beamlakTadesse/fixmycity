import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { authHeader } from "helpers";

import { Heading5, ModalFooter } from "@material-tailwind/react";

import ModalTitle from "@material-tailwind/react/ModalHeader";
import { Button } from "@material-tailwind/react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";

import { useNavigate, Redirect } from "react-router-dom";
import { url } from "helpers/strings";

function TransferRadio({ sector_type, report, submitted, setSubmitted }) {
  const schema = Yup;
  const navigate = useNavigate();
  let lelaSelected = 0;
  // const [lelaSelected, setLelaSelected] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [show, setShow] = useState(false);

  const [sectorName, setSectorName] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(sector_type);
  const [mydata, setData] = useState({});
  const [mes, setMes] = useState();
  function routeChange() {
    navigate("/sector/reports/", { replace: true });

    // window.location.replace("");
    // window.location.assign("");

    return false;
    // console.log("ID IS:"+id);
  }

  const transferReport = async () => {
    const url1 = `${url}/v1/transfer/`;

    try {
      // const response = await fetch(url);
      const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({ sector_type: lelaSelected, report_id: report }),
        // JSON.stringify(announcement)
      };

      const response = await fetch(url1, requestOptions);
      const json = await response.json();
      setData(json);
      if (json.message) {
        setMes(json.message);
      }
      console.log("Report Status: ", json);
    } catch (error) {
      console.log("error", error);
    }
  };
  // {
  //   report.sector &&
  //     report.sector.sector_type &&

  // }

  const onRBSubmit = (res) => {
    console.log("selected: " + res["sectors"]);
    if (res["sectors"] === "tele") {
      console.log("Report For Tele");
      lelaSelected = 1;
      // setLelaSelected(4);
    } else if (res["sectors"] === "roads") {
      console.log("Report For Roads");
      lelaSelected = 3;
      // setLelaSelected(2);
    } else if (res["sectors"] === "water") {
      console.log("Report For water");
      lelaSelected = 2;
      // setLelaSelected(3);
    } else if (res["sectors"] === "elpa") {
      console.log("Report For ELPA");
      lelaSelected = 4;
      // setLelaSelected(1);
    } else {
      console.log("Select Other");
    }
    console.log(lelaSelected);
    if (lelaSelected != 0) {
      console.log("Transfered_to: .....");

      transferReport();
      console.log("Transfered_to: " + res["sectors"]);
      console.log("Sector_Type: " + lelaSelected);
      setShowMessage(true);
      routeChange();
      console.log("Report_ID: " + report);
      // setSubmitted(false);
    }
  };
  return (
    <div className="container mt-1">
      {mes && (
        <div>
          <p>{mes}</p>
        </div>
      )}
      <Modal size="lg" active={show} toggler={() => setShow(false)}>
        <ModalTitle>
          {/* <Heading5>Transfer Report to other Sector</Heading5> */}
        </ModalTitle>
        <ModalBody>
          <p>{mes}</p>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="brown" onClick={() => handleDeleteCancel()}>
            {" "}
            Cancel
          </Button> */}
        </ModalFooter>
      </Modal>
      {sector_type && (
        <form onSubmit={handleSubmit(onRBSubmit)}>
          <h4>Transfer to:</h4>
          {sector_type !== 4 && (
            <div className="form-check mt-3">
              <label htmlFor="Elpa">
                <input
                  {...register("sectors", { required: true })}
                  type="radio"
                  name="sectors"
                  value="elpa"
                  className="form-check-input"
                  id="elpa"
                />{" "}
                Elpa
              </label>
            </div>
          )}

          {sector_type !== 2 && (
            <div className="form-check">
              <label htmlFor="water">
                <input
                  {...register("sectors", { required: true })}
                  type="radio"
                  name="sectors"
                  value="water"
                  className="form-check-input"
                  id="water"
                />{" "}
                Water
              </label>
            </div>
          )}

          {sector_type !== 3 && (
            <div className="form-check">
              <label htmlFor="roads">
                <input
                  {...register("sectors", { required: true })}
                  type="radio"
                  name="sectors"
                  value="roads"
                  className="form-check-input"
                  id="roads"
                />
                Roads
              </label>
            </div>
          )}

          {sector_type !== 1 && (
            <div className="form-check">
              <label htmlFor="tele">
                <input
                  {...register("sectors", { required: true })}
                  type="radio"
                  name="sectors"
                  value="tele"
                  className="form-check-input"
                  id="tele"
                />
                Tele
              </label>
            </div>
          )}

          <div className="text-danger mt-3">
            {errors.sectors?.type === "required" && "Here Are the only sectors"}
          </div>
          <Button
            color="brown"
            type="submit"
            className="btn btn-dark center mt-4"
          >
            Transfer
          </Button>
        </form>
      )}
      <Modal
        size="lg"
        active={showMessage}
        toggler={() => setShowMessage(false)}
      >
        <ModalTitle>
          <Heading5>Success Message</Heading5>
        </ModalTitle>
        <ModalBody>
          {mydata && mydata.report && mydata.report.sector && (
            <p>
              Thank You, YOu Have Successfully transfered the report to
              Concerned Sector(i.e {mydata.report.sector.district_name} )
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setShowMessage(false);
              setSubmitted(false);
            }}
          >
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default TransferRadio;
