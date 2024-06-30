import React from "react";

const AddProducts = () => {
  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold mb-4 text-left">ADD PRODUCTS</h2>
      <hr className="mb-4" />
      <form autoComplete="off" className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="product-name"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Product Name
          </label>
          <input
            type="text"
            id="product-name"
            className="form-control mt-1 block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="product-price"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Product Price
          </label>
          <input
            type="text"
            id="product-price"
            className="form-control mt-1 block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="product-img"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Product Image
          </label>
          <input
            type="file"
            id="product-img"
            className="form-control mt-1 block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="text-left">
          <button
            type="submit"
            className="btn btn-success btn-md mybtn bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
