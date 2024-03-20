import { useEffect, useRef, useState } from "react";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./imageList.module.css"
import ImageForm from "./ImageForm";
import Carousel from "./Carousel";

const ImageList = ({images, backToAlbums, mode, albumId}) => {

  
  const [form, setForm] = useState(false);             // To show or hide Form
  const [filterImg, setFilterImg] = useState(images);  // To store filtered images
  const [carousel, setCarousel] = useState(false);     // To show or hide Carousel
  const [currectIndex, setCurrectInex] = useState(0);  // To store the currecnt index of click image
  const [updateImg, setUpdateImg] = useState(null)     // To store the updaing image details
  const searchRef = useRef()                           // UseRef used to get the search field value

  // useEffect used to set filterImg as the images
  useEffect(() => {
    setFilterImg(images);
  }, [images]);

  // Function to show & hide Image form
  function handleForm(){
      setForm(!form)
      if(!form){
        setUpdateImg(null)
      }
  }

  // Function for search feature with set the new filterImages
  function search(){
    const searchedName = (searchRef.current.value).toLowerCase()
    const filteredimages = images.filter(img=> img.name && (img.name).toLowerCase().includes(searchedName));
    setFilterImg(filteredimages)
  }

  // Toastify for notification
  const imageDeletedNotify = () => toast.success("Image Deleted Successfully!", {
      position: "top-center",
      autoClose: 2000,
      theme: (mode ==="light")?"dark":"light",
  });

  // Function to delete images
  async function deleteImage(id){
      await deleteDoc(doc(db, "images", id));
      imageDeletedNotify()
  }

  // Hide & Show carousel & setting the currect image Index
  function handleCarousel(i){
    setCarousel(!carousel)
    setCurrectInex(i)
    setForm(false)
  }

  // Setting the clicked images which need to be updated
  function updateImage(image){
    setUpdateImg(image)
    setForm(true)
  }
  
  return (
    <>
        {
            form?<ImageForm mode={mode} albumId={albumId} updateImg={updateImg} setUpdateImg={setUpdateImg}/>:null // conditional component rendering
        }
        {
          carousel?<Carousel handleCarousel={handleCarousel} images={images} currectIndex={currectIndex}/>:null // conditional component rendering
        }
        <div className={styles.container}>
          <div className={styles.btnContainer}>
            <button onClick={backToAlbums}><i className="fa-regular fa-circle-left"></i></button>
            {
              (images.length < 1)?<h2>No Images Added Yet!</h2>
              :<input type="search" className={styles.search} placeholder="Search Title..." onChange={search} ref={searchRef}/>
            }
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