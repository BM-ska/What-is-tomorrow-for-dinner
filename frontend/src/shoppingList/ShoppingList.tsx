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

    const idPlan = Number(window.location.pathname.split('/')[2]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`http://34.116.180.131:8080/your-plans/${idPlan}/shopping-list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    const allItems: Item[] = data;
                    setShoppingList(allItems);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            console.log('Token not found in localStorage');
            window.location.href = "http://34.116.180.131:3000/sign-in";
        }


    }, [idPlan]);


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
