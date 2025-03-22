import React, { ReactNode } from "react";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return <div className=" w-full lg:px-20 px-5">{children}</div>;
};

export default MainContainer;
