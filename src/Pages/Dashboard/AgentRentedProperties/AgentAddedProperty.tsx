/* eslint-disable @typescript-eslint/no-explicit-any */

import { Helmet } from "react-helmet-async";
import useAllProperties from "../../../hook/useAllProperties";
import Loader from "../../../Component/Loader/Loader";
import Property from "../../AllProperties/Property";
import { Key } from "react";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";

export default function AgentAddedProperty() {
    const [allProperties, isPending] = useAllProperties();
    // const handleRemoveItem = async (id: any) => {

    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axiosPublic.delete(`/properties/${id}`)
    //                 .then(res => {
    //                     if (res.data.deletedCount > 0) {
    //                         refetch()
    //                         Swal.fire(
    //                             'Deleted!',
    //                             'Your file has been deleted.',
    //                             'success'
    //                         )
    //                     }
    //                 })

    //         }
    //     })
    // }

    if (isPending) {
        return <Loader></Loader>
    }
    return (
        <div className="md:px-16">
            <Helmet>
                <title>Homez | Dashboard - Added Property</title>
            </Helmet>
            <SectionTitle first="My Added" second="Properties"></SectionTitle>
            <div className="mt-8">
                <div className="grid grid-cols-2 gap-12">
                    {
                        allProperties?.map((property: { _id: string; name: string; upazila: string; district: string; description: string; available_date: string; rent_price: number; available_quantity: string; image: string; bedroom: number; bathroom: number; area: number; agent_name: string; agent_image: string; }, idx: Key | null | undefined) => <Property key={idx} property={property}></Property>)
                    }
                </div>
            </div>
        </div>
    )
}
