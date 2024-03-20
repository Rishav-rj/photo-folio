import styles from "./navbar.module.css"

const Navbar = ({mode, setMode}) => {

    // Function to change the theme between light & dark
    const changeMode = ()=>{
        if(mode === "light"){
            setMode("dark")
        }else{
            setMode("light")
        }
    }


  return (
    <>
        <div className={styles.container}>
            <div className={styles.logo}>
                <h1><i className="fa-solid fa-images"></i> PhotoFolio</h1>
            </div>
            <div className={styles.btnContainer}>
                <div className={styles.btn} onClick={changeMode}>
                    <div className={mode==="light"? styles.light: styles.dark}></div>
                    <i className="fa-solid fa-sun"></i>
                    <i className="fa-solid fa-moon"></i>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar