import FeaturedProperties from "@/components/FeaturedProperties/featuredProperties";
import Footer from "@/components/Footer/footer";
import MailList from "@/components/MailList/mailList";
import Navbar from "@/components/Navbar/navbar";
import axios from "axios";
import {useRouter} from "next/router";
import styles from "@/components/Navbar/navbar.module.css";
import React, {useEffect, useState} from "react";

export async function getStaticProps() {
    const data = await axios.get("http://localhost:8900/api/estates");
    const jsonData = await data.data;

    return {
        props: {
            data: jsonData,
        },
    };
}

const AllEstates = ({data}) => {
    const [search, setSearch] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();
    const [estates, setEstates] = useState(data);


    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8900/api/estates`,{
                params: {
                    search: search,
                    price: price,
                    type: type
                }
            });
            setEstates(response.data);
        } catch (error) {
            // Handle the error
            console.error(error);
        }
    };

    useEffect(() => {
        handleSearch();
    },[price,type,search])

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className={`${styles.formGroup} mt-[20px] mx-[25px]`}>
                    <div className={'flex gap-[20px]'}>
                        <div className="flex flex-col justify-center">
                            <label htmlFor="type" className="mb-[5px] text-[16px]">
                                Select a property type:
                            </label>
                            <select
                                id="type"
                                className="px-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none w-[200px]"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">Property</option>
                                <option value="apartment">Apartment</option>
                                <option value="room">Room</option>
                            </select>
                        </div>
                        <div className="flex flex-col justify-center">
                            <label htmlFor="price" className="mb-[5px] text-[16px]">
                                Select a price:
                            </label>
                            <select
                                id="price"
                                className="px-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none w-[200px]"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                                <option value="">Price</option>
                                <option value="200">200$</option>
                                <option value="500">500%</option>
                                <option value="1000">1000$</option>
                            </select>
                        </div>
                        <div className="flex flex-col justify-center">
                            <label htmlFor="search" className="mb-[5px] text-[16px]">
                                Search:
                            </label>
                            <input
                                type={'search'}
                                id="search"
                                placeholder={'Search...'}
                                className="px-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none w-[200px]"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <FeaturedProperties data={estates}/>
            <MailList/>
            <Footer/>
        </div>
    );
};

export default AllEstates;
