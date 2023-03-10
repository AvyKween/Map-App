
export const Loading = () => {
  return (
    <div className="flex justify-center items-center fixed top-0 right-0 bg-[rgba(0,0,0,0.8)] w-full h-full text-[#e9f5f5]">
      <div className="text-center">
        <h3 className="text-lg">Please Wait...</h3>
        <span>Location tracking in process</span>
      </div>
    </div>
  )
}
