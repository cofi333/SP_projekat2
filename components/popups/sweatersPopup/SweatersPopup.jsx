import './sweatersPopup.scss'
import Tooltip from '@mui/joy/Tooltip';



const SweatersPopup = (props) => {
  return (
    <div>
        <Tooltip>
            <span className='popup-number'>{props.numbers}</span>
        </Tooltip>
    </div>
  )
}

export default SweatersPopup
