import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosMail } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';



const ThanksPage = () => {
    const navigate = useNavigate()

    const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);
  return (
    <div>
            <div style = {{justifyContent: "center", textAlign: "center", marginTop: "15dvh"}}>
                <img src={require('../../images/accepted.png')}
                        alt="portalpic1"
                        height="200px"
                        width="200px"
                />

                <h1 style = {{direction: "rtl", marginTop: "20px"}}>
                ההזמנה התקבלה והנעליים בדרך!
                </h1>


                {storedIsLogged ? (
                  <div style = {{display: "flex", gap: "50px", justifyContent: "center", textAlign: "center"}}>
                 <p style = {{direction: "rtl", marginTop: "60px", cursor: "pointer", color: "purple"}} onClick = {() => navigate('/profile')}>
                    לצפייה בפרטי ההזמנה
                </p>
                 <p style = {{direction: "rtl", marginTop: "60px", cursor: "pointer", color: "purple"}} onClick = {() => navigate('/')}>
                    חזרה לעמוד הבית
                </p>
                  </div>
                ) : (
                                  <p style = {{direction: "rtl", marginTop: "60px", cursor: "pointer", color: "purple"}} onClick = {() => navigate('/')}>
                                  חזרה לעמוד הבית
                                  </p>
                )}

                <h3 style = {{direction: "rtl", marginTop: "1rem"}}>
                שלחו לנו באינסטגרם או בווצאפ את פרטי ההזמנה וקבלו הטבה להזמנה הבאה
                </h3>
          
            <div className = "contact-icons-thanks" style = {{marginTop: "8rem"}}>
                <div style = {{position: "absolute", marginBottom: "6rem", fontSize: "1.2rem"}}>
                    <b>ליצירת קשר</b>
                </div>
                
                <IoIosMail style={{color: "#78c1d9", fontSize: "3rem", cursor: "pointer"}}/>
                <FontAwesomeIcon icon={faWhatsapp} style={{color: "#25d366", fontSize: "2.4rem", cursor: "pointer"}} />
                <img width='35px' height='35px'
                            src={require('../../images/instagram.png')}
                            alt = "instagramlogo"
                            style = {{position: "relative", right: "5px", top: "1px", cursor: "pointer"}}/>

            

                <FontAwesomeIcon icon={faFacebook} style = {{fontSize: "2.2rem", color: "#316ff6", position: "relative", right: "10px", top: "1px", cursor: "pointer"}}/>
                
                </div>

            </div>
    </div>
  )
}

export default ThanksPage