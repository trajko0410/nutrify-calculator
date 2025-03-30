import React, { ReactNode } from "react";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return <div className=" w-full pl-[118px] pr-[24px]">{children}</div>;
};

export default MainContainer;