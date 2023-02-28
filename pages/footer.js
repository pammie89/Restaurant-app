import React from 'react'

const Footer = () => {
  return (
    <div style={{bottom: '0', width: '100%', height: '4rem', margin: 'auto', paddingTop: '1rem', backgroundColor: "rgba(0, 0, 0, 0.6)"}}><p style={{color: '#fff', textAlign: 'center', color: '#ffffff', paddingTop: '.2rem'}}> Copyright 2023 | Selectos Food Ordering </p>

    <div style={{backgroundColor: "#bc2330", paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', justifyContent: 'center', flexDirection: 'row'}}><img src="../images/facebook.png" /><img src="../images/twitter.png" /><img src="../images/youtube.png" /></div>
    </div> 
  );
}

export default Footer