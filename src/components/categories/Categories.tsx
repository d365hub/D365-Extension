import { useEffect, useState } from "react";
import { ICategory } from "../../models/ICategory";
import * as _ from "lodash";
import { IGroup } from "../../models/IGroup";
import apiCategories from "../../services/api/api.categories";
import storage from "../../services/storage.service";
import Category from "./Category";

function Categories() {
    const categoriesKey = "categories";
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [groupedCategories, setGroupedCategories] = useState<IGroup[]>([]);
    const [loading, setLoading] = useState(false);

    //First load
    useEffect(() => {
        async function loadCategories() {

            setLoading(true);

            const categoriesData = await storage.get(categoriesKey);

            let localCategories: ICategory[] = categoriesData?.categories || [];

            //Fetch all remote categories
            const allCategories = await apiCategories.getCategories();

            //Mark category selected in remote categories
            allCategories.map(r => {
                r.isSelected = localCategories.filter(c => c.isSelected).some(c => c.id === r.id)
            })

            setCategories(allCategories);

            setLoading(false);

        }

        loadCategories();

    }, [])


    //On categories update
    useEffect(() => {

        async function getData() {
            const grouped = _.groupBy(categories, category => category.group.title);

            const groupedCategories: IGroup[] = [];

            Object.entries(grouped).map(([key, categories]) => {
                const group: IGroup = {
                    id: key,
                    title: key,
                    categories: categories
                }
                groupedCategories.push(group);
            });

            setGroupedCategories(groupedCategories);
        }

        getData();
    }, [categories])


    //Hnadle category selection
    const handleOnChange = async (categoryId: string, isSelected: boolean) => {

        var category = categories.find(c => c.id == categoryId);
        if (category) {
            category.isSelected = isSelected
        }

        const newCategories = [...categories]

        setCategories(newCategories);

        await storage.set('categories', newCategories);
    }

    return (
        <div className="vstack gap-2">

            {loading && <div>
                {
                    Array.from({ length: 10 }).map((x, index) => {
                        return <p key={index} className="card-text placeholder-glow mb-2">
                            <span className="placeholder col-1"></span>
                            <span className="col-1"></span>
                            <span className="placeholder col-10"></span>
                        </p>
                    })
                }
            </div>}

            <>
                {
                    groupedCategories.map(gc => {
                        return <div key={gc.id} className="mb-2">
                            <h5 className="text-muted">{gc.title}</h5>

                            <ul className="list-group" >
                                {
                                    _.sortBy(gc.categories, x => x.title).map((category, index) =>
                                        <Category key={category.id} id={category.id} title={category.title} isSelected={category.isSelected} iconUrl={category.iconUrl} onChange={() => {
                                            handleOnChange(category.id, !category.isSelected);
                                        }} />
                                    )
                                }
                            </ul>
                        </div>
                    })
                }</>
        </div>

    )

}

export default Categories



