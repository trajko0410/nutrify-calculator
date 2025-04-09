import React, { ReactNode } from "react";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return <div className=" w-full pl-[24px] md:pl-[118px] pr-[24px] md:pb-[0px] pb-[70px]">{children}</div>;
};

export default MainContainer;