import React, { useState } from 'react'
import { ConfirmDialog } from "primereact/confirmdialog";
import { toast } from 'react-toastify';
import { HandlerDelete } from '../../utils/Image/ServiceHandler/ServiceHandler';

const AlertPop = ({visible,setVisible,id,url,reFetch}) => {
    
   
      const confirmAccept = () => {
        deletehandler(id);
      };
      const deletehandler = (id) => {
        HandlerDelete(`${url}/${id}`)
          .then(
            (res) => toast.success(res.data),
            setTimeout(() => {
              reFetch();
            }, 200)
          )
          .catch((err) => console.log(err));
      };
  return (
    <div>
         <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={confirmAccept}
        reject={() => setVisible(false)}
      />
    </div>
  )
}

export default AlertPop