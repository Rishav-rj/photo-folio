import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef } from 'react'
import { db } from '../firebaseConfig';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./imageForm.module.css"

const ImageForm = ({albumId, mode, updateImg, setUpdateImg}) => {

    // UseRef used for input values
    const imageTitleRef = useRef(null);
    const imageRef = useRef(null);

    // Toastify used for Notifications
    const ImageNotify = (msg) => toast.success(msg, {
                position: "top-center",
                autoClose: 2000,
                theme: (mode ==="light")?"dark":"light",
            });

        
    const emptyField = () => toast.error("Image Title & URL can't Empty!", {
        position: "top-center",
        autoClose: 2000,
        theme: (mode ==="light")?"dark":"light",
    });

    // UseEffect used to autofill the form when edit button clicked
    useEffect(() => {
        if (updateImg) {
            imageTitleRef.current.value = updateImg.name;
            imageRef.current.value = updateImg.image;
        }else{
            imageTitleRef.current.value = "";
            imageRef.current.value = "";
        }
    }, [updateImg]);


    // Function to edit Or add a new image in perticualr album
    async function handleSubmit(e){
        e.preventDefault()

        if(updateImg){
            const imageDocRef = doc(db, "images", updateImg.id);

            await updateDoc(imageDocRef, {
                name:imageTitleRef.current.value,
                image:imageRef.current.value,
              });

            ImageNotify("Image Updated Successfully!")
            setUpdateImg(null)
            reset()
            return
        }

        const imageTitle = imageTitleRef.current.value
        let imageURL = imageRef.current.value
        
        if(!imageURL || !imageTitle){
            emptyField()
            return
        }
        
        const newImageRef = doc(collection(db, "images"));
        await setDoc(newImageRef, {
            album_id:albumId,
            name:imageTitle,
            image:imageURL
        })
        reset()
        ImageNotify("Image Added Successfully!")
    }

    // Function to make the input fields empty
    function reset(){
        imageTitleRef.current.value = ""
        imageRef.current.value = ""
    }



  return (
    <>  
        {/* Conditional styling */}
        <div className={mode==="light"?`${styles.container} ${styles.light}` :`${styles.container} ${styles.dark}`}>
            <h2 className={mode==="light"?styles.light: styles.dark}>Add an Image</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.input}>
                    <input type="text" placeholder='Image Title...' ref={imageTitleRef}/>
                    <input type="text" placeholder='Paste Image URL...' ref={imageRef}/>
                </div>
                <div className={styles.btn}>
                    <button type='button' onClick={reset}>Clear Inputs</button>
                    <button type='submit'>{updateImg?"Edit Image":"Add Image"}</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default ImageForm