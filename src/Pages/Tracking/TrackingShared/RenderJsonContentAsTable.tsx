import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import { DontDisplayFieldsIfNull } from "../../../Constants/DontDisplayFieldsIfNull";
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const keyNotFoundInDontDisplayFields = (key: string, values: string, DontDisplayFieldsIfNull: string[]): boolean => {
  return !DontDisplayFieldsIfNull.some(
    (field) => field.toLowerCase() === key.toLowerCase() && (values === null || values === undefined)
  );
};

const RenderJsonContentAsTable = (jsonString: string) => {
  console.log("RenderJsonContentAsTable", jsonString);

  try {
    const parsed = JSON.parse(jsonString);
    return (
      <TableContainer
        component={Paper}
        sx={{
          margin: 1,
          backgroundColor: "#f8f9fa",
          "& .MuiTableCell-root": {
            borderColor: "#e9ecef",
          },
        }}
      >
        <Table size="small">
          <TableBody>
            {Object.entries(parsed).map(([key, value]) => {
              if (keyNotFoundInDontDisplayFields(key, value as string, DontDisplayFieldsIfNull)) {
                return (
                  <TableRow key={key}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: "bold",
                        width: "30%",
                        backgroundColor: "#f1f3f5",
                      }}
                    >
                      {capitalizeFirstLetter(key)}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "default",
                        width: "70%",
                      }}
                    >
                      {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } catch (e) {
    return null;
  }
};

export default RenderJsonContentAsTable;
