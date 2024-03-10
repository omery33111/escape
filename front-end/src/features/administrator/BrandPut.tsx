import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Brand } from '../../models/Brand';
import { postBrandAsync, putBrandAsync } from './administratorSlice';
import { getSingleBrandAsync, selectSingleBrand } from '../brand/brandSlice';



const BrandPut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined)
    {
      dispatch(getSingleBrandAsync(id));
    }
  }, [dispatch]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [models, setModels] = useState<any>(null);

  const [modelsArray, setModelsArray] = useState<string[]>(['']);

  const handleModelInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedModelsArray = [...modelsArray];
    updatedModelsArray[index] = event.target.value;
    setModelsArray(updatedModelsArray.filter(model => model.trim() !== ''));
  };


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedName = e.target.value.replace(/<br\s*\/?>/g, '\n');
    setName(updatedName);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Replace <br> or <br/> with newline characters \n before updating the state
    const updatedDescription = e.target.value.replace(/<br\s*\/?>/g, '\n');
    setDescription(updatedDescription);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  
    const formData: any = new FormData();
    formData.append('name', name);
    formData.append('description', description);

    const modelsJson = JSON.stringify(modelsArray); 
    formData.append('models', modelsJson);
  
  
    dispatch(putBrandAsync({ brandData: formData, id: Number(id) }));
  
    setTimeout(() => {
      navigate("/administrator/brands/");
    }, 150);
  };

  const singleBrand = useAppSelector(selectSingleBrand)

  useEffect(() => {
    if (singleBrand) {
      setName(singleBrand.name || '');
      setDescription(singleBrand.description || '');
      setModels(singleBrand.models);
      if (singleBrand.models && singleBrand.models.length > 0) {
        setModelsArray([...singleBrand.models]);
      }
    }
  }, [singleBrand]);

  const handleAddModelInput = () => {
    setModelsArray([...modelsArray, '']);
  };
  
  const handleDeleteModelsInput = (index: number) => {
    const updatedModelsArray = [...modelsArray];
    updatedModelsArray.splice(index, 1);
    setModelsArray(updatedModelsArray);
  };

  return (
    <div>
      <Container>
        <h1>BRAND</h1>
        <br />
        <br />
        <Form onSubmit={handleSubmit} className="post-form">
        <Form.Group>
                <Form.Label><h5>BRAND</h5></Form.Label>
                <Form.Control type="textarea" value={name} onChange={handleNameChange} />
              </Form.Group>

              <Form.Group>
          <Form.Label><h5>DESCRIPTION</h5></Form.Label>
          <Form.Control as="textarea" value={description} onChange={handleDescriptionChange} />
        </Form.Group>

        <Form.Group>
  <Form.Label>
    <h5>Models</h5>
  </Form.Label>
  {modelsArray.map((model, index) => (
    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        type="text"
        value={model}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleModelInputChange(index, e)}
      /> &nbsp;&nbsp;<Button variant="danger" onClick={() => handleDeleteModelsInput(index)}>Delete</Button>
    </div>
  ))}<br/>
  <Button variant="secondary" onClick={handleAddModelInput}>
    Add Model
  </Button>
</Form.Group>
      
          <br />

            <div style = {{gap: "20px", display: "flex", width: "100%"}}>
            <Button variant="warning" type="submit" style = {{width: "20%"}}>
              <h6>
                <BsCheckLg />
              </h6>
            </Button>

            <Button className="cancel-update-blog" variant="info" style = {{width: "20%"}}>
              <Link style={{ textDecoration: "none", color: "black" }} to="/administrator/brands/">
                <h6>
                  <BsXLg />
                </h6>
              </Link>
            </Button>
            </div>

        </Form>

        <div style={{ height: "30vh" }} />
      </Container>
    </div>
  );
};

export default BrandPut;