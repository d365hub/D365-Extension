function Category(props: any) {
    const { id, title, isSelected, iconUrl, onChange } = props;

    return (
        <>
            <li className="list-group-item d-flex justify-content-between">
                <div>
                    <img src={iconUrl} className="rounded me-2" alt="" width={32} />
                    <label className="form-check-label" >{title}</label>
                </div>
                {isSelected}
                <input title="category" className="form-check-input me-1" type="checkbox" checked={isSelected} onChange={() => onChange(id, !isSelected)} />
            </li>
        </>
    )
}

export default Category;