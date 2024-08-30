import React, { useState } from 'react';

const SaveUrlComponent = () => {
    const [dataCategory, setDataCategory] = useState('');
    const [urlToAdd, setUrlToAdd] = useState('');

    const firebaseUrl = "https://browser-extension-01-default-rtdb.firebaseio.com";

    const generateUniqueId = () => {
        // Implement your unique ID generation logic here
        return 'someUniqueId';
    };

    const saveUrlToFirestore = async () => {
        try {
            const uniqueId = generateUniqueId();

            const dataToSave = {
                [uniqueId]: {
                    url: urlToAdd,
                },
            };

            const postResponse = await fetch(
                `${firebaseUrl}/Urls/${dataCategory}.json`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSave),
                }
            );

            if (!postResponse.ok) {
                throw new Error('POST request was not ok');
            }

            // console.log('URL added successfully with a unique ID.');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Data Category"
                value={dataCategory}
                onChange={(e) => setDataCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="URL to Add"
                value={urlToAdd}
                onChange={(e) => setUrlToAdd(e.target.value)}
            />
            <button onClick={saveUrlToFirestore}>Save URL</button>
        </div>
    );
};

export default SaveUrlComponent;