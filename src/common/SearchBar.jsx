import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

const SearchBar = ({ handleChange, value, type }) => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        onChange={handleChange}
        value={value}
        type="text"
        placeholder={`Find ${
          type === "coaches-and-staff" ? "Staff" : "Players"
        }`}
        size="lg"
        variant="filled"
      />
    </InputGroup>
  );
};

export default SearchBar;
