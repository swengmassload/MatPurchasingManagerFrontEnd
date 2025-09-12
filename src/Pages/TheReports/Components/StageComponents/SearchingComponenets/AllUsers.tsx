import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { SimpleBoxborder } from "../../../../../Components/Common/SimpleBoxborder";
import { useGetUsers } from "../../../../../Hooks/useGetUser";
import { UsersAndRoleDTO } from "../../../../../Models/RegistrationModels/UsersCreateRequestDTO";
import { RMASearchRequestDTO } from "../../../../../Models/RMAManagerModels/Dto";


interface AllUsersProps {
handleSearchRMA: (input: RMASearchRequestDTO) => Promise<void>;     

}

const AllUsers = ({ handleSearchRMA }: AllUsersProps) => {
  const allUsersData = useGetUsers();

  const [realUsers, setRealUsers] = useState<UsersAndRoleDTO[]>([]);
  const [salesPerson, setSalesPerson] = useState<string>("ALL");

  useEffect(() => {
    if (allUsersData.isSuccess && allUsersData.data) {
      const allUsers = [
        ...allUsersData.data,
        {
          email: "ALL",
          firstName: "ALL",
          lastName: "ALL",
          theRole: "ALL",
          userGroup: "ALL",
          isUserActive: false,
          isBarcodeActive: false,
        },
      ];
      setRealUsers(allUsers);
      
    }
  }, [allUsersData.isSuccess, allUsersData.isFetching]);
   const handleSubmit= () => {
    var data: RMASearchRequestDTO = {
      startDateIssued:    null,
      endDateIssued:    null,
      searchBy: "SalesPerson",
      startDateReceived: null,
      endDateReceived:null,
      salesOrderId: null,
      rmaNumberStart: null,
      rmaNumberEnd: null,
      stage: null,
      salesPerson: salesPerson,
      contactName: null,
      companyName: null,
      customerEmail: null,
 

    };
    handleSearchRMA(data);

  }
  return (

<Box sx={{ ...SimpleBoxborder, flexDirection: "column", gap: 1, alignItems: "center", width: "100%" }}>
      <TextField
        select
        fullWidth
        value={salesPerson}
        onChange={(e) => setSalesPerson(e.target.value)}
        sx={{ width: "100%" }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          select: {
            native: true,
            variant: "standard",
          },
        }}
        label="Users"
      >
        {realUsers &&
          realUsers.map((option) => (
            <option key={option.email} value={option.email}>
              {option.email}
            </option>
          ))}
      </TextField>
        <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
                <Button  onClick={handleSubmit} >Search</Button>
              </Box>
</Box>
  );
};

export default AllUsers;


