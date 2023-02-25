import React from 'react';
import { useParams } from 'react-router-dom';

const PizzaItem = () => {
    let {PizzaId} = useParams()

    console.log(PizzaId);
    
    return (
        <div>
            Работает{PizzaId}
        </div>
    );
};

export default PizzaItem;