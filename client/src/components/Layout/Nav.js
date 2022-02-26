import { Fragment,  useEffect, useState } from "react";
import NavMobile from "./NavMobile";
import NavDT from "./NavDT";

import styles from "./Nav.module.css";
const Nav = () => {
  
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    if (window.innerWidth < 550) {
      setIsMobile(true)
    }else{
      setIsMobile(false)
    }
  }

  useEffect(()=>{
    window.addEventListener("resize", handleResize)
  })

  return (
    <Fragment>
      {isMobile ? <NavMobile /> : <NavDT />}
    </Fragment>
  );
};

export default Nav;
