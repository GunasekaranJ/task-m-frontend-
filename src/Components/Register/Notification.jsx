// import React, { useEffect } from "react";
// import styles from "./Notification.module.css";

// function Notification({ message, type = "success", onClose }) {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose(); 
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className={`${styles.notification} ${styles[type]}`}>
//       {message}
//     </div>
//   );
// }

// export default Notification;
