import './Backoffice.css'
import { useEffect, useState } from "react";
import { addProduct, getAllCategories, getAllProducts } from '../../services/backofficeServices';


export default function ProductsBO(props) {
    const [inputSelectCategoria, setInputSelectCategoria] = useState()
    const [categoriesList, setCategoriesList] = useState();
    const [subcategoriesList, setSubcategoriesList] = useState();
    const [productsList, setProductsList] = useState();
    const mainCategoriesList = categoriesList ? categoriesList.filter((category) => !category.subcategoryCategoryId) : [];

    const getSubcategoriesList = () => {
        if (inputSelectCategoria && inputSelectCategoria !== "[Ninguno]") {
            getAllCategories().then((allCategories) => {
                const subcategories = allCategories.filter((category) => String(category.subcategoryCategoryId) === String(inputSelectCategoria));
                console.log("subcategories", subcategories);
                setSubcategoriesList(subcategories);
            });
        }
    }

    useEffect(() => {
        if (!categoriesList) {
            getAllCategories().then((response) => { setCategoriesList(response) })
        }
        if (!subcategoriesList) {
            getSubcategoriesList();
        }
        if (!productsList) {
            getAllProducts().then((response) => { setProductsList(response) });
        }
    });

    console.log("ProductList", productsList)

    useEffect(getSubcategoriesList, [inputSelectCategoria]);

    const submitFormHandle = (e) => {
        e.preventDefault();
        let categoryId = null;

        if (String(e.target.inputSubcategoryCategoryId.value) !== "[Ninguno]") {
            categoryId = String(e.target.inputSubcategoryCategoryId.value);
        }
        else if (String(e.target.inputCategoryId.value) !== "[Ninguno]") {
            categoryId = String(e.target.inputCategoryId.value);
        }

        const productForm = {
            name: String(e.target.inputProductName.value),
            brand: String(e.target.inputProductBrand.value),
            price: String(e.target.inputPrice.value),
            unit: String(e.target.inputUnit.value),
            imageURL: String(e.target.inputFotoURL.value),
            categoryId: categoryId
        }
        addProduct(productForm).then(response => {
            alert(response?.msg)
            if (response?.success) {
                window.location.reload();
            }
        })
    }

    const ProductRow = ({product}) => {
        const { id, name, brand, price, categoryId, unit, imageURL } = product
        const category = categoriesList?.filter((element) => String(element.id) === String(categoryId))[0];
        let category2;
        let categoryText = category?.urlReference;

        if(category?.subcategoryCategoryId){
            category2 = categoriesList?.filter((element) => String(element.id) === String(category.subcategoryCategoryId))[0];
            categoryText = String(category2?.urlReference + "/" + category.urlReference);
        }
        
        console.log("Category", category)
        return (
            <li className='bo-product-row' key={id}>
                <div className='d-flex w-100'>
                    <div className='p-2'>
                        <img className='bo-product-row-img' src={imageURL} alt={name} />
                    </div>
                    <div className='d-flex flex-column p-2'>
                        <strong>{name}</strong>
                        <span className='text-muted'>{categoryText}</span>
                        <span><i className="bi bi-tag me-1"></i>{brand}</span>
                        <span><i className="bi bi-currency-dollar me-1"></i>{price}</span>
                        <span><i className="bi bi-box2 me-1"></i>{unit}</span>
                    </div>
                </div>
                <div className='d-flex flex-column'>
                    <button className='btn btn-danger'>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </li>
        );
    }

    return (
        <section className="container-fluid p-5 text-start overflow-auto">
            <h2 className="bo-title">Productos</h2>
            <hr />
            <h3>Nueva producto:</h3>
            <div className="bo-form-container">
                <form onSubmit={submitFormHandle}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputProductName">Nombre</label>
                        <input id="inputProductName" type="text" className="form-control" placeholder="Nombre del producto" required={true} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputProductBrand">
                            <span className="me-2">Marca</span>
                            <i className="bi bi-tag"></i>
                        </label>
                        <input id="inputProductBrand" type="text" className="form-control" placeholder="Buscar marca" required={true} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputPrice">Precio</label>
                        <label className="input-group-text" htmlFor="inputPrice">
                            <i className="bi bi-currency-dollar"></i>
                        </label>
                        <input id="inputPrice" type="number" step="0.01" className="form-control" placeholder="$" required={true} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputUnit">
                            <span className="me-2">Unidad</span>
                            <i className="bi bi-box2"></i>
                        </label>
                        <input id="inputUnit" type="text" className="form-control" placeholder="Ej: 1kg" required={true} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputFotoURL">Foto (URL)</label>
                        <input id="inputFotoURL" type="text" className="form-control" placeholder="https://..." required={true} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputCategoryId">Categoria</label>
                        <select className="form-select" aria-label="Category select" id='inputCategoryId' onChange={(e) => { setInputSelectCategoria(e.target.value) }}>
                            <option defaultValue>[Ninguno]</option>
                            {mainCategoriesList.map((category) => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputSubcategoryCategoryId">Subcategoria</label>
                        <select className="form-select" aria-label="Category select" id='inputSubcategoryCategoryId'>
                            <option defaultValue>[Ninguno]</option>
                            {subcategoriesList?.map((subcategory) => {
                                return <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                            })}
                        </select>
                    </div>
                    <button type='submit' className='btn btn-success w-100'>
                        <span>Agregar</span>
                    </button>
                </form>
            </div>
            <hr />
            <ul className='p-0'>
                {productsList?.map((product) => <ProductRow product={product} />)}
            </ul>
        </section>
    );
}