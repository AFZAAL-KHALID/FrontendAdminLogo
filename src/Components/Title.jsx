import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <>
      <div className="flex justify-center items-center py-4 gap-2 overflow-auto">
        <span className="w-10 h-[2px] bg-gray-800 "></span>
        <h1 className="text-2xl md:text-4xl font-[logoFont]">{text1}</h1>
        <h1 className="text-2xl md:text-4xl font-[MuckleyBold] text-gray-500">{text2}</h1>
      </div>
    </>
  );
};

export default Title;
