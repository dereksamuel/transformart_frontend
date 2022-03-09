import React from "react";
import { Button } from "../Button";
import { ChevronLeftIcon } from "@heroicons/react/solid";

function Menu() {
  return (
    <>
      <Button className="ButtonMenu">
        <ChevronLeftIcon />
      </Button>
    </>
  );
}

export {
  Menu
};
