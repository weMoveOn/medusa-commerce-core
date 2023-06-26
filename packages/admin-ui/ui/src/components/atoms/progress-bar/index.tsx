interface IProgressBar {
  progress: string
}
const ProgressBarMoveShop: React.FC<IProgressBar> = ({ progress }) => {
  return (
    <div className=" flex items-center justify-between">
      <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="relative h-2.5 rounded-full bg-[#03C68B] text-center text-xs font-medium leading-none text-blue-100"
          style={{ width: progress }}
        >
          <div className="absolute -top-2 right-0  flex h-7 w-7 justify-center rounded-full bg-slate-50 shadow-lg">
            <div className="my-auto mx-auto h-3 w-3 rounded-full bg-[#03C68B]"></div>
          </div>
        </div>
      </div>

      <div className="ml-2">{progress}</div>
    </div>
  )
}

export default ProgressBarMoveShop
