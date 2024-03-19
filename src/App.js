import { useEffect, useState } from 'react';
import './App.css';
import AlbumList from './components/AlbumList';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import MoonLoader from 'react-spinner-material';
import ImageList from "./components/ImageList"

function App() {

  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([])
  const [mode, setMode] = useState("light");
  const [activeComp, setActiveComp] = useState("Albums");
  const [albumId, setAlbumId] = useState(null)
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    setLoading(true)
    onSnapshot(collection(db, "albums"), (snapshot) => {
      const albums = snapshot.docs.map((doc)=>{
        return {id:doc.id,
                ...doc.data()}
      })
      setAlbums(albums)
      setLoading(false)
    });
  },[])

  useEffect(()=>{
    setLoading(true)
    const q = query(collection(db, "images"), where("album_id", "==", albumId));
    onSnapshot(q, (snapshot) => {
      const images = snapshot.docs.map((doc)=>{
        return {id:doc.id,
                ...doc.data()}
      })
      setImages(images)
      setLoading(false)
    });
  },[albumId])


  const showAllImages = async (id)=>{
    setAlbumId(id)
    setActiveComp("Images")
  }

  const backToAlbums = ()=>{
    setActiveComp("Albums")
    setAlbumId(null)
  }

  return (
    <>
      <div className={mode==="light"? "app-light app": "app-dark app"}>
        <Navbar mode={mode} setMode={setMode}/>
          {
            loading? (<div className='spinner'><MoonLoader color="#36d7b7" /><h3>Loading...</h3></div>)
            :(activeComp === "Albums")?<AlbumList albums={albums} mode={mode} showAllImages={showAllImages}/>
            :<ImageList images={images} mode={mode} backToAlbums={backToAlbums} albumId={albumId}/>
          }
          
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
