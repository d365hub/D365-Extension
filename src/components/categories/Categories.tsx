import { useEffect, useState } from "react";
import { ICategory } from "../../models/ICategory";
import * as _ from "lodash";
import { IGroup } from "../../models/IGroup";
import apiCategories from "../../services/api/api.categories";
import storage from "../../services/storage.service";

function Categories() {
    const categoriesKey = "categories";
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [groupedCategories, setGroupedCategories] = useState<IGroup[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);

                const tempSelectedCategories: string[] = [];

                //Load existing selected categories
                const storedData = await storage.get(categoriesKey);

                console.log('stored Service', storedData);

                if (storedData?.categories) {
                    tempSelectedCategories.push(...storedData.categories);
                }

                //Load selected categories in memory 
                setSelectedCategories(tempSelectedCategories);

                //Load all categories from remote
                const categories = await apiCategories.getCategories();

                //Mark selected categories in all categories
                categories.map(c => c.isSelected = tempSelectedCategories.includes(c.id));

                //Load all marked selected categories in memory
                setCategories(categories);

                const grouped = _.groupBy(categories, category => category.group.title);

                console.log(grouped);

                const groupedCategories: IGroup[] = [];

                Object.entries(grouped).map(([key, categories]) => {
                    const group: IGroup = {
                        id: "",
                        title: key,
                        categories: categories
                    }
                    groupedCategories.push(group);
                });

                setGroupedCategories(groupedCategories);

                setError(null);


            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }
        }

        getData();
    }, [])

    const handleOnChange = async (categoryId: string, isSelected: boolean) => {

        const selectedCategory = categories.find(c => c.id === categoryId);

        if (selectedCategory) {
            selectedCategory.isSelected = isSelected;
            setCategories(categories);

            if (isSelected) {
                await addCategoryIdToSelectedCategoryIds(categoryId);
            } else {
                await removeCategoryIdFromSelectedCategoryIds(categoryId);
            }

        }
    }

    async function addCategoryIdToSelectedCategoryIds(categoryId: string) {

        var tempSelectedCategories = [...selectedCategories, categoryId];

        setSelectedCategories(tempSelectedCategories);

        await saveSelectedCategories(tempSelectedCategories);
    }

    async function removeCategoryIdFromSelectedCategoryIds(categoryId: string) {

        var tempSelectedCategories = [...selectedCategories];

        tempSelectedCategories.splice(tempSelectedCategories.indexOf(categoryId), 1);

        setSelectedCategories(tempSelectedCategories);

        await saveSelectedCategories(tempSelectedCategories);
    }

    async function saveSelectedCategories(tempSelectedCategories: string[]) {
        await storage.set({ "categories": tempSelectedCategories });
    }

    return (
        <div className="vstack gap-2">

            {loading && <div>
                {
                    Array.from({ length: 10 }).map(x => {
                        return <p className="card-text placeholder-glow mb-2">
                            <span className="placeholder col-1"></span>
                            <span className="col-1"></span>
                            <span className="placeholder col-10"></span>
                        </p>
                    })
                }
            </div>}

            {error && (
                <div>{`There is a problem fetching the categories - ${error}`}</div>
            )}

            <>
                {
                    groupedCategories.map(gc => {
                        return <div className="mb-2">
                            <h5 className="text-muted">{gc.title}</h5>

                            <ul className="list-group" >
                                {
                                    _.sortBy(gc.categories, x => x.title).map((category, index) =>
                                        <li className="list-group-item d-flex justify-content-between" key={index}>
                                            <div>
                                                <img src={category.iconUrl} className="rounded me-2" alt="" width={32} />
                                                <label className="form-check-label" >{category.title}</label>
                                            </div>
                                            <input title="category" className="form-check-input me-1" type="checkbox" checked={category.isSelected} onChange={() => handleOnChange(category.id, !category.isSelected)} />
                                        </li>
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



