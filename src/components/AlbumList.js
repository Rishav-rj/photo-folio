import React, { useState } from 'react'
import AlbumForm from './AlbumForm';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./albumList.module.css"

const AlbumList = ({albums, mode, showAllImages}) => {

    const [form, setForm] = useState(false);

    function handleForm(){
        setForm(!form)
    }

    const AlbumDeletedNotify = () => toast.success("Album Deleted Successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: (mode ==="light")?"dark":"light",
    });

    async function deleteAlbum(id){
        await deleteDoc(doc(db, "albums", id));
        AlbumDeletedNotify()
    }
  return (
    <>  
        {
            form?<AlbumForm mode={mode}/>:null
        }
        <div className={styles.container}>
            <button onClick={handleForm} className={form? styles.formCloseBtn : styles.formBtn}>{form?"Close Form":"Add Album"}</button>
            <div className={styles.albumsConatiner}>
                {
                    albums.map((album)=>(
                        <div className={styles.album} key={album.id} onClick={()=>showAllImages(album.id)}>
                            <img src={album.image} alt='album'/>
                            <h1>{album.name}</h1>
                            <i className="fa-solid fa-trash" onClick={()=>deleteAlbum(album.id)}></i>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
  
}

export default AlbumList