import { Button } from "@/components/ui/button";
import $fetch from "@/lib/fetch";
import { Title } from "@/components/ui/title";
import { useEffect, useState } from "react";
import useGet from "@/hooks/useGet";

export default function DataFetching() {
    // const [data, setData] = useState();
    // const [isLoading, setLoading] = useState(true);
    const [params, setParams] = useState({
        limit: 10,
        skip: 0,
    });

    // async function getData() {
    //     console.log("Fetching data...");
    //     setLoading(true);
    //     try {
    //         const data = await $fetch.get('https://dummyjson.com/products', params);
    //         console.log("Data received:", data);
    //         setData(data);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     getData();
    // }, [params.limit, params.skip]);

    const {data, isLoading, refresh} = useGet(`https://dummyjson.com/products`, params);

    function handleNext() {
        setParams((old) => ({ ...old, skip: old.skip + 10 }));
    }

    function handlePrev() {
        setParams((old) => ({ ...old, skip: Math.max(0, old.skip - 10) }));
    }

    return (
        <div>
            <Title
                title="Data Fetching"
                caption="Menampilkan data yang diambil dari API"
            />
            <div className="flex gap-2">
                <Button onClick={handlePrev}>Sebelumnya</Button>
                <Button onClick={refresh}>Ulang</Button>
                <Button onClick={handleNext}>Lanjut</Button>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <pre>{JSON.stringify(params, null, 2)}</pre>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </>
            )}
        </div>
    );
}