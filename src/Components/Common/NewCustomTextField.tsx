import { styled, TextField, TextFieldProps } from "@mui/material";
import { useRef, useEffect, JSX } from "react";
import {Control, useController} from 'react-hook-form'

type NewTextFieldProps =  TextFieldProps & {
    name: string
    control: Control<any>
    label?: string| JSX.Element
    textConstraints?: {}
    }

    interface StyledTextFieldProps extends React.ComponentProps<typeof TextField> {}

    const CustomTextField = styled(TextField)<StyledTextFieldProps>(
        ({  disabled }) => ({
          width: "200px",
          //"222px",
      
          backgroundColor: disabled ? "#EEEEEE" : "white", // Red when disabled, green otherwise
          // Add more styles if needed
        })
      );
      
const NewStyledTextField = ({textConstraints,control,label,name,...TextFieldProps}:NewTextFieldProps) => {
    const {formState:{errors}} = useController({ name,control})
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handleFocus = () => {
        if (inputRef.current) {
          inputRef.current.select();
        }
      };
  
      const inputElement = inputRef.current;
      if (inputElement) {
        inputElement.addEventListener('focus', handleFocus);
      }
  
      return () => {
        if (inputElement) {
          inputElement.removeEventListener('focus', handleFocus);
        }
      };
    }, []);
  return (
    <>
            <CustomTextField
                {...TextFieldProps}
                {...control.register(name ,textConstraints ?? {} )   }
                label={label}
                 variant="outlined" margin="normal"
              helperText={errors[name]?.message?.toString()}
              inputRef={inputRef}
               error=     {!!errors[name]}  
        />
     
</>
  )
}

export default NewStyledTextField

