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
                  src={require('../../images/adminmenu1.png')}
                  alt="portalpic1"
                  height="auto"
                  width="100%"
                />
              </div>
            </Link>
          </div>

          <div>
          <Link to="/administrator/orders/recent_orders">
              <div>
                <img
                  className="admin-panel-pic"
                  src={require('../../images/adminmenu2.png')}
                  alt="portalpic1"
                  height="auto"
                  width="100%"
                />
              </div>
            </Link>
          </div>

          <div>
            <Link to="/administrator/community">
              <img
                className="admin-panel-pic"
                src={require('../../images/adminmenu3.png')}
                alt="portalpic3"
                height="auto"
                width="100%"
              />
            </Link>
          </div>

          <div>
            <Link to="/administrator/instagram_recs">
              <img
                className="admin-panel-pic"
                src={require('../../images/adminmenu4.png')}
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