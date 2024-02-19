import { Link } from "react-router-dom"

import { v4 as uuidv4 } from "uuid"
const MoveOnGlobalCard = () => {
  return (
    <div className=" medium:flex  hidden items-center justify-between rounded-lg border bg-white p-3">
      <div>
        <h2 className="medium:text-xl  text-base font-semibold">
          MoveOn Global
        </h2>
        <p className="mb-4 mt-3">
          Write a description, add photos, and set pricing for <br /> the
          products you plan to sell. 
        </p>
        <Link
          to={"/a/home"}
          className="rounded-lg border bg-zinc-900 px-6 py-3 text-center  text-sm font-semibold leading-tight text-white"
        >
          Explore Now
        </Link>
      </div>
      <div>
        <img
          className=" h-[167px] w-[285px] rounded-lg"
          src="https://source.unsplash.com/user/c_v_r/285x167"
        />
      </div>
    </div>
  )
}

const Card = () => {
  return (
    <div className=" rounded-lg border p-3">
      <img
        className=" h-[66px] w-[142px] rounded-lg"
        src="https://source.unsplash.com/user/c_v_r/142x66"
      />
      <div>
        <h2 className="medium:text-xl mb-2 mt-4  text-base font-semibold">
          MoveOn Global
        </h2>
        <p>
          Write a description, add photos, and set pricing for the products you
          plan to sell to you.
        </p>
      </div>
    </div>
  )
}
const MoveOnGlobal = () => {
  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <MoveOnGlobalCard />
      <div className=" ">
        <div className={"small:block medium:hidden"}>
          <Card />
        </div>
        <div className="medium:flex-row mt-3 flex flex-col items-center justify-between gap-4">
          {[1, 2, 3]?.map(() => (
            <Card key={uuidv4()} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MoveOnGlobal
