import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';
import MealItem from './MealItem';
import classes from './Meals.module.css';

export default function AvailableMeals() {

    const [availableMeals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setIsHttpError] = useState(false);

    const fetchData = async () => {
        const rawResponse = await fetch('https://food-db-c9593-default-rtdb.firebaseio.com/meals.json');
        console.log('jjjjjjjjjjjjjjj', rawResponse.ok);
        if (!rawResponse.ok) {
            throw new Error('');
        }
        const dummy_meals = await rawResponse.json();
        const meals = [];
        setIsLoading(false);
        for (const key in dummy_meals) {
            meals.push({
                id: key,
                name: dummy_meals[key].name,
                description: dummy_meals[key].description,
                price: dummy_meals[key].price,
            })
        }
        setMeals(meals);
    }
    useEffect(() => {
        fetchData().catch((error) => {
            setIsLoading(false);
            setIsHttpError(true);
            return;
        });
        return () => {
        }
    }, [])


    const meals = availableMeals;
    return (
        <section className={classes.meals}>
            <Card>
                {httpError && <p style={{ textAlign: 'center' }}>Something Went Wrong... </p>}
                {isLoading && <p style={{ textAlign: 'center' }}>Loading... </p>}
                <ul>
                    {
                        meals.map((meal) => (
                            <MealItem key={meal.id} meal={meal}></MealItem>
                        ))
                    }
                </ul>
            </Card>
        </section >
    )
}
