import { Switch } from "@nextui-org/react";
import React from "react";

const MySwitcher = ({ status }) => {
  return (
    <Switch
      classNames={{
        wrapper: " bg-pure-red",
        checkedTrack: "bg-lime-green",
      }}
      className=""
      size="md"
      defaultChecked={status}
      color="success"
    />
  );
};

export default MySwitcher;
