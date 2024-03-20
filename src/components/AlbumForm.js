import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useRef } from 'react'
import { db } from '../firebaseConfig';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./albumForm.module.css"

const AlbumForm = ({mode}) => {

    // UseRef used for input values
    const albumNameRef = useRef(null);
    const albumImageRef = useRef(null);

    // Toastify used for Notofications
    const AlbumAddNotify = () => toast.success("Album Added Successfully!", {
                position: "top-center",
                autoClose: 2000,
                theme: (mode ==="light")?"dark":"light",
            });
        
        const emptyField = () => toast.error("Album name can't Empty!", {
            position: "top-center",
            autoClose: 2000,
            theme: (mode ==="light")?"dark":"light",
        });

    // Function to handle new ablum creation 
    async function handleSubmit(e){
        e.preventDefault()
        const albumName = albumNameRef.current.value
        let albumImage = albumImageRef.current.value
        
        if(!albumName){
            emptyField()
            return
        }
        
        if(!albumImage){
            albumImage = "https://blog.hootsuite.com/wp-content/uploads/2022/12/Facebook-Cover-Photos-13.png"
        }
        
        const newAldumRef = doc(collection(db, "albums"));

        await setDoc(newAldumRef, {
            name:albumName,
            image:albumImage
        })
        reset()
        // alert("Added")
        AlbumAddNotify()
    }

    // Reset funtion to empty the input fields
    function reset(){
        albumNameRef.current.value = ""
        albumImageRef.current.value = ""
    }

  return (
    <>  
        {/* Conditional styling */}
        <div className={mode==="light"?`${styles.container} ${styles.light}` :`${styles.container} ${styles.dark}`}>
            <h2 className={mode==="light"?styles.light: styles.dark}>Create an Album</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.input}>
                    <input type="text" placeholder='Enter Album Name...' ref={albumNameRef}/>
                    <input type="text" placeholder='Album Cover Image URL...' ref={albumImageRef}/>
                </div>
                <div className={styles.btn}>
                    <button type='button' onClick={reset}>Clear Inputs</button>
                    <button type='submit'>Create Aldum</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default AlbumForm