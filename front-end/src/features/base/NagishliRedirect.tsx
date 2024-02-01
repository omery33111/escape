import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NagishliRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/accessibility/nagishli.js');
  }, []);


  return null;
};

export default NagishliRedirect;
