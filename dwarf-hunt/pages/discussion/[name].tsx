import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";

export default function Discussion() {
  const router = useRouter();
  const { name } = router.query;

  const [dwarfData, setDwarfData] = useState<any | null>(null);

  const fetchDwarf = async (name: string) => {
    try {
      const { data, error, status } = await supabase
        .from("dwarves")
        .select("name, description, id")
        .eq("name", name);
      if (error) {
        throw error;
      }
      if (status === 404) {
        throw new Error("Dwarf not found");
      }
      return data;
    } catch (error) {
      console.error("Error fetching dwarves:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDwarfData = async () => {
      if (name) {
        const data = await fetchDwarf(name as string);
        if (data) {
          setDwarfData(data[0]);
        }
      }
    };
    fetchDwarfData();
  }, [name]);

  return (
    <div>
      <div>Description: {name}</div>
      {dwarfData ? (
        <div>
          <div>Name: {dwarfData.name}</div>
          <div>Description: {dwarfData.description}</div>
          <div>ID: {dwarfData.id}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {!dwarfData && name ? <div>404 - Dwarf not found</div> : null}
    </div>
  );
}
