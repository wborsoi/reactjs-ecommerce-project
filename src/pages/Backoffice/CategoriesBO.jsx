import { useState } from 'react';
import './Backoffice.css'
import { addCategory, getAllCategories, removeCategory } from '../../services/backofficeServices';
import { useEffect } from 'react';

export default function CategoriesBO(params) {
    const [inputCategoryRefID, setInputCategoryRefID] = useState("");
    const [categoriesList, setCategoriesList] = useState();
    const mainCategoriesList = categoriesList ? categoriesList.filter((category) => !category.subcategoryCategoryId) : [];

    console.log("mainCategoriesList", mainCategoriesList)

    useEffect(() => {
        if (!categoriesList) {
            getAllCategories().then((response) => { setCategoriesList(response) })
        }
    });

    const inputCategoryNameChangeHandler = (e) => {
        let value = e.target.value;
        value = String(value).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
        value = value.replace(/[^a-z0-9]+/gi, '-').replace(/^-+/, '').replace(/-+$/, '').toLowerCase();
        setInputCategoryRefID(value);
    }

    const removeCategoryHandler = (category) => {
        removeCategory(category).then((response) => {
            alert(response?.msg);
            if (response.success) {
                window.location.reload();
            }
        })
    }

    const CategoryRow = ({ category }) => {
        const { id, name, subcategoryCategoryId, urlReference } = category;

        if (!subcategoryCategoryId) {
            return (
                <li className='bo-category-row' key={id}>
                    <div className='d-flex flex-column w-100'>
                        <strong>{name}</strong>
                        <span className='text-muted'>ID: {id}</span>
                        <span>URL Ref.: {urlReference}</span>
                        <SubcategoriesList category={category} />
                    </div>
                    <div className='d-flex flex-column'>
                        <button className='btn btn-danger' onClick={() => { removeCategoryHandler(category) }}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </li>
            );
        }
    }

    const SubcategoriesList = ({ category }) => {
        const subcategoriesList = categoriesList.filter((element) => String(element?.subcategoryCategoryId) === String(category?.id));

        return (
            <ul>
                {subcategoriesList?.map((subcategory) => {
                    return (
                        <li key={subcategory?.id} className='bo-category-row'>
                            <div className='d-flex flex-column'>
                                <strong>{subcategory?.name}</strong>
                                <span className='text-muted'>ID: {subcategory?.id}</span>
                            </div>
                            <div>
                                <button className='btn btn-danger' onClick={() => { removeCategoryHandler(subcategory) }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }

    const addCategoryHandler = (e) => {
        e.preventDefault();
        const category = {
            name: String(e.target.inputCategoryName.value).trim(),
            urlReference: e.target.inputUrlReference.value,
            subcategoryCategoryId: String(e.target.inputSubcategoryCategoryId.value == "[Ninguno]" ? "" : e.target.inputSubcategoryCategoryId.value).trim()
        }

        addCategory(category).then((response) => {
            console.log("Response", response)
            alert(response?.msg);
            if (response.success) {
                window.location.reload(true)
            }
        })
        console.log("agregar;", category)
    }

    return (
        <section className="container-fluid p-5 text-start overflow-auto">
            <h2 className="bo-title">Categorias</h2>
            <hr />
            <h3>Nueva categoria / subcategoria:</h3>
            <div className="bo-form-container">
                <form onSubmit={addCategoryHandler}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputCategoryName">Nombre</label>
                        <input id="inputCategoryName" type="text" className="form-control" placeholder="Nombre" onChange={inputCategoryNameChangeHandler} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputUrlReference">ID de referencia</label>
                        <input disabled id="inputUrlReference" type="text" className="form-control" value={inputCategoryRefID}  readOnly={true} />
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputSubcategoryCategoryId">Subcategoria de:</label>
                        <select className="form-select" aria-label="Category select" id='inputSubcategoryCategoryId'>
                            <option defaultValue>[Ninguno]</option>
                            {mainCategoriesList.map((category) => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
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
                {categoriesList?.map((category) => <CategoryRow key={category?.id} category={category} />)}
            </ul>
        </section>
    );
}