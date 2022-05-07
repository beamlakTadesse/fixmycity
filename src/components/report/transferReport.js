import React, { useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { authHeader } from "helpers";


import { Heading5, ModalFooter } from '@material-tailwind/react';

import ModalTitle from "@material-tailwind/react/ModalHeader"
import { Button } from '@material-tailwind/react';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";

function TransferRadio({report, submitted, setSubmitted}) {
  const schema = Yup
  const [lelaSelected, setLelaSelected] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [sectorName, setSectorName] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [mydata ,setData]= useState({});
const transferReport = async () => {
    const url = `http://localhost:8000/v1/transfer/`;

    try {
        // const response = await fetch(url);
        const requestOptions = {
          method: 'PUT',
          headers: { ...authHeader(), 'Content-Type': 'application/json' },
          body:JSON.stringify({'sector_type':lelaSelected,'report_id':report})
          // JSON.stringify(announcement)
      };
  
      const response = await fetch(url, requestOptions);
        const json = await response.json();
        setData(json);
         
        console.log("Report Status: ", json);
      } catch (error) {
        console.log("error", error);
      }
    };

  const onRBSubmit = (res) => {
        console.log("selected: "+res['sectors'])
        if(res['sectors']==='tele'){
            console.log("Report For Tele")
            setLelaSelected(4);

        }
        else if(res['sectors']==='roads'){
            console.log("Report For Roads");
            setLelaSelected(2);

        }
        else if(res['sectors']==='water'){
            console.log("Report For water");
            setLelaSelected(3);

        }else if(res['sectors']==='elpa'){
            console.log("Report For ELPA")
            setLelaSelected(1);

        }else{
            console.log("Select Other")
        }

        if(lelaSelected){
            transferReport();
            console.log("Transfered_to: "+res['sectors']);
            console.log("Sector_Type: "+ lelaSelected);
            console.log("Report_ID: "+report);
            // setSubmitted(false);
            setShowMessage(true);

        }
  }
  return (
    <div className="container mt-1">
      <form onSubmit={handleSubmit(onRBSubmit)}>
        <h4>Transfer to:</h4>
        <div className="form-check mt-3">
          <label htmlFor="Elpa">
            <input
              {...register('sectors', { required: true })}
              type="radio"
              name="sectors"
              value='elpa'
              className="form-check-input"
              id='elpa'
            />{' '}
            Elpa
          </label>
        </div>
        <div className="form-check">
          <label htmlFor="water">
            <input
              {...register('sectors', { required: true })}
              type="radio"
              name="sectors"
              value='water'
              className="form-check-input"
              id='water'
            />{' '}
            Water
          </label>
        </div>
        <div className="form-check">
          <label htmlFor="roads">
            <input
              {...register('sectors', { required: true })}
              type="radio"
              name="sectors"
              value='roads'
              className="form-check-input"
              id='roads'
            />
            Roads
          </label>
        </div>
        <div className="form-check">
          <label htmlFor="tele">
            <input
              {...register('sectors', { required: true })}
              type="radio"
              name="sectors"
              value='tele'
              className="form-check-input"
              id='tele'
            />
            Tele
          </label>
        </div>
        <div className="text-danger mt-3">
          {errors.sectors?.type === 'required' &&
            'Here Are the only sectors'}
        </div>
        <button type="submit" className="btn btn-dark center mt-4">
          Transfer
        </button>
      </form>


      <Modal size="lg" active={showMessage} toggler={() => setShowMessage(false)}>
                                                <ModalTitle>
                                                    <Heading5>
                                                    Success Message 
                                                    </Heading5>
                                                </ModalTitle>
                                                <ModalBody>
                                                  {
                                                    mydata &&mydata.report && mydata.report.sector &&
                                                  
                                                    <p>
                                                         Thank You, YOu Have Successfully transfered the report to Concerned Sector(i.e {mydata.report.sector.district_name} )</p>
                                                
                                                  }
                                                  </ModalBody>
                                                <ModalFooter>
                                                    <Button onClick={() =>{ 
                                                      setShowMessage(false);
                                                      setSubmitted(false);
                                                    }}
                                                    >Ok</Button>
                                                   
                                                </ModalFooter>

                                            </Modal>
    </div>
  )
}
export default TransferRadio