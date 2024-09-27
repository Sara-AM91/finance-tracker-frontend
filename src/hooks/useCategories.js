import { useState, useEffect } from "react";

const useCategories = (type) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
        if (!token) {
          throw new Error("No token found, user is not authenticated");
        }

        const globalResponse = await fetch(
          `http://localhost:5000/categories/global?categoryType=expense`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Check if response is okay
        if (!globalResponse.ok) {
          throw new Error(
            `Failed to fetch global categories: ${globalResponse.statusText}`
          );
        }

        // Log the response before processing
        const globalData = await globalResponse.json();
        console.log("Global Categories Data:", globalData);

        // Check if globalData is an array before using it
        if (!Array.isArray(globalData)) {
          throw new Error("Global categories response is not an array");
        }

        const userResponse = await fetch(
          `http://localhost:5000/categories/filter?categoryType=expense`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        let userCategories = [];

        if (userResponse.ok) {
          userCategories = await userResponse.json();
          console.log("User Categories Data:", userCategories);

          // Ensure the data is an array
          if (!Array.isArray(userCategories)) {
            throw new Error("User categories response is not an array");
          }
        }

        const allCategories = [
          ...globalData,
          ...userCategories.filter(
            (userCategory) =>
              !globalData.some(
                (globalCategory) => globalCategory._id === userCategory._id
              )
          ),
        ];

        const sortedCategories = [
          ...allCategories.filter((category) => category.title !== "Other"),
          ...allCategories.filter((category) => category.title === "Other"),
        ];

        setCategories(sortedCategories);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
