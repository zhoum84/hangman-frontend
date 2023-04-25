import { FaShare } from "react-icons/fa"
import Game from "../components/Game"

const PlayGame = () => {
  return (
    <div>
        <button className='btn btn-blue'>
        Challenge a friend!
            <FaShare/>
        </button>
        <Game/>
    </div>
  )
}

export default PlayGame