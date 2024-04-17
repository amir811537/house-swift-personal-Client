import { Link } from "react-router-dom";
import TransitionEffect from "../../Component/TransitionEffect/TransitionEffect";

export default function ErrorPage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <TransitionEffect></TransitionEffect>
        <h3 className="text-5xl text-center">404</h3>
        <h4 className="text-4xl text-center font-semibold mt-2">Page Not Found</h4>
        <div className="flex justify-center items-center">
          <Link to="/"><button className="bg-[#09BE51] text-white px-5 py-1 mt-3">Go Home</button></Link>
        </div>
      </div>
    </div>
  )
}
