import { useState, useEffect } from "react";
import $fetch from "@/lib/fetch";; // Pastikan path ini benar

/**
 * Custom hook untuk fetching data dari API.
 * @param {string} url - Endpoint API.
 * @param {object} params - Parameter query (opsional).
 * @returns {object} - Mengembalikan data, loading state, error state, error object, dan fungsi refresh.
 */
export default function useGet(url, params = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fungsi untuk mengambil data dari API.
   */
  async function getData() {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      // Lakukan request menggunakan $fetch
      const response = await $fetch.get(url, params);
      setData(response);
    } catch (err) {
      setIsError(true);
      setError(err);
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // Jalankan getData saat url atau params berubah
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(params)]); // Gunakan JSON.stringify untuk membandingkan perubahan params

  // Kembalikan state dan fungsi refresh
  return { data, isLoading, isError, error, refresh: getData };
}