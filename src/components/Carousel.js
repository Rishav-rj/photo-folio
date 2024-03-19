import React, { useState } from 'react'
import styles from "./carousel.module.css"

const Carousel = ({images, handleCarousel, currectIndex}) => {
    
    const [index, setIndex] = useState(currectIndex);

    const imageURLs = images.map(image => image.image)

    function prev(){
        if(index === 0){
            setIndex(imageURLs.length-1)
        }else{
            setIndex(index-1)
        }
    }

    function next(){
        if(index === (imageURLs.length-1)){
            setIndex(0)
        }else{
            setIndex(index+1)
        }
    }


  return (
    <> 
        <div className={styles.container}>
            <button onClick={handleCarousel} className={styles.btn}><i className="fa-solid fa-square-xmark"></i></button>
            <button onClick={prev} className={styles.prevBtn}><i className="fa-solid fa-chevron-left"></i></button>
            <img src={imageURLs[index]} alt='img'/>
            <button onClick={next} className={styles.nextBtn}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
    </>
  )
}

export default Carousel