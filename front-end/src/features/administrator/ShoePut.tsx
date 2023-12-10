import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Shoe } from '../../models/Shoe';
import { postShoeAsync, putShoeAsync, selectCurrentBrand, setCurrentBrand } from './administratorSlice';
import { ShoeImage } from '../../models/ShoeImage';
import { getSingleShoeAsync, postShoeImageAsync, selectSingleShoe } from '../shoe/shoeSlice';
import { getAllBrandsAsync, getSingleBrandAsync, selectAllBrands, selectSingleBrand } from '../brand/brandSlice';
import { Brand } from '../../models/Brand';



const ShoePut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceBefore, setpriceBefore] = useState(0);
  const [price, setPrice] = useState<number>(0);
  const [sizes, setSizes] = useState<any>(null);
  const [images, setImages] = useState<any>(null);
  const [brand, setBrand] = useState(0);
  const [model, setModel] = useState('');

  const [sizesArray, setSizesArray] = useState<string[]>(['']);
  const [imagesArray, setImagesArray] = useState<string[]>(['']);


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePriceBeforeChange = (e: any) => {
    setpriceBefore(e.target.value);
  };

  const handlePriceChange = (e: any) => {
    setPrice(e.target.value);
  };


  const handleSizeInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSizesArray = [...sizesArray];
    updatedSizesArray[index] = event.target.value;
    setSizesArray(updatedSizesArray);
  };

  
  const handleImageInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileName = file.name;
  
      const updatedImagesArray = [...imagesArray];
      updatedImagesArray[index] = `${fileName}`;
      setImagesArray(updatedImagesArray);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  
    const formData: any = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price_before', priceBefore);
    formData.append('price', price);
    formData.append('brand', brand);
    formData.append('model', model);

    const sizesJson = JSON.stringify(sizesArray); 
    formData.append('sizes', sizesJson);

    const imagesJson = JSON.stringify(imagesArray); 
    formData.append('images', imagesJson);
  
    const newSubject: Shoe = {
      name: name,
      description: description,
      price_before: priceBefore,
      price: price,
      sizes: sizes,
      images: images,
      brand: brand,
      model: model,
    };
    
    
  
    dispatch(putShoeAsync({ shoeData: formData, id: Number(id) }));
  
    setTimeout(() => {
      navigate("/administrator/shoes/");
    }, 150);
  };


  const handleAddSizeInput = () => {
    setSizesArray([...sizesArray, '']);
  };

  const handleAddImageInput = () => {
    setImagesArray([...imagesArray, '']);
  };

  

  const [shoeImages, setShoeImages] = useState<any>(null);

  const currentBrandID = useAppSelector(selectCurrentBrand)

  useEffect(() => {
    dispatch(getAllBrandsAsync());

    if (currentBrandID !== 0)
    {
    dispatch(getSingleBrandAsync(currentBrandID.toString()));
    }

  }, [dispatch, currentBrandID]);

  const singleBrand = useAppSelector(selectSingleBrand)

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllBrandsAsync());

    if (id !== undefined)
    {
      dispatch(getSingleShoeAsync(id));
    }
  }, [dispatch]);

  const singleShoe = useAppSelector(selectSingleShoe)

  useEffect(() => {
    if (singleShoe) {
      setName(singleShoe.name || '');
      setDescription(singleShoe.description || '');
      setpriceBefore(singleShoe.price_before || 0);
      setPrice(singleShoe.price || 0);
      setBrand(singleShoe.brand || 0);
      // setBrand(singleShoe.model || '');

      // Assuming sizes and images are arrays in singleShoe
      setSizesArray(singleShoe.sizes || []);
      setImagesArray(singleShoe.images || []);
    }
  }, [singleShoe]);

  const brands = useAppSelector(selectAllBrands)

  const handleModelChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedModelId = e.target.value as string; // Assuming model ID is a string
    setModel(selectedModelId); // Update local state with selected model ID
  };
  
  const handleBrandChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedBrandId = Number(e.target.value);
    setBrand(selectedBrandId); // Update local state
    dispatch(setCurrentBrand(selectedBrandId)); // Dispatch action to update Redux state
  };

  return (
    <div>
      <Container>
        <h1>SHOES</h1>
        <br />
        <br />
        
        <Form onSubmit={handleSubmit} className="post-form">

        <Form.Group controlId="formSubject">
          <h5>Shoe</h5>
          <Form.Control
            as="select"
            onChange={handleBrandChange}
            value={brand}
          >
            <option value="">SELECT A BRAND</option>
            {brands.map((brand: Brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formModel">
          <h5>Model</h5>
          <Form.Control
            as="select"
            onChange={handleModelChange}
            required
            value={model}
          >
            <option value="">SELECT A MODEL</option>
            {singleBrand.models.map((model, index) => (
              <option key={index} value={model}>
                {model} {/* Assuming 'name' is the property for model name */}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

          <Form.Group>
            <Form.Label>
              <h5>Name</h5>
            </Form.Label>
            <Form.Control type="text" value={name} onChange={handleNameChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <h5>Description</h5>
            </Form.Label>
            <Form.Control type="text" value={description} onChange={handleDescriptionChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <h5>Price Before</h5>
            </Form.Label>
            <Form.Control type="number" value={priceBefore} min = {0} onChange={handlePriceBeforeChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <h5>Price</h5>
            </Form.Label>
            <Form.Control type="number" value={price} min = {0} onChange={handlePriceChange} />
          </Form.Group>

          <Form.Group>
  <Form.Label>
    <h5>Sizes</h5>
  </Form.Label>
  {sizesArray.map((size, index) => (
    <div key={index}>
      <Form.Control
    
        type="text"
        value={size}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSizeInputChange(index, e)}
      />
    </div>
  ))}<br/>
  <Button variant="secondary" onClick={handleAddSizeInput}>
    Add Size
  </Button>
</Form.Group><br/>

  <div>
<Form.Group>
  <Form.Label>
    <h5>Images</h5>
  </Form.Label>
  {imagesArray.map((image, index) => (
    <div key={index}>
      <Form.Control
    
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageInputChange(index, e)}/>
      {/* {image && <p>{image.name}</p>} */}
    </div>
  ))}<br/>
  <Button variant="secondary" onClick={handleAddImageInput}>
    Add Image
  </Button>
</Form.Group><br/>
</div>

          

          

          <br />

          <div style={{ gap: '20px', display: 'flex', width: '100%' }}>
            <Button variant="warning" type="submit" style={{ width: '20%' }}>
              <h6>
                <BsCheckLg />
              </h6>
            </Button>

            <Button className="cancel-update-blog" variant="info" style={{ width: '20%' }}>
              <Link style={{ textDecoration: 'none', color: 'black' }} to="/administrator/shoes/">
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

export default ShoePut;