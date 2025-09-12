import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetUsers } from "../../../../../Hooks/useGetUser";
import { UsersAndRoleDTO } from "../../../../../Models/RegistrationModels/UsersCreateRequestDTO";



interface AllUsersProps {
  salesPerson: string;
  setSalesPerson: React.Dispatch<React.SetStateAction<string>>;

}

const AllUsersForReport = ({ salesPerson, setSalesPerson }: AllUsersProps) => {
  const allUsersData = useGetUsers();

  const [realUsers, setRealUsers] = useState<UsersAndRoleDTO[]>([]);

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
      // setEmployee(allUsers[0].email);
    }
  }, [allUsersData.isSuccess, allUsersData.isFetching]);

  return (


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

  );
};

export default AllUsersForReport;
