import { faFeather } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Logo = () => {
    return (
        <div className="text-3xl text-center py-4 font-heading text-white">
            Quillwind 
            <FontAwesomeIcon icon={faFeather} className= "text-2xl px-2 pb-1 text-my-green"/>
        </div>
    )
}