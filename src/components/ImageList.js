import { useEffect, useRef, useState } from "react";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./imageList.module.css"
import ImageForm from "./ImageForm";
import Carousel from "./Carousel";

const ImageList = ({images, backToAlbums, mode, albumId}) => {

  const [form, setForm] = useState(false);
  const [filterImg, setFilterImg] = useState(images);
  const [carousel, setCarousel] = useState(false);
  const [currectIndex, setCurrectInex] = useState(0);
  const [updateImg, setUpdateImg] = useState(null)
  const searchRef = useRef()

  useEffect(() => {
    setFilterImg(images);
  }, [images]);


  function handleForm(){
      setForm(!form)
      if(!form){
        setUpdateImg(null)
      }
  }

  function search(){
    const searchedName = (searchRef.current.value).toLowerCase()
    const filteredimages = images.filter(img=> img.name && (img.name).toLowerCase().includes(searchedName));
    setFilterImg(filteredimages)
  }

  const imageDeletedNotify = () => toast.success("Image Deleted Successfully!", {
      position: "top-center",
      autoClose: 2000,
      theme: (mode ==="light")?"dark":"light",
  });

  async function deleteImage(id){
      await deleteDoc(doc(db, "images", id));
      imageDeletedNotify()
  }


  function handleCarousel(i){
    setCarousel(!carousel)
    setCurrectInex(i)
    setForm(false)
  }


  function updateImage(image){
    setUpdateImg(image)
    setForm(true)
  }
  
  return (
    <>
        {
            form?<ImageForm mode={mode} albumId={albumId} updateImg={updateImg} setUpdateImg={setUpdateImg}/>:null
        }
        {
          carousel?<Carousel handleCarousel={handleCarousel} images={images} currectIndex={currectIndex}/>:null
        }
        <div className={styles.container}>
          <div className={styles.btnContainer}>
            <button onClick={backToAlbums}><i className="fa-regular fa-circle-left"></i></button>
            <input type="search" className={styles.search} placeholder="Search Title..." onChange={search} ref={searchRef}/>
            <button onClick={handleForm} className={form? styles.formCloseBtn : styles.formBtn}>{form?"Close Form":"Add image"}</button>
          </div>
          <div className={styles.imageConatiner}>
              {
                  filterImg.map((image, i)=>(
                      <div className={styles.image} key={image.id}>
                          <img src={image.image} alt='album' onClick={()=>handleCarousel(i)}/>
                          <h1>{image.name}</h1>
                          <i className={`fa-regular fa-pen-to-square ${styles.updateImg}`} onClick={()=>updateImage(image)}></i>
                          <i className={`fa-solid fa-trash ${styles.deleteImg}`} onClick={()=>deleteImage(image.id)}></i>
                      </div>
                  ))
              }
          </div>
        </div>
    </>
  )
}

export default ImageList