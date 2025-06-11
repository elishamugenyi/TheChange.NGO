import AddProductForm from '../../components/AddProductForm';

// export default function AddProductPage() {
//     return (
//         <div>
//             <h1>Add New Product</h1>
//             <AddProductForm />
//         </div>
//     );
// }

// import AddCampaignForm from '../components/AddCampaign';

export default function AddCampaignPage() {
    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Create a New Campaign</h1>
            <AddProductForm />
        </div>
    );
}
