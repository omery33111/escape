import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Shoe } from '../../models/Shoe';
import { postShoeAsync, selectCurrentBrand, setCurrentBrand } from './administratorSlice';
import { ShoeImage } from '../../models/ShoeImage';
import { postShoeImageAsync } from '../shoe/shoeSlice';
import { getAllBrandsAsync, getSingleBrandAsync, selectAllBrands, selectSingleBrand } from '../brand/brandSlice';
import { Brand } from '../../models/Brand';



const ShoePost = () => {
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
  const [wall, setWall] = useState(false);
  const [chosen, setChosen] = useState(false);
  const [outOf, setOutOf] = useState(false);


  const [sizesArray, setSizesArray] = useState<string[]>(['']);
  const [imagesArray, setImagesArray] = useState<string[]>(['']);


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Replace <br> or <br/> with newline characters \n before updating the state
    const updatedDescription = e.target.value.replace(/<br\s*\/?>/g, '\n');
    setDescription(updatedDescription);
  };

  const handlePriceBeforeChange = (e: any) => {
    const inputPrice = parseFloat(e.target.value);
    setpriceBefore(isNaN(inputPrice) ? 0 : inputPrice);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = parseFloat(e.target.value);
    setPrice(isNaN(inputPrice) ? 0 : inputPrice);
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


  const nikeSizes = [
    '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40',
    '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5',
    '45', '45.5', '46', '46.5', '47', '47.5'
  ];
  

  const [includeNikeSizes, setIncludeNikeSizes] = useState(false);

  const handleNikeSizesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeNikeSizes(e.target.checked);

    if (e.target.checked) {
      setSizesArray([...nikeSizes]);
    } else {
      setSizesArray(['']); // Reset to an empty array or default value when unchecked
    }
  };


  const adidasSizes = [
    '36', '36 2/3', '37 1/3', '38', '38 2/3', '39 1/3', '40',
    '40 2/3', '41 1/3', '42', '42 2/3', '43 1/3', '44', '44 2/3',
    '45 1/3', '46', '46 2/3', '47 1/3', '48'
  ];

  const [includeAdidasSizes, setIncludeAdidasSizes] = useState(false);

  const handleAdidasSizesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeAdidasSizes(e.target.checked);

    if (e.target.checked) {
      setSizesArray([...adidasSizes]);
    } else {
      setSizesArray(['']); // Reset to an empty array or default value when unchecked
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
    formData.append('wall', wall);
    formData.append('chosen', chosen);
    formData.append('out_of', outOf);


    const sizesJson = JSON.stringify(sizesArray); 
    formData.append('sizes', sizesJson);

    const imagesJson = JSON.stringify(imagesArray); 
    formData.append('images', imagesJson); 
  
    dispatch(postShoeAsync(formData));
  
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

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShoeImages(event.target.files ? event.target.files[0] : undefined);
  };

  const handleImageSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', shoeImages);

    dispatch(postShoeImageAsync(formData));

    setShoeImages('')
  };

  const currentBrandID = useAppSelector(selectCurrentBrand)

  useEffect(() => {
    dispatch(getAllBrandsAsync());

    if (currentBrandID !== 0)
    {
    dispatch(getSingleBrandAsync(currentBrandID.toString()));
    }

  }, [dispatch, currentBrandID]);

  const singleBrand = useAppSelector(selectSingleBrand)

  const brands = useAppSelector(selectAllBrands)
  
  const handleBrandChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedBrandId = Number(e.target.value);
    setBrand(selectedBrandId); // Update local state
    dispatch(setCurrentBrand(selectedBrandId)); // Dispatch action to update Redux state
  };



  const handleModelChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedModelId = e.target.value as string; // Assuming model ID is a string
    setModel(selectedModelId); // Update local state with selected model ID
  };

  return (
    <div>
      <Container>
        <h1>SHOE</h1>
        <br />
        <br />

        <Form onSubmit={handleImageSubmit} className="post-form">
          <Form.Group controlId="formThumbnail">
                    <Form.Label className = "blog-form-title"><h5>Upload Images</h5></Form.Label>
                    <Form.Control type="file" onChange = {handleImage}/>
          </Form.Group><br/>

          <Button variant="secondary" type="submit">
            Add
          </Button>
        </Form>

        <hr/>

        
        <Form onSubmit={handleSubmit} className="post-form">

        <Form.Group controlId="formSubject">
      <h5>Brand</h5>
      <Form.Control
        as="select"
        onChange={handleBrandChange} // Call handleBrandChange on change
        required
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
            <Form.Control type="text" required value={name} onChange={handleNameChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <h5>Description</h5>
            </Form.Label>
            <Form.Control as="textarea" required value={description} onChange={handleDescriptionChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <h5>Price Before</h5>
            </Form.Label>
            <Form.Control type="number" required value={priceBefore} min = {0} onChange={handlePriceBeforeChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <h5>Price</h5>
            </Form.Label>
            <Form.Control type="number" required value={price} min = {0} onChange={handlePriceChange} />
          </Form.Group>
            

          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Include Nike Sizes"
              checked={includeNikeSizes}
              onChange={handleNikeSizesChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Include Adidas Sizes"
              checked={includeAdidasSizes}
              onChange={handleAdidasSizesChange}
            />
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
      required
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageInputChange(index, e)}/>
      {/* {image && <p>{image.name}</p>} */}
    </div>
  ))}<br/>
  <Button variant="secondary" onClick={handleAddImageInput}>
    Add Image
  </Button>
</Form.Group><br/>

<Form.Group>
  <Form.Check
    type="checkbox"
    label="Wall"
    onChange={(e) => setWall(e.target.checked)}
  />
</Form.Group>
<br/>
<Form.Group>
  <Form.Check
    type="checkbox"
    label="Chosen"
    onChange={(e) => setChosen(e.target.checked)}
  />
</Form.Group>
<br/>
<Form.Group>
  <Form.Check
    type="checkbox"
    label="Out Of Stock"
    onChange={(e) => setOutOf(e.target.checked)}
  />
</Form.Group>
</div>

          

          

          <br />

          <div style={{ gap: '20px', display: 'flex', width: '100%' }}>
            <Button variant="warning" type="submit" style={{ width: '20%' }}>
              <h6>
                <BsCheckLg />
              </h6>
            </Button>

            <Button className="cancel-update-blog" variant="info" style={{ width: '20%' }}>
              <Link style={{ textDecoration: 'none', color: 'black' }} to="/administrator/brands/">
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

export default ShoePost;