import Image from "next/image"
import { Sweater,Shelf } from "@/components"
import { sweaters, foundations } from "@/constants"
import { useState } from "react"
import './hero.scss'

const Hero = () => {

  const [sweatersState, setSweaters] = useState(sweaters)

  return (
    <div>
      <div className='hero-header'>
        <Image src='/assets/headerImage2022.png' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} alt='Hero header'/>
      </div>

      <div className='hero-hat-stand'>
        <Image src='/assets/hat_stand.png' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} alt='hat stand'/>
        <div className='hero-hat-stand-sweaters'>
        {sweatersState.map((sweater) => (
          <Sweater key={sweater.id} id={sweater.id} img={sweater.img}/>
        ))}
        </div>
      </div>

    
      <div className='hero-shelfs'>
        {foundations.map((foundation) => (
            <Shelf key={foundation.id} name={foundation.name.toUpperCase()} site={foundation.site} />
        ))}
      </div>  
    </div>
  )
}

export default Hero

