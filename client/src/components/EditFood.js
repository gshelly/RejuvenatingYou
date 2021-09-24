import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FoodForm from "./FoodForm";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import "../views/AddFood/styles.css"


const EditFood = (props) => {

  const [open, setOpen] = React.useState(props.open);

  const handleClose = () => {
    setOpen(false);
    props.setIsEdit(false);
  }


  return (

    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='lg' style={{width:"55%", margin:"20px auto"}}>
       <DialogActions>
         <CloseSharpIcon onClick={handleClose} className="icons" />
      </DialogActions>
      <DialogContent >
        <FoodForm setIsEdit={true} existingFood={props.existingFood} setOpen={setOpen} />
      </DialogContent>
      <DialogActions>
      </DialogActions>
     
    </Dialog>


  )
}

export default EditFood;