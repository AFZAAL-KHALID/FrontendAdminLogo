const Loader = ({}) => {
  return (
    <div className="fixed w-full h-screen inset-0  bg-opacity-30 z-50 flex items-center justify-center bg-[var(--bg-color)]">
      <div className="flex flex-col gap-3 justify-center items-center">

      <div className="w-12 h-12 border-4 border-t-transparent border-[var(--main-color)] rounded-full animate-spin "></div>
      <h3>Loading...</h3>
      </div>
    </div>
  );
};

export default Loader;