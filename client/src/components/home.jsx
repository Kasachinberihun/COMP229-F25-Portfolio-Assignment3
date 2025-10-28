import { useState, useEffect } from 'react'; 

export default function Home() {

    const [data, setData] = useState(null);

    const apiUrl = '/api'; // Allow Cross-Origin requests if needed

    useEffect(() => {
        fetch(`${apiUrl}/data`)
            .then((res) => res.json())
            .then((dataFromServer) => setData(dataFromServer))
            .then(() => console.log('Data fetched successfully'))
    },[]);

    return (
        <div>
            <h1>Welcome to the Home Page </h1>
            <p>{data ? data.message : 'Loading...'}</p>
        </div>
    )
}