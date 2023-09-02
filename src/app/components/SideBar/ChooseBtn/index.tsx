import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

interface IBtn {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}
export const ChooseBtn: React.FC<IBtn> = ({
  selectedValue,
  setSelectedValue,
}) => {
  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(e.target.value as string);
  };
  return (
    <Box sx={{ minWidth: "90%" }}>
      <FormControl fullWidth>
        <InputLabel
          variant="standard"
          className="choose-btn-label"
          htmlFor="uncontrolled-native"
        >
          Filter By:
        </InputLabel>
        <NativeSelect
          className="choose-btn"
          value={selectedValue}
          onChange={handleSelectChange}
          inputProps={{
            id: "uncontrolled-native",
          }}
        >
          <option style={{ backgroundColor: "black" }} value={"Category"}>
            Category
          </option>
          <option style={{ backgroundColor: "black" }} value={"Brand"}>
            Brand
          </option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};
