import React, { useEffect, useState } from 'react'
import './CreateNewProduct.css'
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { clearErros, updateProuct,getProductDetails } from '../../actions/productActions'
import Metadata from '../Layout/Metadata'
import { useAlert } from 'react-alert';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description'; import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StorageIcon from '@mui/icons-material/Storage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstant'
import { Button } from '@mui/material'

function UpdateProduct() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const prodouctId = useParams()

    const { loading, error:updateError, isUpdated } = useSelector(state => state.deleteProduct)
    const{error , product} = useSelector(state => state.productDetails)

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const[oldImages , setOldImages] = useState([])
    const [imagePreview, setImagePreview] = useState([])

    const categories = ["Footwear", "Jackets", "Blazers", "Jumpsuits", "Sportswear", "Kurti", "Swimwear", "Jeans", "Shirts", "Laptop", "Smartphone", "Bedsheets" ,"Accerssories"]

    useEffect(() => {
      if(product && product._id !== prodouctId.id){
        dispatch(getProductDetails(prodouctId.id))
      }else{
        setName(product.name)
        setPrice(product.price)
        setStock(product.stock)
        setDescription(product.description)
        setOldImages(product.images)
      }
        if (error) {
            alert.error("All feilds are required")
            dispatch(clearErros())
        }
        if(updateError){
          alert.error(updateError)
          dispatch(clearErros())
        }
        if (isUpdated) {
            alert.success("Product Updated Successfully")
            dispatch({ type: UPDATE_PRODUCT_RESET })
            navigate("/admin/products")
        }
    }, [error, alert, isUpdated, dispatch, navigate , product , prodouctId])

    const updateProductSubmitHandler = (e)=>{
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("name" , name)
        myForm.set("price" , price)
        myForm.set("description"  , description)
        myForm.set("category"  , category)
        myForm.set("stock" , stock)

        images.forEach((image) =>{
            myForm.append("images " , image)
        })
        dispatch(updateProuct(prodouctId.id,myForm))
    }
    
    const updateProductOnChange = (e) =>{
        const files = Array.from(e.target.files)

        setImages([])
        setImagePreview([])
        setOldImages([])

        files.forEach((file)=>{
            const reader = new FileReader();
            
            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setImagePreview((prevImage)=> [...prevImage , reader.result]);
                    setImages((prevImage) => [...prevImage , reader.result])

                }
            }
            reader.readAsDataURL(file)
        })
    }

    return (
        <>
            <Metadata title={'Create Product --admin'} />
            <div className="dashboard " style={{top : 0 , left:0 , position:"fixed" , zIndex:1}}>
                <Sidebar />
                <div className="newProductContainer">
                    <form action=""
                        className='createProductForm'
                        encType='multipart/form-data'
                        onSubmit={updateProductSubmitHandler}>
                        <h1>Update Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input type="text" placeholder='Product Name' required value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div>
                            <AttachMoneyIcon />
                            <input type="number" placeholder='Price' required value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <div>
                            <DescriptionIcon />
                            <textarea id="" cols="30" rows="5" placeholder='Product Description' value={description}
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}  >
                                <option>Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input type="number" placeholder='Stock' required value={stock} 
                                onChange={(e) => setStock(e.target.value)} />
                        </div>

                        <div id="createProductFormFile">
                            <input type="file" name='avatar' accept='image/*' multiple onChange={updateProductOnChange} />
                        </div>

                        <div id="createProductFormImage">
                            { oldImages &&oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt='Product Preview' />
                            ))}
                        </div>
                        <div id="createProductFormImage">
                            {imagePreview.map((image, index) => (
                                <img key={index} src={image} alt='Product Preview' />
                            ))}
                        </div>

                        <Button id="createProductBtn" type="submit" >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct
