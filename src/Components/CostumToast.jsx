import React, { useEffect, useRef } from "react";
import { MdDone } from "react-icons/md"; // icon
import { gsap } from "gsap";

const CustomToast = () => {
  const boxRef = useRef(null);
  const lineRef = useRef(null);

  //gsap animation
  useEffect(() => {
    gsap.from(boxRef.current, {
      scale: 0,
      duration: 1,
      ease: "power1.out",
      repeat: 0,
    });
    gsap.to(lineRef.current, {
      width: 0,
      duration: 3,
      ease: "power1.out",
      repeat: 0,
    });
  }, [boxRef]);

  return (
    <>
    <div className="fixed top-0 left-0 z-1000 w-full h-screen bg-[#00000046]  flex justify-center items-center flex-col">
      <div className="relative w-[70vw] h-[70vh] overflow-hidden bg-white shadow-2xl rounded-2xl flex justify-center items-center flex-col gap-3">
        <span
          ref={boxRef}
          className="roundCircle w-14 h-14 rounded-full text-white bg-green-500 flex justify-center items-center"
        >
          <MdDone size={"80px"} />
        </span>
        <h2 className="text-xl font-semibold">Successfully Product uploaded </h2>

        <div className="crossLine absolute top-0 bg-green-500 hidden  md:block md:absolute  left-60  rotate-[45deg] w-full h-30  opacity-90"></div>
        <span
          ref={lineRef}
          className="bottomLine absolute bottom-0 left-0 w-full h-1 bg-green-500"
        ></span>
      </div>
    </div>
    </>
  );
};

export default CustomToast;
