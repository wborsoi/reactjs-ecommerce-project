function ItemListContainer(props) {
    const { greeting } = props; 
    return(
        <div className="container-fluid">
            {greeting}
        </div>
    );
}

export default ItemListContainer;