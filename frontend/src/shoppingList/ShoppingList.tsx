import * as React from "react";
import {useEffect, useState} from "react";
import {Checkbox} from "antd";

interface Item {
    idItem: number;
    name: string;
    amount: number;
    unit: string;
    checked: boolean;
}

function ShoppingList() {

    const [shoppingList, setShoppingList] = useState<Item[]>([]);

    const allItemsTMP: Item[] = [
        {
            idItem: 1,
            name: "jajo",
            amount: 4,
            unit: "sztuki",
            checked: false
        },
        {
            idItem: 2,
            name: "mąka",
            amount: 300,
            unit: "g",
            checked: false
        },
        {
            idItem: 3,
            name: "makaron",
            amount: 200,
            unit: "g",
            checked: false
        },
    ];
    const idPlan = Number(window.location.pathname.split('/')[2]);

    useEffect(() => {
        fetch(`http://localhost:8080/your-plans/${idPlan}/shopping-list`)
            .then((res) => res.json())
            .then((data) => {
                const allItems: Item[] = data;
                setShoppingList(allItems);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }, []);


    const handleCheckboxChange = (itemId: number) => {
        const updatedList = shoppingList.map(item => {
            if (item.idItem === itemId) {
                return {...item, checked: !item.checked};
            }
            return item;
        });
        setShoppingList(updatedList);
    };

    return (
        <div className="App" style={{display: 'flex', justifyContent: 'center'}}>
            <div>
                <h1>Shopping List</h1>
                <form>
                    {shoppingList.map(item => (
                        <div key={item.idItem}>
                            <Checkbox
                                checked={item.checked}
                                onChange={() => handleCheckboxChange(item.idItem)}
                            >
                                <label>{item.name} - {item.amount} {item.unit}</label>
                            </Checkbox>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );
}

export default ShoppingList;