import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './administrator.css';

const AdminMenu = () => {
  return (

    <div className = 'admin-menu-center'>

      <Container>

        <div className="admin-panel-pics">

          <div>
            <Link to="/administrator/shoes">
              <div>
                <img
                  className="admin-panel-pic"
                  src={require('../../images/jordan.jpg')}
                  alt="portalpic1"
                  height="auto"
                  width="100%"
                />
              </div>
            </Link>
          </div>

          <div>
            <img
              className="admin-panel-pic"
              src={require('../../images/jordan.jpg')}
              alt="portalpic2"
              height="auto"
              width="100%"
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div>
            <Link to="/administrator/community">
              <img
                className="admin-panel-pic"
                src={require('../../images/jordan.jpg')}
                alt="portalpic3"
                height="auto"
                width="100%"
              />
            </Link>
          </div>

          <div>
            <Link to="/administrator/callback">
              <img
                className="admin-panel-pic"
                src={require('../../images/jordan.jpg')}
                alt="portalpic3"
                height="auto"
                width="100%"
              />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminMenu;