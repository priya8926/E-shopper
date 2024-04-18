import React, { useEffect, useState } from 'react'
import './CreateNewProduct.css'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { clearErros, createNewProuct } from '../../actions/productActions'
import Metadata from '../Layout/Metadata'
import { useAlert } from 'react-alert';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description'; import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StorageIcon from '@mui/icons-material/Storage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET } from '../../constants/productConstant'
import { Button } from '@mui/material'

function CreateNewProduct() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { loading, error, success } = useSelector(state => state.newProduct)

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState([])
    const [images, setImages] = useState([])
    const [imagePreview, setImagePreview] = useState([])

    const categories = ["Footwear", "Jackets", "Blazers", "Jumpsuits", "Sportswear", "Kurti", "Swimwear", "Jeans", "Shirts", "Laptop", "Smartphone", "Bedsheets"]

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErros())
        }
        if (success) {
            alert.success("Product Created Successfully")
            dispatch({ type: NEW_PRODUCT_RESET })
            navigate("/admin/dashboard")
        }
    }, [error, alert, success, dispatch, navigate])

    const createProductSubmitHandler = (e)=>{
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
        dispatch(createNewProuct(myForm))
    }
    
    const createProductOnChange = (e) =>{
        const files = Array.from(e.target.files)

        setImages([])
        setImagePreview([])

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
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form action=""
                        className='createProductForm'
                        encType='multipart/form-data'
                        onSubmit={createProductSubmitHandler}>
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input type="text" placeholder='Product Name' required value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div>
                            <AttachMoneyIcon />
                            <input type="number" placeholder='Price' required
                                onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <div>
                            <DescriptionIcon />
                            <textarea id="" cols="30" rows="5" placeholder='Product Description' value={description}
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setCategory(e.target.value)} >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input type="number" placeholder='Stock' required
                                onChange={(e) => setStock(e.target.value)} />
                        </div>

                        <div id="createProductFormFile">
                            <input type="file" name='avatar' accept='image/*' multiple onChange={createProductOnChange} />
                        </div>

                        <div id="createProductFormImage">
                            {imagePreview.map((image, index) => (
                                <img key={index} src={image} alt='Avatar Preview' />
                            ))}
                        </div>

                        <Button id="createProductBtn" type="submit" >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateNewProduct
