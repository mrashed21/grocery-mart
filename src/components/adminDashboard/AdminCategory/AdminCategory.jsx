"use client";

import { useState } from "react";
import AddCategory from "./AddCategory";
import CategoryTable from "./CategoryTable";

const AdminCategory = () => {
  const [categoryCreateModal, setCategoryCreateModal] = useState(false);
  const user = true;
  // const user.role_id.category_post = true
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  return (
    <div className="py-6 px-1">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl text-primaryColor uppercase">Category</h1>
        </div>

        <div>
          <button
            type="button"
            className="rounded-[8px] py-[10px] px-[14px] bg-[#084C4E]  transform hover:translate-y-[-2px] transition duration-200 text-white font-semibold text-sm cursor-pointer uppercase"
            onClick={() => setCategoryCreateModal(true)}
          >
            Create Category
          </button>
        </div>
      </div>
      {/* search Category... */}
      <div className="mt-3">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="SEARCH CATEGORY..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:textColor focus:border-transparent transition duration-200"
        />
      </div>
      {/* Category Data Show and update and delete operation file */}

      <CategoryTable
      // categoryTypes={categoryTypes}
      // setPage={setPage}
      // setLimit={setLimit}
      // page={page}
      // limit={limit}
      // totalData={categoryTypes?.totalData}
      // setSearchTerm={setSearchTerm}
      // refetch={refetch}
      // user={user}
      // isLoading={isLoading}
      />

      {/* Create category modal */}
      {categoryCreateModal && (
        <AddCategory
          // refetch={refetch}
          setCategoryCreateModal={setCategoryCreateModal}
          // user={user}
        />
      )}
    </div>
  );
};

export default AdminCategory;
