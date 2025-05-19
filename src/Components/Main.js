import React from "react";

const Main = ({ children }) => {
  return (
    <main className="min-h-screen bg-gray-900 pt-20 pb-8 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        {children}
      </div>
    </main>
  );
};

export default Main;
