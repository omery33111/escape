import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import './navigators.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllBrandsAsync, selectAllBrands } from '../brand/brandSlice';
import { useEffect, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField, Theme } from '@mui/material';
import { searchShoeAsync, selectAllShoes, selectSearchLoading, selectSearchShoe, setShoeSearch } from '../shoe/shoeSlice';
import { myServer } from '../../endpoints/endpoints';
import { makeStyles } from "@mui/styles";
import CopyrightIcon from '@mui/icons-material/Copyright';


const useStyles = makeStyles((theme: Theme) => ({
  autocompleteRoot: {
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid red',
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiAutocomplete-clearIndicator': {
      color: 'white',
    },
  },
}));



const MyFooter = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const classes = useStyles();

  const shoes = useAppSelector(selectAllShoes);
  const searchShoe = useAppSelector(selectSearchShoe);

  const isSearchLoading = useAppSelector(selectSearchLoading);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShoeSearch(event.target.value));
  };

  useEffect(() => {
    if (searchShoe.trim() !== '') {
      dispatch(searchShoeAsync({ searchQuery: searchShoe }));
    } else {
      dispatch(setShoeSearch(''));
    }
  }, [dispatch, searchShoe]);

  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);

  const brands = useAppSelector(selectAllBrands);

  useEffect(() => {
    dispatch(getAllBrandsAsync());
  }, [dispatch]);

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/escapeshoesil/', '_blank');
  };

  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/profile.php?id=100092993603244', '_blank');
  };

  const [showModal, setShowModal] = useState(false);

  const handleEmailClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const isMobile = window.innerWidth >= 0 && window.innerWidth <= 1024;

  const whatsappNumber = '972528447172';

  const handleWhatsappClick = () => {
    const encodedMessage = encodeURIComponent("היי עומר, אשמח לשמוע פרטים בנוגע ל");

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');
  };

  const whatsappNumber2 = '972546742787';

  const handleWhatsappClick2 = () => {
    const encodedMessage = encodeURIComponent("היי Escape Shoes. אני פונה אליכם בנושא");

    const whatsappLink = `https://wa.me/${whatsappNumber2}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');
  };


  const [showModal2, setShowModal2] = useState(false);

  const handleClose2 = () => setShowModal2(false);
  const handleShow2 = () => setShowModal2(true);

  const refundPolicyContent = 
  `
  מדיניות החזרים ✅✅
  החברה לא תטפל בהחזרת מוצרים שנרכשו באמצעות מקור אחר.
 
 לאחר החלפת המוצר לא תינתן אפשרות החלפה בשנית או החזר המוצר.
 
 לא תינתן אפשרות לבטל את ההזמנה לאחר הוצאת המשלוח אחרי 24 שעות מההזמנה.
 
 אם ברצונך להחזיר את המוצר לאחר קבלתו יש לעדכן אותנו בהודעות באינסטגרם או בווצאפ(0546742787) אנו שולחים לך לאן לשלוח את הנעל ולאחר קבלת הנעל ובדיקה, נבצע זיכוי. צריך לשלוח תוך 5 ימי עסקים.
 (עמלת ביטול 50 ש”ח  + מעמ לכל זוג (עקב המשלוח ששילמנו עבור החבילה).
 
 יש לנו מדיניות החזרה של 30 יום, כלומר יש לך 30 יום לאחר קבלת הפריט שלך לבקש החזרה.
 
 כדי להיות זכאי להחזרה, הפריט שלך חייב להיות באותו מצב שבו קיבלת אותו, ללא שימוש או לא בשימוש, עם תגים, ובאריזתו המקורית. תצטרך גם את הקבלה או הוכחת הרכישה.
 
 כדי להתחיל החזרה, תוכל ליצור איתנו קשר בכתובת escapeilhelp@gmail.com. אם ההחזרה שלך תתקבל, נשלח לך תווית משלוח חזרה, כמו גם הנחיות כיצד ולאן לשלוח את החבילה שלך. לא יתקבלו פריטים שנשלחו אלינו בחזרה ללא בקשת החזרה תחילה.
 
 אתה תמיד יכול ליצור איתנו קשר בכל שאלת החזרה בכתובת escapeilhelp@gmail.com.
 
 
 נזקים ובעיות
 אנא בדוק את ההזמנה שלך עם קבלת הפנים ופנה אלינו מיד אם הפריט פגום, פגום או אם קיבלת את הפריט הלא נכון, כדי שנוכל להעריך את הבעיה ולתקן אותה.
 
 
 חריגים / פריטים שאינם ניתנים להחזרה
 לא ניתן להחזיר סוגים מסוימים של פריטים, כמו מוצרים מתכלים (כגון מזון, פרחים או צמחים), מוצרים מותאמים אישית (כגון הזמנות מיוחדות או פריטים מותאמים אישית), ומוצרי טיפוח אישי (כגון מוצרי יופי). אנחנו גם לא מקבלים החזרות עבור חומרים מסוכנים, נוזלים דליקים או גזים. אנא צור קשר אם יש לך שאלות או חששות לגבי הפריט הספציפי שלך.
 
 למרבה הצער, איננו יכולים לקבל החזרות על פריטי מבצע או כרטיסי מתנה.
 
 
 החלפות
 הדרך המהירה ביותר להבטיח שתקבל את מה שאתה רוצה היא להחזיר את הפריט שברשותך, ולאחר קבלת ההחזרה, בצע רכישה נפרדת עבור הפריט החדש.
 
 
 החזרים
 אנו נודיע לך לאחר שנקבל ונבדוק את ההחזר שלך, ונודיע לך אם ההחזר אושר או לא. אם תאושר, תקבל החזר אוטומטי באמצעי התשלום המקורי שלך. אנא זכור שיכול לקחת זמן מה עד שהבנק או חברת האשראי שלך יעבדו ויפרסמו גם את ההחזר.
 
 אם ותרצה להחזיר מוצר, תוך 48 שעות (זמן סביר) מקבלת המוצר יש להחזירו מבלי לפגום בו בשום צורה כלשהי ולא להשתמש במוצר, עליך לשלוח את המוצר ובקבלת המוצר בחזרה לשולח (החברה) תקבל את כסף חזרה פחות 50 שקל דמי מעמ אשר שולמי על ידי החברה עבור הנעל ומשלוחה.
 
 נזקים ובעיות
 אנא בדוק את ההזמנה שלך עם קבלת הפנים ופנה אלינו מיד אם הפריט פגום, פגום או אם קיבלת את הפריט הלא נכון, כדי שנוכל להעריך את הבעיה ולתקן אותה.
 
 
 חריגים / פריטים שאינם ניתנים להחזרה
 לא ניתן להחזיר סוגים מסוימים של פריטים, כמו מוצרים מתכלים (כגון מזון, פרחים או צמחים), מוצרים מותאמים אישית (כגון הזמנות מיוחדות או פריטים מותאמים אישית), ומוצרי טיפוח אישי (כגון מוצרי יופי). אנחנו גם לא מקבלים החזרות עבור חומרים מסוכנים, נוזלים דליקים או גזים. אנא צור קשר אם יש לך שאלות או חששות לגבי הפריט הספציפי שלך.
 
 למרבה הצער, איננו יכולים לקבל החזרות על פריטי מבצע או כרטיסי מתנה.
 
 
 החלפות
 הדרך המהירה ביותר להבטיח שתקבל את מה שאתה רוצה היא להחזיר את הפריט שברשותך, ולאחר קבלת ההחזרה, בצע רכישה נפרדת עבור הפריט החדש.
 
 
 החזרים
 אנו נודיע לך לאחר שנקבל ונבדוק את ההחזר שלך, ונודיע לך אם ההחזר אושר או לא. אם תאושר, תקבל החזר אוטומטי באמצעי התשלום המקורי שלך. אנא זכור שיכול לקחת זמן מה עד שהבנק או חברת האשראי שלך יעבדו ויפרסמו גם את ההחזר.
 
 אם ותרצה להחזיר מוצר, תוך 48 שעות (זמן סביר) מקבלת המוצר יש להחזירו מבלי לפגום בו בשום צורה כלשהי ולא להשתמש במוצר, עליך לשלוח את המוצר ובקבלת המוצר בחזרה לשולח (החברה) תקבל את כסף חזרה פחות 50 שקל דמי מעמ אשר שולמי על ידי החברה עבור הנעל ומשלוחה.
 
 `;


  const [showModal3, setShowModal3] = useState(false);

  const handleClose3 = () => setShowModal3(false);
  const handleShow3 = () => setShowModal3(true);

  const privacyPolicyContent = 
  `
  מדיניות הפרטיות ✅✅
  אבטחת מידע ופרטיות
  •חברת EscapeIL רשאית להשתמש במידע המופיע בטופס על מנת להביא לך את המידע והשירותים המבוקשים. מידע אישי זה לא ייחשף.
  
  • החברה משתמשת באמצעי זהירות על מנת לשמור, ככל האפשר, על סודיות המידע. במקרים שאינם בשליטתנו החברה, לא תהא החברה אחראית לכל נזק מכל סוג שהוא, ישר או עקיף, שייגרם ללקוח, אם מידע זה יאבד ו/או יעשה בו שימוש לא מורשה.
  
  • החברה מתחייבת שלא לעשות שימוש במידע זה ע”י הקונים אלא על מנת לאפשר את הרכישה באתר מכירות ובהתאם לכל דין.
  
  החברה רשאית לשנות מעת לעת את הוראות מדיניות הפרטיות. אם יבוצעו במדיניות זו שינויים מהותיים, בהוראות שעניינן השימוש במידע שמסרת, תפורסם על-כך הודעה באתר.
  
  המידע הנמסר על ידך כפוף להוראות מדיניות הגנת הפרטיות בהסכם ו/או הדין, החברה תימנע, ככל האפשר, ממסירת מידע  לצדדים שלישיים במודע, למעט לספקים וזאת רק על מנת להשלים את פעולות הרכישה שביצעת באתר, 
  אלא אם תהיה מחויבת לעשות כן על פי צו שיפוטי ו/או אם תעמוד בפני איום שינקטו כנגדה צעדים משפטיים (פליליים או אזרחיים) בגין פעולות שביצעת באתר. במקרה זה רשאית החברה למסור את פרטיך לצד הטוען כי נפגע ממך ו/או בהתאם להוראות הצו השיפוטי ללא כל הודעה מוקדמת.
 `;


  const [showModal4, setShowModal4] = useState(false);

  const handleClose4 = () => setShowModal4(false);
  const handleShow4 = () => setShowModal4(true);

  const deliveryPolicyContent = 
  `
  מדיניות משלוח 
  משלוח רגיל - בין 10-20 ימי עסקים 
  משלוח לכל הארץ – בין 7-14 ימי עסקים 
  *הזמנים לעיל לא כוללים עד 2 ימי אריזה מיום אישור העסקה ע”י חברת האשראי.
  בתקופת החגים זמני האריזה הינם עד 3 ימי עסקים
  לאור המצב יתכנו עיכובים מעבר ל-5 ימי עסקים בזמני אספקה.
  *זמני משלוח מפורטים מעלה וכוללים ימי עסקים בלבד: ימים א-ה, לא כולל שישי, שבת וחג.
  *חשוב לציין כי אין אנו יכולים לקחת אחריות על עיכובים ע”י חברות השילוח (דואר ישראל, שירות שליחים).
  *במידה וחברת השליחויות אינה מגיעה לכתובת שציינת, אנו ניצור איתך קשר למציאת פתרון חלופי.
 `;


  const [showModal5, setShowModal5] = useState(false);

  const handleClose5 = () => setShowModal5(false);
  const handleShow5 = () => setShowModal5(true);

  const servicePolicyContent = 
  `
  תנאי השירות ✅✅
  מדיניות ביטול תינתן תוך 14 ימים מקבלת המוצר וזאת בהתאם לחוק הגנת הצרכן
   האתר שומרת לעצמו את הזכות לזיכוי ו/או החלפה וזאת כל עוד ולא נעשה שימוש והמוצר ללא פגם, ולשיקול דעתנו הבלעדי.
  עלות המשלוח ודרך המשלוח ואחריות ההחזרה חלים על הקונה וזאת תוך פרק זמן סביר אולם לא יאוחר מ-48 שעות מרגע קבלת המוצר ומותנה בקבלת אישור מאת הנהלת האתר לביצוע ההחזרה.
  במידה ונעשתה רכישה, אולם המוצר אזל מהמלאי, תינתן אפשרות למזמין לבחור מוצר זהה או לחילופין לבצע ביטול עסקה והחזר כספי.
  
  האמור בתקנון זה בלשון זכר הוא לשם הנוחות בלבד והתקנון מתייחס לבני שני המינים באופן שווה.
  
  עצם רכישת המוצר באתר תהווה הצהרה מצד הלקוח כי קרא את הוראות תקנון זה, הבין אותן והסכים להן. התקנון מהווה חוזה מחייב בינך לבין החברה.
  
  מנהלי ועובדי האתר משתדלים ככל האפשר לשקף תמונות מדויקות להמחשה ככל האפשר
  
  שינויים בשירות ובמחירים
  המחירים של המוצרים שלנו כפופים לשינוי ללא הודעה מוקדמת.
  אנו שומרים לעצמנו את הזכות בכל עת לשנות או להפסיק את השירות (או כל חלק או תוכן שלו) ללא הודעה מוקדמת בכל עת.
  לא נישא באחריות כלפיך או כלפי צד שלישי כלשהו בגין כל שינוי, שינוי מחיר, השעיה או הפסקה של השירות.
  
  יוק פרטי החיוב והחשבון
  אנו שומרים לעצמנו את הזכות לסרב לכל הזמנה שתבצע איתנו. אנו רשאים, לפי שיקול דעתנו הבלעדי, להגביל או לבטל כמויות שנרכשו לאדם, למשק בית או להזמנה. הגבלות אלו עשויות לכלול הזמנות שבוצעו על ידי או תחת אותו חשבון לקוח, אותו כרטיס אשראי ו/או הזמנות המשתמשות באותה כתובת לחיוב ו/או למשלוח. במקרה שנבצע שינוי או מבטלים הזמנה, אנו עשויים לנסות להודיע ​​לך על ידי יצירת קשר עם הדואר האלקטרוני ו/או כתובת החיוב/מספר הטלפון שסופקו בזמן ביצוע ההזמנה. אנו שומרים לעצמנו את הזכות להגביל או לאסור הזמנות שלפי שיקול דעתנו הבלעדי, נראה כאילו בוצעו על ידי סוחרים, משווקים או מפיצים.
  
  אתה מסכים לספק מידע רכישה וחשבון עדכני, מלא ומדויק עבור כל הרכישות שבוצעו בחנות שלנו. אתה מסכים לעדכן מיידית את חשבונך ומידע אחר, כולל כתובת הדוא"ל ומספרי כרטיסי האשראי שלך ותאריכי תפוגה, כדי שנוכל להשלים את העסקאות שלך וליצור איתך קשר לפי הצורך.
  
  בית העסק לא אחראי, ככל שיש כאלה, לתכנים המפורסמים בקישורים הקיימים באתר והמובילים לאתרים אחרים אליהם ניתן להגיע דרך אותה קישורית (link). בית העסק אינו מתחייב כי הקישורית תוביל את המשתמש לאתר אינטרנט פעיל.
  
  נפלה טעות כלשהי בתיאור הצבע ו/או בנראות הצבע, ו/או באופן בו נראה הצבע במסך המשתמש, לא יחייב הדבר את בית העסק. קטלוג הצבעים באתר נועד להמחשה בלבד וייתכנו הבדלים בין הצבעים המוצגים באתר, חלקן או כולן, לבין הצבעים הנמכרים בפועל.
  
  תמונות המוצרים ו/או סרגלי מידות באתר נועדו להמחשה בלבד, ואינם מחייבים את בית העסק. מובהר כי ייתכנו הבדלים בין התמונות ו/או המידות המוצגות באתר, חלקן או כולן, לבין המוצרים הנמכרים בפועל, והלקוח מוותר בזאת על כל טענה ו/או דרישה ו/או תביעה בעניין זה.
  
  בית העסק עושה ככל יכולתו לוודא שהמידע המוצג באתר יהיה המידע השלם והמדויק ביותר אך יובהר, כי עלולים להופיע בו, בתום לב, אי דיוקים או שגיאות אשר בית העסק לא יישא באחריות כלשהי הנובעת מהם או קשורה אליהם.
  
  צור קשר : EscapeILhelp@gmail.com  0546742787
 `;


  const [showModal6, setShowModal6] = useState(false);

  const handleClose6 = () => setShowModal6(false);
  const handleShow6 = () => setShowModal6(true);

  const termsPolicyContent = 
  `
  תקנון
  הפרטים הבאים הינם בלשון זכר מטעמי נוחות ויתייחסו לזכר ולנקבה כאחד
  כל המחירים באתר כוללים מע”מ כדין ומתומחרים בשקלים חדשים
  מנהלי ועובדי האתר משתדלים ככל האפשר לשקף תמונות מדויקות להמחשה ככל האפשר במקרה שהלקוח קיבל מוצר והוא לטענתו לא כפי שבתמונות ניתן להחזיר להחליף לפי מדיניות האתר.
  
  הנהלת האתר שומרת את הזכות לבצע שינוי במחירים ובתעריפים של המוצרים ללא התראה מוקדמת ללקוחותיה, המחיר התקף הוא המחיר שפורסם בעת השלמת הרכישה כפי שרשום ללקוח בטופס ההזמנה באתר ובאישור ההזמנה.
  כאשר לצורך ביצוע התשלום, המזמין מועבר ישירות לאתר מאובטח של חברת הסליקה כך שפרטי כרטיס האשראי אינו נשמר כלל בשרתי האתר.
  מספר כרטיס האשראי והפרטים האישיים שאשר מוזנים בעת הקנייה במערכת, נשלחים ישירות אל חברת הסליקה ולא מאוחסנים באתר בשום צורה שהיא.
  
  באופן זה נמנעת האפשרות מצד שלישי להגיע לפרטי כרטיס האשראי, למעט בעלי האתר ולשימוש פנימי בלבד. בכך אנו מכבדים את פרטיותך.
  אנו לא נעביר, בשום מקרה, מידע אישי הקשור לחשבונך לצד שלישי למעט מקרים הכרחיים להשלמת ביצוע העסקה, ההזמנה והמשלוח ו/או שירות שבחרת לרכוש.
  
  השימוש באתר על תכניו והשירותים הניתנים בו, מוצעים למזמין בכפוף לאישורו לתנאים הכלולים בתקנון זה
  הגלישה באתר ו/או הרשמה כמנוי לקבלת שירותיו ו/או רכישה בו, ייחשבו להסכמה מצד המזמין לתנאים אלו
  אין לעשות באתר או באמצעותו כל שימוש למטרות בלתי חוקיות ללא הסכמת הנהלת האתר.
  הרישום באתר הוא לשימושו האישי והבלעדי של המזמין, המזמין אינו רשאי להעביר את הרשאת השימוש לאדם אחר בשום דרך ובשום צורה שהיא.
  
  קיימת חובה לדייק בכל הפרטים האישיים הנדרשים לצורך הרישום ולצורך הקשר השוטף עם המזמין.
  המזמין מצהיר כי ידוע לו שלהנהלת האתר אין כל יכולת או אפשרות לבדוק, לנפות או לסנן את המנויים הנרשמים לאתר.
  בכוונת הנהלת האתר כי האתר ושירותיו יהיו זמינים בכל עת.
  עצם רכישת המוצר באתר תהווה הצהרה מצד הלקוח כי קרא את הוראות תקנון זה, הבין אותן והסכים להן. התקנון מהווה חוזה מחייב בינך לבין החברה
  כל המוצרים מגיעים ביבוא מקביל ממדינות שונות בהתאם לדגם ומידה.
  מנהלי ועובדי האתר משתדלים ככל האפשר לשקף תמונות מדויקות להמחשה ככל האפשר.
  חברה שומרת לעצמה את הזכות להפסיק את שיווק ומכירת המוצר בכל עת וכן לשלול זכות רכישה באתר מכירות על פי שיקול דעתה.
  מוצרים או שירותים (אם רלוונטי)
  מוצרים או שירותים מסוימים עשויים להיות זמינים באופן בלעדי באינטרנט דרך האתר. ייתכן שלמוצרים או שירותים אלה יהיו כמויות מוגבלות והם כפופים להחזרה או החלפה רק בהתאם למדיניות ההחזרות שלנו.
  עשינו את מירב המאמצים להציג בצורה מדויקת ככל האפשר את הצבעים והתמונות של המוצרים שלנו המופיעים בחנות. איננו יכולים להבטיח שתצוגת צג המחשב שלך בכל צבע תהיה מדויקת.
  אנו שומרים לעצמנו את הזכות, אך לא מחויבים, להגביל את המכירות של המוצרים או השירותים שלנו לכל אדם, אזור גיאוגרפי או תחום שיפוט. אנו עשויים לממש זכות זו על בסיס כל מקרה לגופו. אנו שומרים לעצמנו את הזכות להגביל את הכמויות של כל מוצר או שירות שאנו מציעים. כל תיאורי המוצרים או תמחור המוצרים כפופים לשינוי בכל עת ללא הודעה מוקדמת, לפי שיקול דעתנו הבלעדי. אנו שומרים לעצמנו את הזכות להפסיק כל מוצר בכל עת. כל הצעה עבור כל מוצר או שירות שנעשה באתר זה בטלה היכן שהיא אסורה.
  איננו מתחייבים שהאיכות של כל מוצר, שירות, מידע או חומר אחר שנרכש או הושג על ידך יענה על הציפיות שלך, או שכל שגיאות בשירות יתוקנו.
 `;

  return (
    <div className="wrapper">
      <div className="content">

      </div>

      <footer className="footer">
        <Container style = {{direction: "rtl", justifyContent: "right", textAlign: "right"}}>
        <div style = {{height: "0.3rem"}}/>
          <Row>

            <Col>
                <Col className="mb-4">
                  <b>
                עמודי האתר
                </b>
                </Col>
                <Col className="mb-2" style = {{cursor: "pointer", width: "30%"}} onClick = {() => navigate('/')}>
                עמוד הבית
                </Col>

                {storedIsLogged ? (
                                      <>
                                        <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/profile')}>
                                        החשבון שלי
                                        </Col>
                                        <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/profile/orders')}>
                                        ההזמנות שלי
                                        </Col>
                                      </>
                                        ) : (
                                          <>
                                            <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/authentication/register')}>
                                            הרשמה
                                            </Col>
                                            <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/authentication/login')}>
                                            התחברות
                                            </Col>
                                          </>
                                        )}

                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/cart')}>
                    העגלה שלי
                    </Col>

                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {() => navigate('/cart')}>
                    הרשימה שלי
                    </Col>

                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {handleShow6}>
                    תקנון האתר
                    </Col>
                                        
                    <Modal show={showModal6} onHide={handleClose6} animation={false} style = {{direction: "rtl"}}>
        <Modal.Header>
          <Modal.Title>תקנון האתר</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{termsPolicyContent}</pre></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose6}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>

                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}} onClick = {handleShow5}>
                    תנאי שירות
                    </Col>

                                        
                    <Modal show={showModal5} onHide={handleClose5} animation={false} style = {{direction: "rtl"}}>
        <Modal.Header>
          <Modal.Title>תנאי שירות</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{servicePolicyContent}</pre></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose5}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>

                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "40%"}} onClick = {handleShow4}>
                    מדיניות המשלוח
                    </Col>
                    
                    <Modal show={showModal4} onHide={handleClose4} animation={false} style = {{direction: "rtl"}}>
        <Modal.Header>
          <Modal.Title>מדיניות המשלוח</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{deliveryPolicyContent}</pre></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>


                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "40%"}} onClick = {handleShow3}>
                    מדיניות הפרטיות
                    </Col>


                    <Modal show={showModal3} onHide={handleClose3} animation={false} style = {{direction: "rtl"}}>
        <Modal.Header>
          <Modal.Title>מדיניות פרטיות</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{privacyPolicyContent}</pre></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>

                    <Col className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "40%"}} onClick = {handleShow2}>
                    מדיניות החזרים
                    </Col>

                    <Modal show={showModal2} onHide={handleClose2} animation={false} style = {{direction: "rtl", maxHeight: "90%"}}>
        <Modal.Header>
          <Modal.Title>מדיניות החזרים</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{refundPolicyContent}</pre></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
          סגור
          </Button>
        </Modal.Footer>
      </Modal>
            </Col>


            <Col>
                <Col className="mb-4">
                  <b>
                  מותגים
                </b>
                </Col>

                {brands.map(brand =>
                <Col key = {brand.id} className="mb-2" style = {{cursor: "pointer", width: isMobile ? "100%" : "30%"}}>
                  <div onClick = {() => navigate(`/brand/shoes/${brand.id}/`)}>
                    {brand.name}
                  </div>
                </Col>)}

            </Col>


            <Col>
            <Col className="mb-4">
                  <b>
                    יצירת קשר
                </b>
                </Col>

                <Col className="mb-2" style = {{cursor: "pointer", display: "flex", alignItems: "center", width: isMobile ? "100%" : "30%"}} onClick = {handleInstagramClick}>
                  <div>
                    <InstagramIcon />
                  </div>&nbsp;&nbsp;&nbsp;
                  <div>
                    אינסטגרם
                  </div>
                  </Col>
                  
                <Col className="mb-2" style = {{cursor: "pointer", display: "flex", alignItems: "center", width: isMobile ? "100%" : "30%"}} onClick = {handleFacebookClick}>
                <div>
                    <FacebookIcon />
                  </div>&nbsp;&nbsp;&nbsp;
                  <div>
                  פייסבוק
                  </div>
                </Col>

                <Col className="mb-2" style = {{cursor: "pointer", display: "flex", alignItems: "center", width: isMobile ? "100%" : "30%"}} onClick = {handleWhatsappClick2}>
                <div>
                    <WhatsAppIcon />
                  </div>&nbsp;&nbsp;&nbsp;
                  <div>
                  וואצפ
                  </div>
                </Col>

                <Col className="mb-2" style = {{cursor: "pointer", display: "flex", alignItems: "center", width: isMobile ? "100%" : "50%"}} onClick={handleEmailClick}>
                <div>
                    <EmailIcon />
                  </div>&nbsp;&nbsp;&nbsp;
                  <div>
                  צרו קשר במייל
                  </div>
                </Col>

            </Col>

                {isMobile && (
                  <>
                 <div style = {{height: "1.75rem"}}/>
                  <div className = 'divider-white'/>
                <div style = {{height: "2rem"}}/>
                </>
                  )}

            <Col>
                <b>יש דגם שאתם רוצים ולא מוצאים?</b><div style = {{height: "1rem"}}/>
                שלחו לנו הודעה באינסטגרם, וואצפ או במייל ונשיג עבורכם את הדגם!

                <Col>
                <div style = {{height: "2rem"}}/>

                לחיפוש דגם:
                <div style = {{height: "0.8rem"}}/>

                <div style = {{display: "flex"}}>

            <SearchIcon style = {{position: "relative", right: "-0.7rem", bottom: "-0.2rem", color: "white", cursor: "pointer"}}/>

            
            <Autocomplete
            style = {{width: "13rem"}}
          className={classes.autocompleteRoot}
          freeSolo
          options={shoes.map((shoe) => ({
            id: shoe.id,
            name: shoe.name,
            image: shoe.images[0],
          }))}
          getOptionLabel={(shoe: any) => shoe.name}
          renderOption={(props, shoe) => (
            <li {...props}>

              {isSearchLoading ? (
                <div className="loader" style = {{width: "30px", direction: "rtl"}}/>
              ) : (
                <div
                style={{ display: 'flex', direction: 'rtl', alignItems: "center"}}
                onClick={() => navigate(`/brand/single_shoe/${shoe.id}/`)}
              >
                <img
                style = {{transform: "scaleX(-1)"}}
                  src={`${myServer}/static/images/${shoe.image}`}
                  width="20%"
                  height="auto"
                />
                <p style = {{position: "relative", marginTop: "20px", alignItems: "flex-end", marginRight: "10px"}}>{shoe.name}</p>
              </div>
              )}


            </li>
          )}
          renderInput={(params) => (
            <TextField
              placeholder="חיפוש..."
              variant="standard"
              {...params}
              onChange={handleSearchInputChange}
              value={searchShoe}
              InputLabelProps={{ style: { color: 'black' } }}
            />
          )}
        />

        </div>

        <div style={{ height: "179px", display: "flex", alignItems: "flex-end" }}>
          <p style = {{direction: "rtl", position: "absolute", transform: "translateY(-0.4rem)"}}>
            <CopyrightIcon style = {{fontSize: "1.3rem", marginBottom: "3px"}}/>&nbsp;כל הזכויות שמורות לEscape Shoes
            </p>
          <div>
                        <img
                        style = {{position: "absolute", transform: "translateY(-1.5rem)"}}
                        src={require('../../images/payments2.png')}
                        alt="payments"
                        height="40px"
                        width="350px"/>
          </div>
        </div>

                </Col>
            </Col>
          </Row>

          </Container>

          <Row>
            <Col style = {{direction: "rtl"}}>
            <div style = {{height: "1.5rem"}}/>


            <div className = 'divider-white'/>
            <div style = {{height: "1.1rem"}}/>

            <b style = {{cursor: "pointer", textDecoration: "underline"}} onClick = {handleWhatsappClick}>
              פיתוח ועיצוב אתרים &nbsp; - &nbsp; <b>Omer Yanai</b>
            </b><CopyrightIcon style = {{fontSize: "1.3rem", marginBottom: "3px"}}/>

            {isMobile && (
                  <>
                <div style = {{height: "1rem"}}/>
                <div className = 'divider-white'/>
                </>
                  )}
            </Col>
          </Row>
        
      </footer>

      <Modal show={showModal} onHide={handleCloseModal} style = {{direction: "rtl"}}>
            <Modal.Header>
              <Modal.Title>צרו קשר במייל</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <b>escapeilhelp@gmail.com</b>
            </Modal.Body>
          </Modal>
    </div>
  );
};

export default MyFooter;
