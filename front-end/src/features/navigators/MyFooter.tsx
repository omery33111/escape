import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import './navigators.css'; // Create a CSS file for the footer styles

const MyFooter = () => {
  return (
    <div className="wrapper">
      <div className="content">
        {/* Your main content goes here */}
      </div>

      <footer className="footer">
        <Container className='text-center'>
          <a href="https://github.com/omery33111" style={{ color: "white" }}>
            <FontAwesomeIcon icon={faGithub} size='2x' style={{ margin: "10 20px" }} />
          </a>
          <a href="https://www.instagram.com/omer_yanai/" style={{ color: "white" }}>
            <FontAwesomeIcon icon={faInstagram} size='2x' style={{ margin: "10 20px" }} />
          </a>
          <a href="https://www.linkedin.com/in/omer-yanai-01208a262/" style={{ color: "white" }}>
            <FontAwesomeIcon icon={faLinkedin} size='2x' style={{ margin: "10 20px" }} />
          </a>
        </Container>
        <br />
        <p className="text-center">Copyright &copy; {new Date().getFullYear()} Omer Yanai</p>
      </footer>
    </div>
  );
};

export default MyFooter;
