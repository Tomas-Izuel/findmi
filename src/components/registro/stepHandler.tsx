interface StepHandlerProps {
  step: 1 | 2 | 3;
}

const StepHandler = ({ step }: StepHandlerProps) => {
  return (
    <div className="flex w-full justify-center my-6 lg:my-10">
      <div className=" flex justify-between w-full max-w-7xl">
        <div
          className={`w-12 h-12 rounded-full z-10 ${
            step >= 1 ? "bg-primary" : "bg-gray-300"
          }`}
        />
        <div
          className={`w-12 h-12 rounded-full z-10 ${
            step >= 2 ? "bg-primary" : "bg-gray-300"
          }`}
        />
        <div
          className={`w-12 h-12 rounded-full z-10 ${
            step >= 3 ? "bg-primary" : "bg-gray-300"
          }`}
        />
        <div className=" w-10/12 lg:w-[78rem] absolute bg-gray-300 h-1 translate-y-5 z-0" />
      </div>
    </div>
  );
};

export default StepHandler;
