import { memo } from "react";
import { Table, TableBody } from "@mui/material";
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RenderRow from "./RenderRow";

interface trackRows {
  label?: string;
  value: any;
}
interface ProductInfoCardProps {
  renderRows: trackRows[];
  cardTitle?: string;
  defaultExpanded?: boolean;
}

const ProductInfoCard = memo(({ renderRows, cardTitle, defaultExpanded = false }: ProductInfoCardProps) => {
  return (
    <Card
      sx={{
        minWidth: 375,
        width: "100%",
        mt: 2,
        mb: 2,
        ml: 1,
        mr: 1,
        boxShadow: 2,
        borderRadius: 2,
        border: 1,
        borderColor: "grey.400",
        borderStyle: "solid",
      }}
    >
      <CardContent>
        <Accordion defaultExpanded={defaultExpanded}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cardTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table size="small">
              <TableBody>
                {renderRows.map((row, index) => (
                  <RenderRow key={index} label={row.label} value={row.value} />
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
});

export default ProductInfoCard;
