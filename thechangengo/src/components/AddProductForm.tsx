'use client'

import React, { useState, FormEvent } from 'react';

export default function AddProductForm() {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/add-product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    description,
                    price: parseFloat(price),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Product added successfully!');
                setName('');
                setDescription('');
                setPrice('');
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error: any) {
            alert('Error adding product: ' + error.message);
        }
    };

    return (
        <form onSubmit= { handleSubmit } >
        <div>
        <label htmlFor="name" > Product Name: </label>
            < input
    type = "text"
    id = "name"
    value = { name }
    onChange = {(e) => setName(e.target.value)
}
required
    />
    </div>

    < div >
    <label htmlFor="description" > Description: </label>
        < textarea
id = "description"
value = { description }
onChange = {(e) => setDescription(e.target.value)}
required
    />
    </div>

    < div >
    <label htmlFor="price" > Price: </label>
        < input
type = "number"
id = "price"
value = { price }
onChange = {(e) => setPrice(e.target.value)}
step = "0.01"
required
    />
    </div>

    < button type = "submit" > Add Product </button>
        </form>
  );
}
