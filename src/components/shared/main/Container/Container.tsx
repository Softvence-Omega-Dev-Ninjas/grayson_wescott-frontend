import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="container px-2 sm:px-0 mx-auto">{children}</div>;
};

export default Container;
